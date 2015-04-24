'use strict';

/**
 * Try to run a script, defined by the user
 * in launchify.yml
 *
 * (c) 2015 Matthias Hannig
 */

// == Modules
var scriptExec = require('../scripts/exec');

// == Run Script
var script = function(argv) {
  var scriptName = argv._[0];
  return scriptExec(scriptName);
};

// == Export
module.exports = script;

