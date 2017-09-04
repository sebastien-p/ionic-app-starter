'use strict';

var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json'); // TODO: dynamic?

/**
 * Copy application sources to the Cordova *www* directory.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Stream}
 */
function gulpCopySrc(gulp, plugins, config) {
  var task = config.tasks['copy.src'];

  return gulp.src(task.src, { cwd: task.cwd })
    .pipe(plugins.changed(task.dest))
    .pipe(plugins.if(
      !config.IS_PROD && config.PATTERNS.TS,
      plugins.sourcemaps.init() // TODO: sass
    ))
    .pipe(plugins.if(
      config.PATTERNS.TS,
      tsProject(ts.reporter.longReporter())
    ))
    .pipe(plugins.if(
      config.PATTERNS.JS,
      // eslint-disable-next-line camelcase
      plugins.ngAnnotate({ single_quotes: true })
    ))
    .pipe(plugins.if(
      !config.IS_PROD && config.PATTERNS.JS,
      plugins.sourcemaps.write('./', { // TODO: generic
        includeContent: true,
        destPath: './modules'
      })
    ))
    .pipe(gulp.dest(task.dest));
}

module.exports = [gulpCopySrc];
