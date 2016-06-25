'use strict';

var extend = require('lodash').extend;
var parseUrl = require('url').parse;

/**
 * Run end-to-end tests.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @param {Function} done - Function to call when asynchrounous stuff is done.
 */
function gulpTestEndToEnd(gulp, plugins, config, done) {
  var task = config.TASKS['test.e2e'];
  var url = parseUrl(task.baseUrl || 'http://localhost:9876');

  // Make sure to download the Selenuim Web driver.
  plugins.protractor.webdriver_update(function onUpdate() {
    function stop(potentialError) {
      // Don't forget to stop the connect server.
      plugins.connect.serverClose();
      done(potentialError);
    }

    // Start a connect server to serve the application.
    plugins.connect.server(extend({
      root: config.FOLDERS.www,
      host: url.hostname,
      port: url.port
    // Get around a gulp-connect bug: passing `false` doesn't work...
    }, url.protocol === 'https:' ? { https: true } : null));

    gulp.src(task.src, { cwd: task.cwd })
      .pipe(plugins.protractor.protractor({
        configFile: task.cwd + (task.conf || 'protractor.conf.js'),
        args: ['--baseUrl', url.href]
      }))
      .on('error', stop)
      .on('end', stop);
  });
}

module.exports = [gulpTestEndToEnd];
