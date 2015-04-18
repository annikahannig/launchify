'use strict';

/**
 * Update the app
 *
 * Afert downloading the RELEASE metadata it 
 * checks if there is an update ready.
 * 
 * (c) 2015 Matthias Hannig
 */

// == Libraries
var sym = require('log-symbols');

// == Modules
var currentRelease = require('../release/current-release');

var parseRelease    = require('../release/parse-release');
var needsUpdate     = require('../release/needs-update');

var downloadMeta    = require('../downloader/download-release-meta');
var downloadRelease = require('../downloader/download-release');
var unpack          = require('../archiver/unpack');
var verify          = require('../verifier/verify');
var install         = require('../installer/install');

// == Update application (if needed)
var cli_update = function(argv) {
  var _release = currentRelease();
  var repositoryUrl = _release.updates.repository;
  
  console.log( sym.info + ' Checking for updates at: ' + new Date() );
  
  // Start (and verify) download
  downloadMeta(repositoryUrl)
    .then(needsUpdate(_release.version))
    .then(downloadRelease(repositoryUrl))
    .then(unpack())
    .then(verify())
    .then(install())
    .then(function(release){
      console.log(sym.success + 
        ' ' + _release.app.name + ' successfully updated: ' +
        _release.version + ' -> ' + release.version
      );
    }, 
    function(err) {
      if(err == 'release_is_up_to_date') {
        // Ignore this. Everything is up to date.
        // Don't spam logfile.
      }
      else {
        console.log(sym.error + ' ' + err);
      }
    });

};

// == Export
module.exports = cli_update;

