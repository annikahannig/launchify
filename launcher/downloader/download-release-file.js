'use strict';

/**
 * Download the RELEASE fil
 *
 * (c) 2015 Matthias Hannig
 */

// == Load libraries
var logSymbols = require('log-symbols');
var Promise    = require('promise');
var request    = require('request');

// == Download release file

/**
 * Load RELEASE information
 * @return Promise
 */
var loadReleaseFile = function(repositoryUrl) {
  var promise = new Promise(function(resolve, reject) {
    var req = request.get(repositoryUrl + '/RELEASE', function(error, res, body) {
      if(!error && res.statusCode == 200) { // HTTP OK
        resolve(body); 
      }
      else {
        reject('Download failed. Server sent status code ' + res.statusCode);
      }
    });

    // Handle HTTP (connection) error
    req.on('error', function(err) {
      // Display error message
      console.error(
        logSymbols.error + ' Could not download RELEASE - ' + err
      );
      reject(err);
    });

  });
  return promise;
};

// == Export module
module.exports = loadReleaseFile;

