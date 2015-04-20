'use strict';

/**
 * Display launchify usage
 * (c) 2015 Matthias Hannig
 */

var usage = [
  '',
  'Usage: launchify <command | url>',
  '',
  'where <command> is one of: init, help, start, stop',
  'where <url> is the url of an app repository.',
  '',
  'launchify init      create a new launchify.yml in your project',
  'launchify start     run your app',
  'launchify stop      stop the app. (Useful if used with daemonize.)',
  'launchify help      display this help text.',
  '',
  'launchify           without parameters it will start the application',
  '                    if executed within a deploy directory.',
  '                    Otherwise it will display this help text.',
  ''
];


var printUsage = function() {
  console.log(usage.join('\n'));
};

// == Export usage
module.exports = printUsage;

