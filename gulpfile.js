'use strict';

/**
 * The gulp configuration and tasks are splitted
 * into multiple files. 
 *
 * (c) 2015 Matthias Hannig
 */

// == Set environment: Choose between 'development' or 'production'
global.buildEnv = 'development';

// == Load gulp config
require('./gulp/build');

