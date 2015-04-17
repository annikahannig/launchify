'use strict';

/**
 * Compare version strings
 * (c) 2015 Matthias Hannig
 */


// == Compare a, b
//    Convert version string to numeric and compare.
//
//    return 1  if a > b 
//           0  if a == b
//           -1 if a < b
//
var compare = function(a, b) {
  // Version [0] := 'major', [1] := 'minor', [2] := 'build'
  var v1 = a.split('.');
  var v2 = b.split('.');
  
  // Convert base to support char revisions (3.22.1b)
  v1 = v1.map(function(v) { return parseInt(v, 16); });
  v2 = v2.map(function(v) { return parseInt(v, 16); });

  // Version equality:
  if( v1[0] == v2[0] && v1[1] == v2[1] && v1[2] == v2[2] ) {
    return 0;
  }

  // Version a > b
  if( v1[0]  > v2[0] )                                    {  return 1;  }
  if( v1[0] == v2[0] && v1[1]  > v2[1] )                  {  return 1;  }
  if( v1[0] == v2[0] && v1[1] == v2[1] && v1[2] > v2[2] ) {  return 1;  }

  // Version a < b
  if( v1[0]  < v2[0] )                                    {  return -1; }
  if( v1[0] == v2[0] && v1[1]  < v2[1] )                  {  return -1; }
  if( v1[0] == v2[0] && v1[1] == v2[1] && v1[2] < v2[2] ) {  return -1; }

  throw "This should never happen.";
};

// == Newer 
var isNewer = function(a,b) {
  return compare(a,b) == 1;
};

// == Older
var isOlder = function(a,b) {
  return compare(a,b) == -1;
};

// == Equal
var isEqual = function(a,b) {
  return compare(a,b) === 0;
};

// == Export
module.exports = compare;
module.exports.isNewer = isNewer;
module.exports.isNewer = isOlder;
module.exports.isNewer = isEqual;

