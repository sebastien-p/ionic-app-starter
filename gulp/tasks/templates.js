'use strict';

var format = require('util').format;
var path = require('path');
var merge = require('merge-stream');
var _ = require('lodash');
var DataCache = require('../lib/utilities').DataCache;

var dataCache = new DataCache();
var invalidateCache = _.bind(dataCache.invalidateCache, dataCache);

/**
 * Inline all HTML template files in the Angular template cache.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Stream}
 */
function gulpTemplates(gulp, plugins, config) {
  var task = config.tasks.templates;
  var defaultDest = config.FOLDERS.WWW + 'modules/%s/%s/';
  var conf = path.join(process.cwd(), task.cwd, '%s', 'config', config.APP_ID);

  // Merge as many streams together as we have different targets.
  return _.reduce(task.src, function reducer(merged, src, target) {
    return merged.add(gulp.src(src, { cwd: task.cwd })
      // Search for config/<app>.json files in the same module directory
      // than Pug files. Such files contain data to expose to templates.
      .pipe(plugins.data(function data(file) {
        file = format(conf, file.relative.split(path.sep)[0]);
        return { config: dataCache.maybeLoadJSON(file) };
      }))
      .pipe(plugins.pug({ doctype: 'html', locals: config.CONSTANTS }))
      .pipe(plugins.if(config.IS_PROD, plugins.htmlmin({
        removeStyleLinkTypeAttributes: true,
        removeScriptTypeAttributes: true,
        collapseWhitespace: true,
        removeComments: true
      })))
      .pipe(plugins.angularTemplatecache({
        root: task.root || 'modules/',
        moduleSystem: 'IIFE',
        filename: task.file,
        module: task.module
      }))
      .pipe(plugins.if(config.IS_PROD, plugins.uglify()))
      .pipe(gulp.dest(
        _.has(task.dest, target) && task.dest[target]
        || format(defaultDest, task.module, target)
      ))
    );
  }, merge()).on('end', invalidateCache);
}

module.exports = [gulpTemplates];
