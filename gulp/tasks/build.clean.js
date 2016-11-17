'use strict';

var del = require('del');

/**
 * Remove unused directories after a build process.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Promise}
 */
function gulpBuildClean(gulp, plugins, config) {
  var task = config.tasks['build.clean'];
  var opt = { cwd: task.cwd || '', nomount: true, strict: true, mark: true };

  return del(task.src, opt);
}

module.exports = [['build.rev.replace'], gulpBuildClean];
