'use strict';

/**
 * Get a list of all installed releases
 * (c) 2015 Matthias Hannig
 */

// == Libraries
var path = require('path');
var glob = require('glob');

// == Get list of all releases
var installedVersions = function(){
  var releasePath = process.cwd() + '/releases';
  var files       = glob.sync(releasePath + '/**/launchify.yml');
  
  var releases    = files.map(function(f){
    var t = path.basename(path.dirname(f)).split('-');
    return t[t.length-1]; // Get last 'token' -> VERSION string.
  });

  return releases;
};

// == Export
module.exports = installedVersions;

