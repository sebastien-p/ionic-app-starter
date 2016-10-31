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
  var task = config.tasks['build.useref'];

  return gulp.src(task.src, { cwd: task.cwd })
    .pipe(plugins.useref())
    .pipe(plugins.if(
      config.IS_PROD && config.PATTERNS.CSS,
      plugins.cleanCss({ keepSpecialComments: 0 })
    ))
    .pipe(plugins.if(
      config.IS_PROD && config.PATTERNS.JS,
      plugins.uglify()
    ))
    .pipe(gulp.dest(config.FOLDERS.SAME));
}

module.exports = [['default'], gulpBuildUseref];
