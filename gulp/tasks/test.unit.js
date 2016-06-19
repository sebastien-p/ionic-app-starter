'use strict';

var es = require('event-stream');
var mainBowerFiles = require('main-bower-files');

/**
 * Merge JS files from bower dependencies, project sources and test files.
 * Then run karma.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Stream}
 */
function gulpTestUnit(gulp, plugins, config) {
  var task = config.TASKS['test.unit'];

  var conf = task.cwd + (task.conf || 'karma.conf.js');
  var opt = { filter: config.PATTERNS.js, includeDev: true, env: 'dev' };

  return es.merge(
    gulp.src(mainBowerFiles(opt), { read: false }),
    gulp.src(task.app).pipe(plugins.angularFilesort()),
    gulp.src(task.src, { cwd: task.cwd }).pipe(plugins.angularFilesort())
  )
    // .pipe(plugins.debug({ title: 'gulp-debug:' }))
    .pipe(plugins.karma({ configFile: conf, action: 'run' }));
}

module.exports = [gulpTestUnit];
