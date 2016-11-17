'use strict';

var del = require('del');

/**
 * Remove Cordova-related directories and files to get a fresh working folder.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Promise}
 */
function gulpCleanCordova(gulp, plugins, config) {
  var task = config.tasks['clean.cordova'];
  var opt = { cwd: task.cwd || '', nomount: true, strict: true, mark: true };

  return del(task.src, opt);
}

module.exports = [gulpCleanCordova];
