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
var gpgKeys     = require('../gpg/keys');

// == Helper

/**
 * Suggest a project name. Use the current working
 * directory.
 */
var suggestProjectName = function() {
  var name = path.basename(process.cwd());
  return name;
};


// == Initialize launchify project
var init = function(argv) {

  var projectName = suggestProjectName();

  // Get gpg signgin keys
  var siginingKeys = gpgKeys.secret()
    .then(function(keys){

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
          type: 'list',
          name: 'gpgKeyId',
          message: 'The signing gpg key',
          choices: keys.map(function(key){
            return {
              name:  key.id + ' ' + key.uid,
              value: key.id
            };
          })
        },
        {
          type: 'confirm',
          name: 'confirmed',
          default: true,
          message: 'Looks good?'
        }
      ];
      
      inquirer.prompt(options, function(result) {
        console.log(result);
      });
      
    });


  // Create new project file from template.

};

// == Export module
module.exports = init;

