'use strict';

function gulpBuildCopyConfig(gulp, plugins, config) {
  var task = config.TASKS['build.copy.config'];
  return gulp.src(task.src).pipe(gulp.dest(task.dest));
}

module.exports = [['build.copy'], gulpBuildCopyConfig];
