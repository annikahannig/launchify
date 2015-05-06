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
var Promise = require('promise');
var sym     = require('log-symbols');

// == Modules
var currentRelease = require('../release/current-release');

var parseRelease    = require('../release/parse-release');
var needsUpdate     = require('../release/needs-update');

var downloadMeta    = require('../downloader/download-release-meta');
var downloadRelease = require('../downloader/download-release');
var unpack          = require('../archiver/unpack');
var verify          = require('../verifier/verify');
var install         = require('../installer/install');

// Prevent updating while an update is currently
// in progress.
var _updateMutexLocked = false;

// == Update application (if needed)
var cli_update = function(argv) {
  var _release = currentRelease();
  var repositoryUrl = _release.updates.repository;

  console.log(sym.info + ' Checking for updates at: ' + new Date());
  
  // Start (and verify) download
  var promise = new Promise(function(resolve, reject) {
    if(_updateMutexLocked) {
      console.log(sym.info + ' Not checking for updates at: ' +
        new Date() +
        ' - Update in progress.'
      );

      reject('update_in_progress');
      return;  
    }

    // Lock updater
    _updateMutexLocked = true;

    // Start update 
    downloadMeta(repositoryUrl)
      .then(needsUpdate(_release.version))
      .then(downloadRelease(repositoryUrl))
      .then(unpack())
      .then(verify())
      .then(install())
      .then(function(release){
        // Update finished.
        _updateMutexLocked = false;

        console.log(sym.success + 
          ' ' + _release.app.name + ' successfully updated: ' +
          _release.version + ' -> ' + release.version
        );

        resolve(release);
      }, 
      function(err) {
        // Update failed.
        _updateMutexLocked = false;

        if(err == 'release_is_up_to_date') {
          // Everything is up to date.
        }
        else {
          console.log(sym.error + ' ' + err);
        }

        reject(err);
      });
  });
  
  return promise;
};

// == Export
module.exports = cli_update;

