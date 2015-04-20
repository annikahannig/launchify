'use strict';

/**
 * Creates a new launchify configuration for
 * your application.
 *
 * (c) 2015 Matthias Hannig
 */


// == Load libraries
var fs          = require('fs');
var path        = require('path');
var ejs         = require('ejs');
var inquirer    = require('inquirer');
var logSymbols  = require('log-symbols');
var _           = require('underscore');

// == Load modules
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
  var configFilename = 'launchify.yml';

  // Get config template
  var configTmplSrc = fs.readFileSync(
    path.join(__dirname, '../../templates', 'launchify.yml.ejs'),
    { 'encoding': 'utf8' }
  );

  var configTmpl = ejs.compile(configTmplSrc);

  // Get gpg signing keys
  var siginingKeys = gpgKeys.secret()
    .then(function(keys) {

      // Ask about this project
      var options = [
        {
          type: 'input',
          name: 'appName',
          message: 'The name of your project',
          default: projectName
        },
        {
          type: 'input',
          name: 'exec',
          message: 'The command to launch your app',
          default: './bin/' + projectName
        },
        {
          type: 'input',
          name: 'repositoryUrl',
          message: 'App update repository url'
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
        // Create new project file from template.
        var gpgKey = _.findWhere(keys, { id: result.gpgKeyId });

        result.gpg = {
          keyId:       gpgKey.id,
          uid:         gpgKey.uid,
          fingerprint: gpgKey.fingerprint
        };

        var configYml = configTmpl({
          config: result
        });
        
        fs.writeFile(configFilename, configYml, { encoding: 'utf8' });
        
        console.log(logSymbols.success + ' Launchify configuration created.');
      });
    });
};

// == Export module
module.exports = init;

