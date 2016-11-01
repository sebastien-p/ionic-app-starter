'use strict';

var mergeStream = require('merge-stream');
var reduce = require('lodash').reduce;

/**
 * Watch files for changes and run tasks accordingly.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 */
function gulpWatch(gulp, plugins, config) { // TODO: handle errors + added/removed files
  reduce(config.tasks.watch, function reducer(merged, task) {
    var opt = { cwd: task.cwd, read: false }; // FIXME: https://github.com/paulmillr/chokidar/issues/548
    function run(events, done) { gulp.start(task.run, done); }
    return merged.add(plugins.watch(task.src, opt, plugins.batch(run/*, onError*/))); // TODO
  }, mergeStream());
}

module.exports = [['default'], gulpWatch];
