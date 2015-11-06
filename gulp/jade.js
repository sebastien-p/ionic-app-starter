'use strict';

function gulpJade(gulp, plugins, config) {
  var task = config.TASKS['jade'];
  return gulp.src(task.src)
    .pipe(plugins.jade({ doctype: 'html' }))
    .pipe(plugins.angularTemplatecache({
      moduleSystem: 'IIFE',
      filename: task.file,
      module: task.module,
      root: task.root
    }))
    .pipe(gulp.dest(task.dest));
}

module.exports = [gulpJade];
