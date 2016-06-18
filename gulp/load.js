require('gulp');

var loadTasks = require('gulp-load-tasks');
var parameters = require('./lib/parameters');

function load(settings, directory) {
  if (!directory) { directory = 'gulp/tasks'; }
  return loadTasks({ dir: directory, params: parameters(settings) });
}

module.exports = load;
