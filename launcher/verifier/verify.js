'use strict';

/**
 * Read yml file from tmp/release
 * Verify downloaded release tar.gz.
 *
 * (c) 2015 Matthias Hannig
 */

// == Libraries
var sym     = require('log-symbols');
var Promise = require('promise');

// == Modules
var Config         = require('../config/yaml');
var gpgVerifyFile  = require('../gpg/verify-file');

// == Verify release
var verify = function() {
  return function(release) {
    var tmpRelease     = process.cwd() + '/tmp/release';
    var releaseArchive = process.cwd() + '/tmp/downloads/' + release.file;
    var releaseSig     = releaseArchive + '.sig';
  
    var launchifyConfig     = new Config(tmpRelease + '/launchify.yml');
    var expectedFingerprint = launchifyConfig.updates.gpg.fingerprint;

    var promise = new Promise(function(resolve, reject) {
      gpgVerifyFile(releaseArchive, expectedFingerprint)
        .then(
          function(result){ 
            console.log( sym.success + ' Valid signature from: ' + result.uid );
            console.log( '  Fingerprint: ' + result.fingerprint );
            resolve(release);
          },
          function(err){
            console.error( sym.error + ' Release verification error: ' + err );
            reject(err);  
          });
    });  

    return promise;
  };
    
};

// == Export
module.exports = verify;

