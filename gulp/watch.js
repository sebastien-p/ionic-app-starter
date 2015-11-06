'use strict';

function gulpWatch(gulp, plugins, config) {
  var watches = config.TASKS['watch'];
  watches.forEach(function (watch) { gulp.watch(watch.src, watch.tasks); });
}

module.exports = [['default'], gulpWatch];
