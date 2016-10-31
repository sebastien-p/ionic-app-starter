'use strict';

/**
 * Compile preprocessor style files into regular stylesheets.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Stream}
 */
function gulpStyles(gulp, plugins, config) {
  var task = config.tasks.styles;
  var opt = { indentedSyntax: true };

  return gulp.src(task.src, { cwd: task.cwd })
    .pipe(plugins.sass(opt).on('error', plugins.sass.logError))
    .pipe(plugins.if(
      config.IS_PROD,
      plugins.cleanCss({ keepSpecialComments: 0 })
    ))
    .pipe(gulp.dest(task.dest));
}

module.exports = [gulpStyles];
