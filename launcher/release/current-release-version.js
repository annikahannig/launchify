'use strict';

/**
 * Get the version of the currently installed
 * release by following the ./current symlink.
 *
 *
 * (c) 2015 Matthias Hannig
 */

// == Libraries
var path = require('path');
var fs   = require('fs');

// == Modules
var Config = require('../config/yaml');

// == Get version of current releases
var currentReleaseVersion = function(){
  var configFile = process.cwd() + '/current/launchify.yml';
  try {
    fs.statSync(configFile);
  }
  catch (e){
    return; // File does not exists
  }

  // Extract version from release path 
  var releasePath = fs.realpathSync(process.cwd() + '/current');
  var tokens      = releasePath.split('-');
  var version     = tokens[tokens.length - 1];

  return version;
};

// == Export
module.exports = currentReleaseVersion;

