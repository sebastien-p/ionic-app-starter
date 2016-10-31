'use strict';

/**
 * Copy favicons to the Cordova *www* directory.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Stream}
 */
function gulpCopyFavicon(gulp, plugins, config) {
  var task = config.tasks['copy.favicon'];
  var src = config.APP_ID + '/' + task.src;

  return gulp.src(src, { cwd: task.cwd, read: false })
    .pipe(plugins.rename({ basename: 'favicon' }))
    .pipe(gulp.dest(task.dest));
}

module.exports = [gulpCopyFavicon];
