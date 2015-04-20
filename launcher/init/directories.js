'use strict';

/**
 * Init: directories
 *
 * Check if all required directories are present.
 * This is releases and var, var/log, var/run
 *
 * In case they are not present - create them.
 *
 * (c) 2015 Matthias Hannig
 */

var fs   = require('fs');
var path = require('path');


// == Helper functions

/**
 * Check if directory is empty
 */

function isEmpty(dir) {
  return fs.readdir(dir).length === 0;
}

