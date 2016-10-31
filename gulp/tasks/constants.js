'use strict';

var set = require('lodash').set;

/**
 * Add some app-level dynamic Angular constants.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Stream}
 */
function gulpConstants(gulp, plugins, config) {
  var task = config.tasks.constants;
  var defaultDest = config.FOLDERS.WWW + 'modules/' + task.module + '/';

  return plugins.ngConstant({
    constants: set(config.CONSTANTS, 'IS_PROD', config.IS_PROD),
    name: task.module,
    stream: true,
    deps: false,
    // Be careful, setting `wrap` to `true` using the default template
    // breaks further gulp-angular-filesort call after minification...
    wrap: false
  })
    .pipe(plugins.rename(task.file || 'constants.js'))
    .pipe(plugins.if(config.IS_PROD, plugins.uglify()))
    .pipe(gulp.dest(task.dest || defaultDest));
}

module.exports = [gulpConstants];
