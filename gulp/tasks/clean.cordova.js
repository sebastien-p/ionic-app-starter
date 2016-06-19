'use strict';

var del = require('del'); // TODO: use shelljs?

/**
 * Remove Cordova-related directories and files to get a fresh working folder.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @param {Function} done - Function to call when asynchrounous stuff is done.
 */
function gulpCleanCordova(gulp, plugins, config, done) {
  var task = config.TASKS['clean.cordova'];

  del(task.src, { nomount: true, strict: true, mark: true }, done);
}

module.exports = [gulpCleanCordova];
