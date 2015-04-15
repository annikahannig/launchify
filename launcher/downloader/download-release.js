'use strict';

/**
 * Download the release and store files in
 * tmp/downloads/
 *
 * (c) 2015 Matthias Hannig
 */

// == Load libraries
var logSymbols = require('log-symbols');
var Promise    = require('promise');
var http       = require('http');

/**
 * Download release archive and signature.
 *
 * @return Promise
 */
var loadRelease = function(repositoryUrl) {
  return function(version) {
    var promise = new Promise(function(resolve, reject){
      resolve(version);
    });
    return promise;
  };
};

// == Export module
module.exports = loadRelease;

