'use strict';

var bower = require('bower');

/**
 * Install client dependencies.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @return {Promise}
 */
function gulpInstallLib(gulp, plugins) {
  return bower.commands.install().on('log', function log(data) {
    var dependency = plugins.util.colors.cyan(data.id);
    plugins.util.log('bower', dependency, data.message);
  });
}

module.exports = [['setup', 'check'], gulpInstallLib];
