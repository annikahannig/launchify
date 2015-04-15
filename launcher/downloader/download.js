'use strict';

/**
 * Download the current release from repository
 * to ./tmp/download and extract archive to ./tmp/release
 *
 * Return release via promise
 *
 * (c) 2015 Matthias Hannig
 */

// == Load libraries
var logSymbols = require('log-symbols');
var Promise    = require('promise');
var http       = require('http');
var fs         = require('fs');

// == Modules
var Release = require('../release/release');

// == Helper

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
        reject('Download failed. Server did sent status code ' + res.statusCode);
      }
    });

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


// == Download from repository
var download = function(repositoryUrl) {
  var promise = new Promise(function(resolve, reject) {

    // Get version from server
    loadReleaseFile(repositoryUrl)
      .then(Release.parse)
      .then(function(version) {
        console.log(version);
      });

  });
  return promise; 
};

// == Export module
module.exports = download;

