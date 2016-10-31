'use strict';

var _ = require('lodash');

/**
 * Watch files for changes and trigger tasks accordingly.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 */
function gulpWatch(gulp, plugins, config) {
  _.each(config.tasks.watch, function each(watch) {
    gulp.watch(watch.src, _.pick(watch, 'cwd'), watch.tasks);
  });
}

module.exports = [['default'], gulpWatch];
