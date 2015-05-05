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

// == Execute current release
//    Returns the 'child' process
var testrun = function(config) {
  var releaseCwd = process.cwd();
  
  // Start forever
  var child = forever.start([config.app.exec], {
    env: process.env
  });

  child.on('start', function() {
    console.log( sym.success + ' ' + config.app.name + ' started.' );
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
module.exports = testrun;

