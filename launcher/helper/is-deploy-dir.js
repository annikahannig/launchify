'use strict';

/**
 * Check if the current directory looks 
 * like a deploy directory.
 *
 * (c) 2015 Matthias Hannig
 */

// == Load modules
var fs = require('fs');

// == Deploy directory check
var isDeployDir = function(path) {

  // Are the following directories present?
  var requiredDirs = [
    './var',
    './releases'
  ];

  // FIXME: STUB!
  return false;
};

// == Export check
module.exports = isDeployDir;

