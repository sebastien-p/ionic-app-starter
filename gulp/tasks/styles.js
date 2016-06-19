'use strict';

var _ = require('lodash');

/**
 * Compile preprocessor style files into regular stylesheets.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Stream}
 */
function gulpStyles(gulp, plugins, config) {
  var task = config.TASKS.styles;

  return gulp.src(task.src)
    .pipe(plugins.sass({ errLogToConsole: true, indentedSyntax: true }))
    .pipe(plugins.if(
      config.IS_PROD,
      plugins.minifyCss({ keepSpecialComments: 0 })
    ))
    .pipe(plugins.if(
      config.IS_PROD,
      plugins.rename({ extname: '.min.css' })
    ))
    .pipe(gulp.dest(task.dest));
}

module.exports = [gulpStyles];
