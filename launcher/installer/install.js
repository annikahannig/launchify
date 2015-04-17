'use strict';

/**
 * Install a verified release:
 * Move release from: tmp/release to releases/appname-version
 * Remove current symlink; create new symlink.
 *
 * (c) 2015 Matthias Hannig
 */

// == Libraries
var Promise = require('promise');
var remove  = require('remove');
var mkdirp  = require('mkdirp');
var sym     = require('log-symbols');
var mv      = require('mv');
var fs      = require('fs');

// == Modules

// == Install
var install = function() {
  return function(release) {

    var currentSymlink = process.cwd() + '/current';
    var tmpRelease     = process.cwd() + '/tmp/release';
    var destRelease    = process.cwd() + '/releases/' +
      release.config.app.name + '-' +
      release.version;

    // Remove version if exists
    remove.removeSync(destRelease, {ignoreMissing: true});

    // Move release
    mv(tmpRelease, destRelease, function(err) {
      console.log( sym.error + ' ' + err);
    });
    console.log(
      sym.success + ' Installed release: ' +
      release.config.app.name + '-' + release.version 
    );

    // recreate symlink
    remove.removeSync(currentSymlink, { ignoreMissing: true });
    fs.symlinkSync(destRelease, currentSymlink);

    console.log( sym.success + ' Created symlink' );
    
    return release;
  };
};

// == Export
module.exports = install;

