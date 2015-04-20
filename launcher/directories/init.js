'use strict';

/**
 * Initialize directory structure for a deploy
 * directory.
 *
 * (c) 2015 Matthias Hannig
 */

// == Load libraries
var logSymbols    = require('log-symbols');
var mkdirp        = require('mkdirp');
var path          = require('path');

// == Load modules
var isDeployDir   = require('../helper/is-deploy-dir'); 

// == Initialize deploy directory structure
var init = function(dest) {

  // Check if the destination directory is initialized.
  if(isDeployDir(dest)){
    console.error( 
      logSymbols.error +
      ' This deploy directory has already been initialized' + 
      ' with the app: '
    );

    process.exit(-1);
  }

  // Create deploy structure
  var directories = [
    'var/log/',
    'var/run/',
    'releases',
    'tmp/downloads',
    'tmp/release'
  ];

  directories.forEach(function(dir) {
    mkdirp.sync(path.join(dest, dir));
  });

};

// == Export module
module.exports = init;

