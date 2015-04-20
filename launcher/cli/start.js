'use strict';

/**
 * Start launchified application
 * (c) 2015 Matthias Hannig
 */

// == Libraries
var sym = require('log-symbols');

// == Modules
var currentRelease = require('../release/current-release');
var every          = require('../scheduler/every');

var cli_update     = require('./update');

var cli_run        = require('./run');

// == Launchify main
var start = function(argv) {
  var release = currentRelease();
  if(!release) {
    // This is not a working directory.
    // Do nothing. Fast forward to 'usage'
    return false;
  }

  console.log( 
    sym.success + ' Found installed app: ' + release.app.name +
    ' (' + release.version + ')'
  );

  // Launch app
  var child = cli_run(argv); 
  
  // Install update scheduler
  console.log(
    sym.info + ' Checking for updates every: ' + release.updates.interval
  );
  every(release.updates.interval, function() {
    cli_update(argv)
      .then(function(){
        child.restart();
      });
  });

  // Check for update now.
  cli_update(argv)
    .then(function() {
      child.restart();
    });


  return true;
};

// == Export command line task
module.exports = start;

