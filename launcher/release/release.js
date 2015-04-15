'use strict';

/**
 * Parse RELEASE file
 * Returns release information: version and download file.
 *
 * (c) 2015 Matthias Hannig
 */

var logSymbols = require('log-symbols');

// == Release module
var Release = {

  // Parse linebased RELEASE file
  // and return Version and Download information.
  //
  parse: function(text) {
    console.log(text);
    var result = {};
  
    text.split(/\n/).forEach(function(line){
      // Get CURRENT release
      var tokens = line.split(' ');
      if(tokens[0] === 'CURRENT') {
        result.version = tokens[1];
        result.file    = tokens[2];
      }
    });
  
    return result;
  }

};

// == Export module
module.exports = Release;

