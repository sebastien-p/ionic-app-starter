'use strict';

var loadTasks = require('gulp-load-tasks');
var parameters = require('./lib/parameters');

function load(tasks, directory) {
  loadTasks({ dir: directory || 'gulp/tasks', params: parameters(tasks) });
}

module.exports = load;
