'use strict';

var findKey = require('lodash').findKey;

/**
 * Copy favicons to the Cordova *www* directory.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Stream}
 */
function gulpCopyFavicons(gulp, plugins, config) {
  var task = config.TASKS['copy.favicons'];

  var src = task.src[findKey(config.APPS, config.APP)];

  return gulp.src(src, { cwd: task.cwd })
    .pipe(plugins.rename({ basename: 'favicon' }))
    .pipe(gulp.dest(task.dest));
}

module.exports = [gulpCopyFavicons];
