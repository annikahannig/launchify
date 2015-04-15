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
var http       = require('http');
var fs         = require('fs');

/**
 * Download release archive and signature.
 *
 * @return Promise
 */
var loadRelease = function(repositoryUrl) {
  return function(release) {
    console.log(logSymbols.info + ' Downloading release...');
    var promise = new Promise(function(resolve, reject){
    
      var archiveUrl    = repositoryUrl + '/' + release.file;
      var signatureUrl  = repositoryUrl + '/' + release.file + '.sig';

      var archiveFile   = fs.createWriteStream(
        process.cwd() + '/tmp/downloads/' + release.file
      );

      var signatureFile = fs.createWriteStream(
        process.cwd() + '/tmp/downloads/' + release.file + '.sig'
      );
      
      var reqArchive = http.get(archiveUrl, function(res){
        if(res.statusCode == 200) {
          res.pipe(archiveFile);
        }
        else {
          console.error(logSymbols.error + ' Could not download archive.');
          reject('archive download filed');
        }

        res.on('end', function(){
          console.log(logSymbols.success + ' Archive ' + release.file + ' downloaded.');
        });
      });

      var reqSignature = http.get(signatureUrl, function(res){
        res.pipe(signatureFile);
        res.on('end', function(){
          console.log(logSymbols.success + ' Archive signature downloaded.');
        });
      });

    });
    return promise;
  };
};

// == Export module
module.exports = loadRelease;

