'use strict';

/**
 * Concatenate and minify source files.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Stream}
 */
function gulpBuildUseref(gulp, plugins, config) {
  var task = config.TASKS['build.useref'];

  return gulp.src(task.src)
    .pipe(plugins.useref())
    .pipe(plugins.if(
      config.IS_PROD && config.PATTERNS.css,
      plugins.minifyCss({ keepSpecialComments: 0 })
    ))
    .pipe(plugins.if(
      config.IS_PROD && config.PATTERNS.js,
      plugins.uglify()
    ))
    .pipe(gulp.dest(config.FOLDERS.same));
}

module.exports = [['default'], gulpBuildUseref];
