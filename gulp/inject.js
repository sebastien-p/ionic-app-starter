'use strict';

var mainBowerFiles = require('main-bower-files');

function gulpInject(gulp, plugins, config) {
  var task = config.TASKS['inject'];
  return gulp.src(task.src)
    .pipe(plugins.inject(
      gulp.src(mainBowerFiles({ env: 'development' }), { read: false }),
      { name: 'bower', relative: true }
    ))
    .pipe(plugins.inject(
      gulp.src(task.js).pipe(plugins.angularFilesort()),
      { relative: true }
    ))
    .pipe(gulp.dest(task.dest));
}

module.exports = [['install', 'jade'], gulpInject];
