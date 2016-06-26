'use strict';

var _ = require('lodash');

/**
 * Add some app-level dynamic Angular constants.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Stream}
 */
function gulpConstants(gulp, plugins, config) {
  var task = config.TASKS.constants;

  var defaultDest = config.FOLDERS.www + 'modules/' + task.module + '/';

  return plugins.ngConstant({
    name: task.module,
    stream: true,
    deps: false,
    // Be careful, setting `wrap` to `true` using the default template
    // breaks further gulp-angular-filesort call after minification...
    wrap: false,
    constants: _.merge(
      // Define some default constants.
      {
        APP_NAME: config.TARGET.name || config.APP.name,
        APP_VERSION: config.INFOS.version
      },
      // Merge common constants with build, app and target-related ones.
      config.INFOS.common.constants,
      config.BUILD.constants,
      config.APP.constants,
      config.TARGET.constants
    )
  })
    .pipe(plugins.rename(task.file || 'constants.js'))
    .pipe(plugins.if(config.IS_PROD, plugins.uglify()))
    .pipe(gulp.dest(task.dest || defaultDest));
}

module.exports = [gulpConstants];
