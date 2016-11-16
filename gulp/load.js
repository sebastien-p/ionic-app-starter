'use strict';

var loadTasks = require('gulp-load-tasks');
var parameters = require('./lib/parameters');

/**
 * Load Gulp tasks inside a given directory;
 * @param {Function} tasks - Must return a tasks settings object.
 * @param {String} [directory='gulp/tasks'] - Relative to the gulpfile.
 */
function load(tasks, directory) {
  loadTasks({ dir: directory || 'gulp/tasks', params: parameters(tasks) });
}

module.exports = load;
