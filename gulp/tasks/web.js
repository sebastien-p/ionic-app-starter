'use strict';

var join = require('path').join;
var map = require('lodash').map;
var sh = require('shelljs');

/**
 * Build the app for the Web.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @param {Function} done - Function to call when asynchrounous stuff is done.
 */
function gulpWeb(gulp, plugins, config, done) {
  var task = config.TASKS.web;
  function addCwd(path) { return join(task.cwd, path); }
  try {
    sh.mv(addCwd(task.index), addCwd('index.html'));
    sh.rm(map(task.remove, addCwd));
    done();
  }
  catch (error) { done(error); }
}

module.exports = [['build'], gulpWeb];
