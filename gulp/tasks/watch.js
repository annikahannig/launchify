'use strict';

/**
 * Task: watch 
 *
 * Watch filesystem for changes in files and 
 * run the corresponding tasks.
 */

var gulp = require('gulp');

// == Register task: watch
gulp.task('watch', function(){

  gulp.watch('**/*.js',     ['scripts']);

});

