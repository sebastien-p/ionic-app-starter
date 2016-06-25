'use strict';

var plugins = require('gulp-load-plugins')();
var extend = require('lodash').extend;
var gulp = require('gulp');
var environment = require('./environment')(plugins.util.env);
var patterns = require('./patterns')(environment.APP.constants.I18N.locales);
var folders = require('./folders');

function parameters(tasksSettings) {
  var config = extend({ PATTERNS: patterns, FOLDERS: folders }, environment);
  config.TASKS = tasksSettings(folders, patterns, patterns.i18n, config);
  return [gulp, plugins, config];
}

module.exports = parameters;
