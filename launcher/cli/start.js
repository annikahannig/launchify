'use strict';

/**
 * Start launchified application
 * (c) 2015 Matthias Hannig
 */

// == Libraries
var sym = require('log-symbols');

// == Modules
var currentRelease = require('../release/current-release');

// == Launchify main
var start = function(argv) {
  var release = currentRelease();
  if( !release ) {
    // This is not a working directory.
    // Do nothing. Fast forward to 'usage'
    return false;
  }

  return true;
};

// == Export command line task
module.exports = start;

