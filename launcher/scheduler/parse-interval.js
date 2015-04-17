'use strict';

/**
 * Interval parser:
 * Supported units are 'days', 'hours', 'minutes', 'seconds'
 *
 * Composites are supported aswell. You can write something like
 * '2 minutes 16 seconds'.
 * 
 * (c) 2015 Matthias Hannig
 */

// == Parse interval
var parseInterval = function(str) {
  var interval = 0;
  var tokens   = str.split(' ');

  var d   = 0, h = 0, m = 0, s = 0;
  var val = 0;

  tokens.forEach(function(token) {
    var id = token.substr(0,3).toUpperCase(); // First 3 characters
    switch(id) {
      case 'DAY': d = val; break;
      case 'HOU': h = val; break;
      case 'MIN': m = val; break;
      case 'SEC': s = val; break;
      default:
        val = parseFloat(token);
    }
  });

  // Convert to interval
  interval = (
    (d*24*60*60) + // Days
    (h*60*60)    + // Hours
    (m*60)       + // Minutes
    (s))          * // Seconds
    1000;          // Milliseconds

  return interval;
};

// == Export
module.exports = parseInterval;

