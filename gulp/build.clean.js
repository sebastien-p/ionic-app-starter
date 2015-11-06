'use strict';

var del = require('del');

function gulpBuildClean(gulp, plugins, config, done) {
  var task = config.TASKS['build.clean'];
  del(task.src, { nomount: true, strict: true, mark: true }, done);
}

module.exports = [gulpBuildClean];
