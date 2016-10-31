'use strict';

var path = require('path');
var _ = require('lodash');

var stripPath = _.ary(_.bind(path.basename, path), 1);

/**
 * Replace revisionned files associated paths.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Stream}
 */
function gulpBuildRevReplace(gulp, plugins, config) {
  var task = config.tasks['build.rev.replace'];

  function src(files) { return gulp.src(files, { cwd: task.cwd }); }

  return src(task.src)
    .pipe(plugins.revReplace({
      manifest: src(task.manifest || 'rev-manifest.json'),
      // Strip paths for each manifest entry otherwise replace won't work.
      modifyUnreved: stripPath,
      modifyReved: stripPath
    }))
    .pipe(gulp.dest(config.FOLDERS.SAME));
}

module.exports = [['build.rev'], gulpBuildRevReplace];
