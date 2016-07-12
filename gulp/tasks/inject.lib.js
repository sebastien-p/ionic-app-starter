'use strict';

var mainBowerFiles = require('main-bower-files');
var mergeStream = require('merge-stream');
var reduce = require('lodash').reduce;

/**
 * Use Bower overrides feature to exclude a given lib.
 * @param {Object} overrides
 * @param {String} lib - Dependency name.
 * @return {Object} Overrides.
 */
function excludeLib(overrides, lib) {
  overrides[lib] = { ignore: true };
  return overrides;
}

/**
 * Inject styles and scripts dependencies into the project targets html files.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Stream}
 */
function gulpInjectLib(gulp, plugins, config) {
  var task = config.TASKS['inject.lib'];
  var env = config.IS_PROD ? 'prod' : 'dev';
  var targets = config.APP.targets || {};

  return reduce(task.src, function handleTargets(merged, src, target) {
    var excluded = (targets[target] || {}).excludeLibs;
    return merged.add(
      gulp.src(src, { cwd: task.cwd })
        .pipe(plugins.inject(
          gulp.src(mainBowerFiles({
            // Maybe exclude given dependencies for the given target.
            overrides: reduce(excluded, excludeLib, {}),
            // Get regular or minified files depending on the build type.
            env: env
          }), { read: false }),
          { name: 'lib', relative: true }
        ))
        .pipe(gulp.dest(config.FOLDERS.same))
    );
  }, mergeStream());
}

module.exports = [['copy'], gulpInjectLib];
