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

// == Load modules
var argv          = require('yargs').argv;
var logSymbols    = require('log-symbols');

var cli_init      = require('./cli/init');
var cli_usage     = require('./cli/usage');
var cli_download  = require('./cli/download');

// == Launcher CLI
//  Switch actions based on arguments
var action = argv._[0];
var actions = {
  'init':     cli_init,
  'help':     cli_usage
  // 'start':   cli_exec 
};

// Is argv an url?
if(typeof(action) === 'string' && action.match(/^https?:\/\//)){
  // Run download action.
  cli_download(argv);
}
else {

}

