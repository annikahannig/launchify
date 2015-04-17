'use strict';

/**
 * Get the config of the currently 
 * installed release located in ./current
 *
 * (c) 2015 Matthias Hannig
 */

// == Libraries
var path = require('path');
var fs   = require('fs');

// == Modules
var Config = require('../config/yaml');

// == Helper
var currentVersion = require('./current-release-version');

// == Get config of current releases
var currentRelease = function(){
  var configFile = process.cwd() + '/current/launchify.yml';
  // Check if file exists otherwise return undefined.
  try {
    fs.statSync(configFile);
  }
  catch(e) {
    return; // File does not exists
  }

  var release = new Config(configFile);

  // Get version
  release.version = currentVersion();

  return release;
};

// == Export
module.exports = currentRelease;

