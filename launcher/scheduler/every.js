'use strict';

/**
 * Periodically run a callback. 
 * This is essentialy setInterval with some parsing.
 *
 * (c) 2015 Matthias Hannig
 */

// == Modules
var parseInterval = require('./parse-interval');

// == Every
//    Use this like: every( '10 min', () => { } )
var every = function(intervalStr, cb) {
  var interval = parseInterval(intervalStr);
  var ref = setInterval(cb, interval);
  return ref;
};

// == Export
module.exports = every; 

