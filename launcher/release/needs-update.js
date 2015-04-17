'use strict';

/**
 * Check if release needs update
 * (c) 2015 Matthias Hannig
 */

// == Libraries
var Promise = require('promise');

// == Helper
var compare = require('../version/compare');

// == Update check
var needsUpdate = function(currentVersion) {
  return function(release) {
    var promise = new Promise(function(resolve, reject) {
      // A current version is not installed. We need to update.
      if(typeof(currentVersion) === 'undefined'){
        resolve(release);
        return;
      }

      if(compare.isNewer(release.version, currentVersion)){
        resolve(release);
        return;
      }

      reject('release_is_up_to_date');
    });
    return promise;
  };
};

// == Export
module.exports = needsUpdate;

