'use strict';

var gulp = require('gulp');
var extend = require('lodash').extend;
var plugins = require('gulp-load-plugins')();
var folders = require('./folders');
var environment = require('./environment')(plugins.util.env);
var patterns = require('./patterns')(environment.APP.constants.I18N.LOCALES);

/**
 * Build tasks parameters.
 * @param {Function} tasksSettings - A function that must return an object.
 * @return {Array}
 */
function parameters(tasksSettings) {
  var config = extend({ PATTERNS: patterns, FOLDERS: folders }, environment);
  config.tasks = tasksSettings(folders, patterns, config);
  return [gulp, plugins, config];
}

module.exports = parameters;
