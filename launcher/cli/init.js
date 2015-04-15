'use strict';

/**
 * Creates a new launchify configuration for
 * your application.
 *
 * (c) 2015 Matthias Hannig
 */


// == Load libraries
var path        = require('path');
var inquirer    = require('inquirer');
var logSymbols  = require('log-symbols');

// == Helper

/**
 * Suggest a project name. Use the current working
 * directory.
 */
var suggestProjectName = function() {
  var name = path.dirname(process.cwd());
  return name;
};


// == Initialize launchify project
var init = function(argv) {

  var projectName = suggestProjectName();

  // Ask about this project
  var options = [
    {
      type: 'input',
      name: 'name',
      message: 'The name of your project',
      default: projectName
    },
    {
      type: 'input',
      name: 'exec',
      message: 'The command to launch your app',
      default: './bin/'+projectName
    },
    {
      type: 'input',
      name: 'gpgKeyId',
      message: 'The id (short hex hash) of your signing gpg key'
    }
  ];

  // Create new project file from template.

};

// == Export module
module.export = init;

