'use strict';

var mainBowerFiles = require('main-bower-files');
var mergeStream = require('merge-stream');
var reduce = require('lodash').reduce;

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
  var env = config.IS_PROD ? 'prod' : 'dev';

  return reduce(task.src, function handle(merged, src) {
    return merged.add(
      gulp.src(src, { cwd: task.cwd })
        .pipe(plugins.inject(
          // Get regular or minified files depending on the build type.
          gulp.src(mainBowerFiles({ env: env }), { read: false }),
          { name: 'lib', relative: true }
        ))
        .pipe(gulp.dest(config.FOLDERS.same))
    );
  }, mergeStream());
}

module.exports = [['copy'], gulpInjectLib];
