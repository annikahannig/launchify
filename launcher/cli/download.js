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
var initDirectories = require('../directories/init');

var downloadMeta    = require('../downloader/download-release-meta');
var downloadRelease = require('../downloader/download-release');
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
  downloadMeta(repositoryUrl)
    .then(downloadRelease(repositoryUrl))
    .then(unpack())
    .then(verify())
    .then(install())
    .then(function(release) {
      console.log(logSymbols.success + ' Application successfully installed.');
    }, 
    function(err) {
      console.log(logSymbols.error + ' ' + err);
    });
};

// == Export CLI downloader
module.exports = cli_download;

