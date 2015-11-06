'use strict';

function gulpBuildUseref(gulp, plugins, config) {
  var task = config.TASKS['build.useref'];
  var prod = config.ENV === 'production';
  var assets = plugins.useref.assets();
  var css = { keepSpecialComments: 0 };
  return gulp.src(task.src)
    .pipe(assets)
    .pipe(plugins.if(prod && task.css, plugins.minifyCss(css)))
    .pipe(plugins.if(prod && task.js, plugins.uglify()))
    .pipe(assets.restore())
    .pipe(plugins.useref())
    .pipe(gulp.dest(task.dest));
}

module.exports = [['build.config'], gulpBuildUseref];
