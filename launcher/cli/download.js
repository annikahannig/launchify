'use strict';

/**
 * CLI Download module
 * Invokes the downloader and prepares the deploy directory.
 *
 * (c) 2015 Matthias Hannig
 */

// == Load libraries
var logSymbols    = require('log-symbols');

// == Load modules
var isDeployDir     = require('../helper/is-deploy-dir'); 
var initDirectories = require('../directories/init');

// == Action: Download release and initialize deploy directory.
var download = function(argv) {
  
  // Get repository url from commandline and target directory
  var repositoryUrl   = argv._[0];
  var deployDirectory = process.cwd();
  
  // Create deploy directory
  initDirectories(deployDirectory);


};


// == Export CLI downloader
module.exports = download;

