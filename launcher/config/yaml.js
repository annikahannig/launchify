'use strict';

/**
 * Load launchify (yaml) config from file
 * 
 * (c) 2015 Matthias Hannig
 */ 

// == Libraries
var yaml = require('js-yaml');
var sym  = require('log-symbols'); 
var fs   = require('fs');

// == Class: Config
var Config = function(configFile) {
  var self = this;
  try {
    var properties = yaml.safeLoad(
      fs.readFileSync(configFile, 'utf8')
    );

    // Set properties
    for(var k in properties) {
      var v = properties[k];
      self[k] = v;
    }
  }
  catch(e) {
    console.error(sym.error + ' Could not load config file.');
    console.error(e);
  }
};

// == Export
module.exports = Config;

