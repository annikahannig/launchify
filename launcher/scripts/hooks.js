
/**
 * Launchify provides various hooks to be executed 
 * throughout the update process.
 *
 * The following hooks are defined:
 *  - before_start
 *  - before_symlink
 *  - before_restart
 *  - after_restart
 *
 * Hooks are defined as scripts in the launchify config.
 */

// == Import
var scriptExec      = require('./exec');
var isScriptPresent = require('./exec').isScriptPresent;


var runHook = function(hook) {
  return function(reslease) {
    var promise = new Promise(function(resolve, reject) {
      if(!isScriptPresent(hook)) {
        // Resolve this promise since hooks are optional
        // and a blind runHook('before_start') should not break
        // the chain
        resolve(release);
        return;
      }

      // Run the script
      scriptExec(hook)
        .then(function(){
          // Everythings fine. Great.
          resolve(release);
        },
        function(err){
          // The hook script failed. This triggers an error. 
          reject(err);
        });
    });
    
    return promise;
  };
};

