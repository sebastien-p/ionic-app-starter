'use strict';

/**
 * Group internationalisation JSON files to be used by Angular Translate.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Stream}
 */
function gulpI18n(gulp, plugins, config) {
  var task = config.TASKS.i18n;

  var opt = [{ module: task.module || 'app.i18n', standalone: false }];
  if (task.file) { opt.unshift(task.file); }

  return gulp.src(task.src)
    .pipe(plugins.angularTranslate.apply(plugins, opt))
    .pipe(plugins.if(config.IS_PROD, plugins.uglify()))
    .pipe(gulp.dest(task.dest));
}

module.exports = [gulpI18n];
