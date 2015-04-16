'use strict';

/**
 * Install a verified release:
 * Move release from: tmp/release to releases/appname-version
 * Remove current symlink; create new symlink.
 *
 * (c) 2015 Matthias Hannig
 */

// == Libraries

var remove = require('remove');
var sym    = require('log-symbols');


