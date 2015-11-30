'use strict';

function gulpBuildCopyResources(gulp, plugins, config) {
  var task = config.TASKS['build.copy.resources'];
  return gulp.src(task.src).pipe(gulp.dest(task.dest));
}

module.exports = [['build.copy'], gulpBuildCopyResources];
