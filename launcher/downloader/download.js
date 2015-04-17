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
var fs         = require('fs');

// == Helper
var loadReleaseFile = require('./download-release-file');
var loadRelease     = require('./download-release');

var parseRelease    = require('../release/parse-release');

// == Download from repository
var download = function(repositoryUrl) {
  // Get version and files from server
  var promise = loadReleaseFile(repositoryUrl)
    .then(parseRelease())
    .then(loadRelease(repositoryUrl));
  return promise;
};

// == Export module
module.exports = download;

