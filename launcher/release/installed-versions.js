'use strict';

/**
 * Get a list of all installed releases
 * 
 * (c) 2015 Matthias Hannig
 */


// == Libraries
var fs    = require('fs');
var path  = require('path');


// == Get list of all releases
var installedVersions = function(){
  var releasePath = process.cwd() + '/releases';
  var files       = fs.readdirSync(releasePath);
  
  

};

// == Export
module.exports = installedVersions;

