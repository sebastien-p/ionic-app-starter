var plugins = require('gulp-load-plugins')();
var extend = require('lodash').extend;
var environment = require('./environment')(plugins.util.env);
var patterns = require('./patterns');
var folders = require('./folders');

function parameters(tasksSettings) {
  var config = extend({ PATTERNS: patterns, FOLDERS: folders }, environment);
  config.TASKS = tasksSettings(folders, patterns, config.I18N, config);
  return [plugins, config];
}

module.exports = parameters;
