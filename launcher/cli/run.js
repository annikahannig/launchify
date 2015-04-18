'use strict';

/**
 * Spawn a new child process for the app
 * Run application as defined in launchify.yml
 *
 * Use forever to do this.
 *
 * (c) 2015 Matthias Hannig
 */


// == Libraries
var forever = require('forever-monitor');
var sym     = require('log-symbols');

// == Modules
var currentRelease = require('../release/current-release');

// == Execute current release
//    Returns the 'child' process
var run = function() {
  var release    = currentRelease();
  var releaseCwd = process.cwd() + '/current';
  var releasePid = process.cwd() + '/var/run/' + release.app.name + '.pid';
  var releaseOut = process.cwd() + '/var/log/' + release.app.name + '.stdout';
  var releaseErr = process.cwd() + '/var/log/' + release.app.name + '.stderr';
  
  // Start forever
  var child = forever.start([release.app.exec], {
    silent: true,

    cwd: releaseCwd,
    env: process.env,

    pidFile: releasePid,

    outFile: releaseOut,
    errFile: releaseErr
  });

  child.on('start', function() {
    console.log( sym.success + ' ' + release.app.name + ' started.' );
  });
  
  child.on('watch:restart', function(info) {
    console.error('Restaring script because ' + info.file + ' changed');
  });

  child.on('restart', function() {
  });

  child.on('exit:code', function(code) {
  });

  return child;
};

// == Export
module.exports = run;

