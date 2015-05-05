'use strict';

/**
 * Start launchified application
 * (c) 2015 Matthias Hannig
 */

// == Libraries
var sym = require('log-symbols');
var fs  = require('fs');

// == Modules
var Config         = require('../config/yaml');
var currentRelease = require('../release/current-release');
var every          = require('../scheduler/every');

var cli_update     = require('./update');

var cli_run        = require('./run');
var cli_testrun    = require('./testrun');

// == Launchify main
var start = function(argv) {
  var release = currentRelease();
  if(!release) {
    // This is not a working directory.
    // Check if there is a launchify.yml - in that case: 
    //  -> Parse the file
    //  -> Run the app.
    //  -> Assume this is a testrun.
    var configFile = process.cwd() + '/launchify.yml';
    try { fs.statSync(configFile); }
    catch(e) { return false; } // Nope this is not even a test.
    
    var config = new Config(configFile);
   
    if(config) {
      console.log(sym.success + ' Found valid launchify configuration' );
      console.log(sym.success + ' Running app: ' + config.app.name  );
      console.log(sym.info    +
        ' Not checking for updates every: ' +
        config.updates.interval
      );

      var proc = cli_testrun(config); 
      return proc;
    }
    
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

