'use strict';


/**
 * Omniconf - Any config file in the project directory
 * can be referenced by specifying a path
 *
 * Example: 
 * Files: ./package.json, ./config/deploy.yml
 * where: '.' is the process.cwd()
 *
 * To get the package version the lookup would be:
 * conf.get('package.version')
 *
 * To get the deploy path it would be
 * conf.get('config.deploy.target')
 *
 * 
 * (c) 2015 Matthias Hannig
 */

// == Libraries
var fs   = require('fs');
var path = require('path');
var yaml = require('js-yaml');

// == Class: Omniconf
var Omniconf = function(rootPath) {
  this.rootPath = rootPath;
  this.configs = {};
};

/**
 * conf->lookupConfigFile
 *
 * @param refPath The refenced variable in the config file.
 * @return [string, string] The full config filename path, 
 *                          The Leftover path
 */
Omniconf.prototype.lookupConfigFile = function(refPath) {
  var self   = this;
  var tokens = refPath.split('.');
    
  // Iterate over tokens; Build path. Check if 
  // file exists. (.yml / .json)
  var path       = self.rootPath;
  var tokenCount = 0;
  var configFile = null;
  
  for(var i in tokens) {
    var token =  tokens[i];
    
    path        += '/' + token;
    tokenCount  += 1;

    // check if config file exists
    if(fs.existsSync(path + '.yml')) {
      configFile = path + '.yml';
      break;
    }

    if(fs.existsSync(path + '.json')) {
      configFile = path + '.json';
      break;
    }
  }

  if(configFile) {
    return [configFile, tokens.slice(tokenCount)];
  }

  return null;
};


/**
 * Load JSON config
 */
Omniconf.prototype.loadJsonConfigSync = function(filename) {
  var self = this;
  var content = fs.readFileSync(filename, 'utf8');
  self.configs[filename] = JSON.parse(content);
};

/**
 * Load Yaml config
 */
Omniconf.prototype.loadYamlConfigSync = function(filename) {
  var self = this;
  var content = fs.readFileSync(filename, 'utf8');
  self.configs[filename] = yaml.safeLoad(content);
};


/**
 * conf->loadConfig(FileName)
 */
Omniconf.prototype.loadConfigSync = function(filename) {
  var self = this; 

  switch(path.extname(filename)) {
    case '.yml':
      self.loadYamlConfigSync(filename);
      break;
    case '.json':
      self.loadJsonConfigSync(filename);
      break;
  }
};

/**
 * conf->get - Access config
 */
Omniconf.prototype.get = function(ref) {
  var self = this;
  
  // TODO: Optimize this
  var result = self.lookupConfigFile(ref);
  if(!result) {
    return;
  }

  var configFile = result[0];
  var tokens     = result[1];

  if(typeof(self.configs[configFile]) === 'undefined') {
    self.loadConfigSync(configFile);
  }

  var attrib = self.configs[configFile]; 
  for(var i in tokens) {
    var token = tokens[i];
    if(typeof(attrib[token]) !== 'undefined') {
      attrib = attrib[token];
    }
    else {
      attrib = undefined;
    }
  }
  
  return attrib;
};


// == Export Class: Omniconf
module.exports = Omniconf;

