
/**
 * Run a script.
 * A script is a list of shell commands.
 *
 * (c) 2015 Matthias Hannig
 */

// == Libraries
var Promise = require('promise');
var cp      = require('child_process');
var sym     = require('log-symbols');

// == Modules
var Config   = require('../config/yaml');
var Omniconf = require('../config/omniconf');

// == Helper
var execCommandList = function(list, cb) {
  var conf = new Omniconf(process.cwd());

  if(list.length === 0) {
    // Run callback when we are done.
    if(typeof(cb) !== 'undefined'){ cb(); }
    return;
  }

  var ts  = new Date();
  var pre = sym.info + ' ' + ts + ': ';

  var cmd = list.shift();

  // Replace config variables
  cmd = cmd.replace(/{{.*?}}/g, function(match) {
    console.log(match);
    var attr  = match.substr(2, match.length - 4);
    var value = conf.get(attr);
    return value;
  });

  cp.exec(cmd, {
    env: process.env,
    cwd: process.cwd()
  },
  function(error, stdout, stderr) {
    if(error) {
      console.error("error while running script");
      return;
    }

    if(stdout) {
      console.log(pre + stdout.slice(0,-1));
    }
    if(stderr){
      console.log(pre + stderr.slice(0,-1));
    }

    execCommandList(list, cb);  
  });

};

// == Exec script
var scriptExec = function(scriptName) {
  var configFile = process.cwd() + '/launchify.yml';
  var config     = new Config(configFile);

  var promise = new Promise(function(resolve, reject){
    // Check if script exists
    if( !config.scripts || !config.scripts[scriptName] ) {
      reject('script_not_found');
      return;
    }

    var script = config.scripts[scriptName];
    execCommandList(script, function() {
      resolve('success');
    });
  });

  return promise;    
};

// == Export
module.exports = scriptExec;

