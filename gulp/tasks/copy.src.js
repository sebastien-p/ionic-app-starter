'use strict';

/**
 * Copy application sources to the Cordova *www* directory.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Stream}
 */
function gulpCopySrc(gulp, plugins, config) {
  var task = config.TASKS['copy.src'];

  return gulp.src(task.src, { cwd: task.cwd })
    .pipe(plugins.changed(task.dest))
    .pipe(plugins.if(
      config.PATTERNS.js,
      // eslint-disable-next-line camelcase
      plugins.ngAnnotate({ single_quotes: true })
    ))
    .pipe(gulp.dest(task.dest));
}

module.exports = [gulpCopySrc];
