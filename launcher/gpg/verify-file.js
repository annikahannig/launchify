'use strict';

/**
 * GPG: Verify file with signature
 *
 * (c) 2015 Matthias Hannig
 */

// == Libraries
var Promise = require('promise');
var cp      = require('child_process');

// == Config
var gpg = 'gpg';
var env = {
  'LC_ALL': 'C'
};

// == Helper: Parse gpg output
var parseGpgVerifyOutput = function(text) {
  var result = {
    goodSignature: false
  };
  var lines  = text.split('\n');
  
  lines.forEach(function(line){
    var tokens = line.split(' ');
    if(tokens[0] !== '[GNUPG:]') { return; } // Ignore this line
    if(tokens[1] === 'GOODSIG' ) {
      result.goodSignature = true;
      result.uid           = line.substr(
        tokens[0].length + 1 + tokens[1].length + 1 +
        tokens[2].length + 1
      );
    }
    if(tokens[1] === 'VALIDSIG') {
      result.fingerprint = tokens[2];
      result.signedAt    = new Date(parseInt(tokens[4]) * 1000);
    }
  });

  return result;
};

// == Verify file
var verifyFile = function(file, expectedFingerprint) {
  var cmd     = gpg + ' --status-fd=1 --verify ' + file + '.sig';
  var promise = new Promise(function(resolve, reject) {
    cp.exec(cmd, { env: env }, function(err, stdout, stderr) {
      if(err) { reject(err); return; } // Exit on error
      
      var result  = parseGpgVerifyOutput(stdout);
      var isValid = result.fingerprint == expectedFingerprint;

      if(isValid) {
        resolve(result);
      }
      else {
        reject('bad_signature');
      }
    });
  });
  return promise;
};

// == Export
module.exports = verifyFile;

