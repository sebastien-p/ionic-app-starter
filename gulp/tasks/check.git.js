'use strict';

var sh = require('shelljs');

/**
 * Check whether Git is installed and available.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @param {Function} done - Function to call when asynchrounous stuff is done.
 */
function gulpGitCheck(gulp, plugins, config, done) {
  var colors = plugins.util.colors;

  if (!sh.which('git')) {
    console.log(
      '  ' + colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Visit ' + colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once installed, run \'' + colors.cyan('gulp install') + '\'.'
    );
    process.exit(1);
  }

  done();
}

module.exports = [gulpGitCheck];
