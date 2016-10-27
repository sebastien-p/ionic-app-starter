'use strict';

var mainBowerFiles = require('main-bower-files');
var isArray = require('lodash').isArray;
var Server = require('karma').Server;

/**
 * Merge JS files from bower dependencies, project sources and test files.
 * Then run karma.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @param {Function} done - Function to call when asynchrounous stuff is done.
 */
function gulpTestUnit(gulp, plugins, config, done) { // TODO: check paths on windows
  var task = config.TASKS['test.unit'];
  var cwd = process.cwd() + '/' + (task.cwd || '');
  var extraLibs = isArray(task.extraLibs) ? task.extraLibs : [];
  var sortedAppFiles = [];

  gulp.src(task.app, { read: true })
    .pipe(plugins.angularFilesort())
    .on('data', function onData(file) { sortedAppFiles.push(file.path); })
    .on('end', function onEnd() {
      new Server({
        configFile: cwd + (task.conf || 'karma.conf.js'),
        singleRun: config.IS_PROD,
        port: task.port || 9875,
        basePath: cwd,
        files: extraLibs.concat(mainBowerFiles({
          filter: config.PATTERNS.js,
          includeDev: true,
          env: 'dev'
        }), sortedAppFiles, task.src)
      }, done).start();
    })
    .on('error', done);
}

module.exports = [gulpTestUnit]; // TODO: copy
