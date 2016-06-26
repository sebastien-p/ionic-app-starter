'use strict';

var format = require('util').format;
var path = require('path');
var merge = require('merge-stream');
var _ = require('lodash');

/**
 * Handle loading and caching data like JSON from files.
 * @constructor
 */
var DataCache = _.merge(function DataCache() {
  /**
   * The cached ids array.
   * @property {Array} cached
   */
  this.cached = [];
}, {
  prototype: {
    /**
     * Get the index of a given data module id in the cached array.
     * @param {String} id - The module id.
     * @return {Number}
     */
    getCachedIndex: function getCachedIndex(id) {
      return this.cached.indexOf(id);
    },

    /**
     * Load some JSON data at a given path.
     * @param {String} path - Path of the JSON file to load, minus extension.
     * @return {Object|Array}
     */
    loadJSON: function loadJSON(path) {
      path += '.json';
      // eslint-disable-next-line global-require
      var value = require(path);
      if (this.getCachedIndex(path) < 0) { this.cached.push(path); }
      return value;
    },

    /**
     * Load some JSON data maybe located at a given path.
     * Don't throw any error if the file is not found.
     * @param {[type]} path - Path of the JSON file to load, minus extension.
     * @return {Object|Array|null} - null if file not found.
     */
    maybeLoadJSON: function maybeLoadJSON(path) {
      try { return this.loadJSON(path); }
      // eslint-disable-next-line max-statements-per-line
      catch (error) { if (error.code !== 'MODULE_NOT_FOUND') { throw error; } }
      return null;
    },

    /**
     * Invalidate the cache for every or one cached module.
     * @param {String} [id] - If not passed, loops through every cached module.
     * @return {Array} - The cached ids array.
     */
    invalidateCache: function invalidateCache(id) {
      if (!id) { return _.each(this.cached, this.invalidateCache, this); }
      delete require.cache[id];
      this.cached.splice(this.getCachedIndex(id), 1);
      return this.cached;
    }
  }
});

/**
 * Inline all HTML template files in the Angular template cache.
 * @param {Object} gulp - Current Gulp instance.
 * @param {Object} plugins - Gulp plugins loaded by *gulp-load-plugins* and
 *   passed to *gulp-load-tasks*.
 * @param {Object} config - Gulp config object passed to *gulp-load-tasks*.
 * @return {Stream}
 */
function gulpTemplates(gulp, plugins, config) {
  var task = config.TASKS.templates;

  var conf = path.join(process.cwd(), task.cwd, '%s', 'config', config.APP_ID);
  var defaultDest = config.FOLDERS.www + 'modules/%s/%s/';
  var dataCache = new DataCache();
  var invalidateCache = _.bind(dataCache.invalidateCache, dataCache);

  // Merge as many streams together as we have different targets.
  return _.reduce(task.src, function reduce(merged, src, target) {
    return merged.add(gulp.src(src, { cwd: task.cwd })
      // Search for config/<app>.json files in the same module directory
      // than Jade files. Such files contain data to expose to templates.
      .pipe(plugins.data(function data(file) {
        file = format(conf, file.relative.split(path.sep)[0]);
        return dataCache.maybeLoadJSON(file);
      }))
      .pipe(plugins.jade({ doctype: 'html' }))
      .pipe(plugins.if(config.IS_PROD, plugins.htmlmin({
        removeStyleLinkTypeAttributes: true,
        removeCDATASectionsFromCDATA: true,
        removeScriptTypeAttributes: true,
        removeCommentsFromCDATA: true,
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
  }, merge()).on('end', invalidateCache); // TODO: check
}

module.exports = [gulpTemplates];
