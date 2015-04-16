'use strict';

/**
 * Download the release and store files in
 * tmp/downloads/
 *
 * (c) 2015 Matthias Hannig
 */

// == Load libraries
var logSymbols = require('log-symbols');
var Promise    = require('promise');
var fs         = require('fs');

var ProgressBar  = require('progress');
var request      = require('request');

// == Helper

/**
 * Download files
 * @return Promise
 */
var downloadFile = function( filename, url ) {
  var promise = new Promise(function(resolve, reject){

    var file = fs.createWriteStream(
      process.cwd() + '/tmp/downloads/' + filename
    );

    // Start download with progress bar
    request
      .get(url)
      .on('response',function(res) {
        // Create progress bar 
        var total = parseInt(res.headers['content-length'], 10); 
        var bar = new ProgressBar('  [:bar] :percent :etas', {
          complete: '=',
          incomplete: ' ',
          width: 40,
          total: total
        });

        res.on('data', function(chunk) {
          bar.tick(chunk.length);
        });
      })
      .on('error',function(err) {
        reject(err);
      })
      .pipe(file)
      .on('error', function(err) {
        reject(err);
      })
      .on('close', function() {
        console.log(logSymbols.success + ' finished downloading ' + filename);
        resolve(filename);
      });
  });
  return promise;
};


/**
 * Download archive signature.
 */



/**
 * Download release archive.
 *
 * @return Promise
 */
var loadRelease = function(repositoryUrl) {
  return function(release) {
    console.log(logSymbols.info + ' Downloading release archive');
    var promise = new Promise(function(resolve, reject){
      
      // Download release
      var archiveUrl       = repositoryUrl + '/' + release.file;
      var archiveFilename  = release.file;
  
      var sigUrl       = repositoryUrl + '/' + release.file + '.sig';
      var sigFilename  = release.file + '.sig';

      Promise.all([
        downloadFile(archiveFilename, archiveUrl        ),
        downloadFile(sigFilename,     sigUrl,      false) // no progress
      ])
        .then(
          function(result){
            resolve(release);
          },
          function(err){
            reject(err);
          }
        );
    });
    return promise;
  };
};

// == Export module
module.exports = loadRelease;

