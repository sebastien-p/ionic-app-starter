'use strict';

/**
 * Append revision hash to given files.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Stream}
 */
function gulpBuildRev(gulp, plugins, config) {
  var task = config.TASKS['build.rev'];

  return gulp.src(task.src, { cwd: task.cwd, base: task.cwd })
    .pipe(plugins.rev())
    // Append a dollar sign to avoid double hash bug
    // Be careful not to name file $.xxx!
    .pipe(plugins.revFormat({ suffix: '$' }))
    .pipe(gulp.dest(config.FOLDERS.same))
    .pipe(plugins.revDeleteOriginal())
    .pipe(plugins.rev.manifest(task.manifest || 'rev-manifest.json'))
    .pipe(gulp.dest(task.cwd));
}

module.exports = [['build.useref'], gulpBuildRev];
