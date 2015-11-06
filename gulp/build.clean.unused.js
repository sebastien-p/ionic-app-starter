'use strict';

var del = require('del');

function gulpBuildCleanUnused(gulp, plugins, config, done) {
  var task = config.TASKS['build.clean.unused'];
  del(task.src, {
    cwd: task.cwd,
    nomount: true,
    strict: true,
    mark: true
  }, done);
}

module.exports = [['build.useref'], gulpBuildCleanUnused];
