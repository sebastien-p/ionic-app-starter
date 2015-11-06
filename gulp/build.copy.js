'use strict';

function gulpBuildCopy(gulp, plugins, config) {
  var task = config.TASKS['build.copy'];
  return gulp.src(task.src).pipe(gulp.dest(task.dest));
}

module.exports = [['default', 'build.clean'], gulpBuildCopy];
