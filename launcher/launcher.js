'use strict';

/**
 * Launchify Application launcher and Updater
 * ------------------------------------------
 *
 * Loader CLI
 * Parse argv and dispatch required action.
 *
 * (c) 2015 Matthias Hannig
 */

// == Load package json
var pkg = require('../package.json');

// == Load modules
var argv          = require('yargs').argv;
var logSymbols    = require('log-symbols');

var cli_init      = require('./cli/init');
var cli_usage     = require('./cli/usage');
var cli_download  = require('./cli/download');
var cli_start     = require('./cli/start');
var cli_script    = require('./cli/script');

// == Launcher CLI
//  Switch actions based on arguments
var action = argv._[0];
var actions = {
  'init':     cli_init,
  'help':     cli_usage
  // 'start':   cli_exec 
};

// Print header
console.log(
  'Launchify ' + pkg.version +
  '                               ' +
  '(c) 2015 Matthias Hannig\n'
);

// Action is present?
if(typeof(action) === 'string') {
 
  // Is argv an url?
  if(action.match(/^https?:\/\//)){
    cli_download(argv); // Download and initialize app
  }
  else if(action === 'init') {
    cli_init(argv);
  }
  else { // display help text
    // Try to run a user script
    cli_script(argv).then(function(){}, function(err) {
      console.error(logSymbols.error + ' Could not run script: ' + err + "\n");
      // Everything failed. Just show the usage.
      cli_usage(argv);
    });
  }

}
else {
  if(cli_start(argv) === false) {
    // something was wrong. most likely the current working
    // directory is not a launchify working directory.
    cli_usage(argv);
  }
}
