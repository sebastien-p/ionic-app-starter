'use strict';

function gulpSass(gulp, plugins, config) {
  var task = config.TASKS['sass'];
  var prod = config.ENV === 'production';
  return gulp.src(task.src)
    .pipe(plugins.sass({ errLogToConsole: true, indentedSyntax: true }))
    .pipe(plugins.if(prod, plugins.minifyCss({ keepSpecialComments: 0 })))
    .pipe(plugins.rename({ extname: '.min.css' }))
    .pipe(gulp.dest(task.dest));
}

module.exports = [gulpSass];
