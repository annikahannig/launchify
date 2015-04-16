'use strict';

/**
 * Unpack downloaded files
 *
 * (c) 2015 Matthias Hannig
 */

// == Libraries
var Promise    = require('promise');
var logSymbols = require('log-symbols');
var remove     = require('remove');
var mkdirp     = require('mkdirp');
var Targz      = require('tar.gz');
var mv         = require('mv');

// == Modules
var findRoot   = require('../release/find-root');

// == Helper
var removeDir = function(dir) {
  remove.removeSync(
    dir, { ignoreMissing: true }
  );
};

// == Extract archive to tmp directory.
var unpack = function() {
  return function(release) {
    var tmpRelease  = process.cwd() + '/tmp/release';
    var tmpExtract  = process.cwd() + '/tmp/extract';
    var archiveFile = process.cwd() + '/tmp/downloads/' + release.file;
    
    // Make sure the temp directory is empty.
    removeDir(tmpRelease);
    removeDir(tmpExtract);
    mkdirp.sync(tmpExtract);

    var promise = new Promise(function(resolve, reject){
      
      // Extract archive
      var tgz = new Targz();
      tgz.extract(archiveFile, tmpExtract, function(err){
        if(err) {
          reject('could not extract archive');
        }

        // find launchify root and move it to tmp/release
        var releaseRoot = findRoot(tmpExtract);
        if(releaseRoot) {
          console.log(
            logSymbols.success +
            ' Found app root in: ' + 
            releaseRoot
          );

          // move directory
          mv(releaseRoot, tmpRelease, function(err) {
            if(err) {
              console.error(logSymbols.error + ' Could not move tmp release.');
              reject('could_not_move_tmp_release');
            }
            else {
              console.log(logSymbols.success + ' Archive extracted.');
              resolve(release);
            }
          });

        }
        else {
          console.error(logSymbols.error + ' Could not find application root');
          reject('app_root_not_found');
        }

        // remove tmp/extract.

         
      }); 

    });

    return promise;
  };
};

// == Export module
module.exports = unpack;

