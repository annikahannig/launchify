'use strict';

/**
 * Parse RELEASE information given as text.
 * (c) 2015 Matthias Hannig
 */

var logSymbols = require('log-symbols');

var parseRelease = function() {
  return function(text) {
    var result = {};

    text.split(/\n/).forEach(function(line){
      // Get CURRENT release
      var tokens = line.split(' ');
      if(tokens[0] === 'CURRENT') {
        result.version = tokens[1];
        result.file    = tokens[2];
      }
    });

    console.log(logSymbols.success + ' Parsed RELEASE information');

    return result;
  };
};

// == Export module
module.exports = parseRelease;

