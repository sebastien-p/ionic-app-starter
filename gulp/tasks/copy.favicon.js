'use strict';

/**
 * Copy favicons to the Cordova *www* directory.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Stream}
 */
function gulpCopyFavicons(gulp, plugins, config) {
  var task = config.TASKS['copy.favicon'];

  return gulp.src(task.src[config.APP_ID], { cwd: task.cwd })
    .pipe(plugins.rename({ basename: 'favicon' }))
    .pipe(gulp.dest(task.dest));
}

module.exports = [gulpCopyFavicons];
