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

var download        = require('../downloader/download');
var unpack          = require('../archiver/unpack');
var verify          = require('../verifier/verify');
var install         = require('../installer/install');

// == Action: Download release and initialize deploy directory.
var cli_download = function(argv) {

  // Get repository url from commandline and target directory
  var repositoryUrl   = argv._[0];
  var deployDirectory = process.cwd();
  
  // Create deploy directory
  initDirectories(deployDirectory);

  // Start (and verify) download
  download(repositoryUrl)
    .then(unpack())
    .then(verify())
    .then(install())
    .then(function(release){
      console.log(release);
    });

};


// == Export CLI downloader
module.exports = cli_download;

