'use strict';

/**
 * Parse RELEASE file
 * Returns release information: version and download file.
 *
 * (c) 2015 Matthias Hannig
 */

var logSymbols = require('log-symbols');

// == Helper
var parseRelease = require('./parse-release');

// == Release module
var Release = {
  // Parse linebased RELEASE file
  parse: function() { return parseRelease; }
};

// == Export module
module.exports = Release;

