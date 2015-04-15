'use strict';

/**
 * Download the RELEASE fil
 *
 * (c) 2015 Matthias Hannig
 */

// == Load libraries
var logSymbols = require('log-symbols');
var Promise    = require('promise');
var http       = require('http');

// == Download release file

/**
 * Load RELEASE information
 * @return Promise
 */
var loadReleaseFile = function(repositoryUrl) {
  var promise = new Promise(function(resolve, reject) {
    var req = http.get( repositoryUrl + '/RELEASE', function(res) {
      if(res.statusCode == 200) { // HTTP OK
        var body = '';
        res.on('data', function(data){ body += data; });
        res.on('end',  function(){ resolve(body);    });
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

