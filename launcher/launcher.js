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

// Action is present?
if(typeof(action) === 'string') {
 
  // Is argv an url?
  if(action.match(/^https?:\/\//)){
    cli_download(argv);
  }
  else if(action === 'init') {
    cli_init(argv);
  }

}

