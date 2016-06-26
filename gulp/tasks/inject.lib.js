'use strict';

var bowerFiles = require('main-bower-files');

/**
 * Inject styles and scripts dependencies into the project targets html files.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Stream}
 */
function gulpInjectLib(gulp, plugins, config) {
  var task = config.TASKS['inject.lib'];
  // Get regular or minified files depending on the requested build type.
  var opt = { env: config.IS_PROD ? 'prod' : 'dev' };
  var lib = gulp.src(bowerFiles(opt), { read: false });

  return gulp.src(task.src, { cwd: task.cwd })
    .pipe(plugins.inject(lib, { name: 'lib', relative: true }))
    .pipe(gulp.dest(config.FOLDERS.same)
  );
}

module.exports = [['copy'], gulpInjectLib];
