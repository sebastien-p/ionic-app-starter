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

  var lib = gulp.src(
    // Get regular or minified files depending on the requested build type.
    bowerFiles({ env: config.IS_PROD ? 'prod' : 'dev' }),
    { read: false }
  );

  return gulp.src(task.src)
    .pipe(plugins.inject(lib, { name: 'lib', relative: true }))
    .pipe(gulp.dest(config.FOLDERS.same)
  );
}

module.exports = [['copy'], gulpInjectLib];
