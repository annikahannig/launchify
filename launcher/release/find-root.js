'use strict'; 

/**
 * Find root in path.
 * The first occurance of the launchify.yml file.
 *
 * (c) 2015 Matthias Hannig
 */

// == Libraries
var path = require('path');
var glob = require('glob');

var findRoot = function(base) {
  
  var files = glob.sync(base + '/**/launchify.yml');
  var file = files[0];
  if(file) {
    var root = path.dirname(file);
    return root;
  }
  else {
    return false;
  }
};

// == Export 
module.exports = findRoot;

