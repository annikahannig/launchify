'use strict';

/**
 * GPG wrapper: Keys
 * Get keys and fingerprints from gpg
 *
 * (c) 2015 Matthias Hannig
 */

// == Load libraries
var Promise = require('promise');
var cp      = require('child_process');

// == Config
var gpg = '/usr/bin/gpg';
var env = {
  'LC_ALL': 'C'
};


// == Helper

/**
 * Parse gpg output for keys
 */
var parseGpgKeyOutput = function(output) {
  var lines = output.split(/\n/);

  var keys = [];
  var currentLine = 0;
  var currentKey = {};

  // Skip the first two lines
  lines.shift();
  lines.shift();

  lines.forEach(function(line){
    if(line === ''){
      // new key
      if(currentKey.type) {
        keys.push(currentKey);
      }
      currentKey = {};
      currentLine = 0;
      return;
    }

    // Parse key type
    if(currentLine === 0) {
      if(line.substr(0,3) === 'sec') {
        currentKey.type = 'secret';
      }
      else {
        currentKey.type = 'public';
      }

      currentLine += 1;
      return; 
    }

    // Parse fingerprint
    if(currentLine == 1) {
      var res = line.match(/^.*= (.*)$/);
      currentKey.fingerprint = res[1].replace(/\W/g, '');
      currentKey.id          = currentKey.fingerprint.substring(
        currentKey.fingerprint.length - 8
      );

      currentLine += 1;
      return;
    }

    // Parse user
    if(currentLine == 2) {
      currentKey.uid = line.substr(4).trim();
      currentLine += 1;
    }
  });

  return keys;
};


/**
 * Extract secret keys from gpg call.
 * 
 * @return Promise
 */
var extractSecretKeys = function() {
  // Execute gpg command
  var cmd     = gpg + ' --list-secret-keys --fingerprint';
  var promise = new Promise(function(resolve, reject){
    
    cp.exec(cmd, { env: env}, function(err, stdout, stderr) {
      if(err) { reject(err); return; } // Exit on error

      // fullfill promise
      var keys = parseGpgKeyOutput(stdout);
      resolve(keys);
    });
  });

  return promise;
};

/** 
 * Extract public keys
 *
 * @return Promise
 */
var extracKeys = function() {
  // Execute gpg command
  var cmd     = gpg + ' --list-keys --fingerprint';
  var promise = new Promise(function(resolve, reject){
    cp.exec(cmd, { env: env}, function(err, stdout, stderr) {
      if(err) { reject(err); return; } // Exit on error
      var keys = parseGpgKeyOutput(stdout);
      resolve(keys);
    });
  });

  return promise;
};

// == Module
var gpgKeys = {
  // Get list of private gpg keys (for signing)
  secret: extractSecretKeys,
  public: extracKeys
};

// == Export module
module.exports = gpgKeys;

