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
var argv        = require('yargs').argv;

var projectInit = require('./cli/init');
var usage       = require('./cli/usage');
var download    = require('./cli/download');

var isDeployDir = require('./helper/is-deploy-dir');

// == Launcher CLI
//  Switch actions based on arguments
var actions = {
  'init':     projectInit,
  'help':     usage 
  /*
  'download': launcher_download,
  'start':    launcher_exec
  */
};

var action = argv._[0];

var actionRun    = false;
var actionParams = false;

// Are we within a deploy directory

// Is argv an url?
if(typeof(action) === 'string' && action.match(/^https?:\/\//)){
  actionRun    = 'download';
  actionParams = action;
}


