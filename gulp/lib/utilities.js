'use strict';

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
 * Get the object value for a given key or for a fallback one if not found.
 * @param {Object} object - Should have the needed properties.
 * @param {String} key - The object property we want to query for value.
 * @param {[type]} fallback - The fallback property that should be present.
 * @return {*}
 */
function getValueOrDefault(object, key, fallback) {
  return _.has(object, key) && object[key] || object[fallback];
}

/**
 * Find the key for the given value, comparing by reference.
 * @param {Object} object - Should have a property with the given value.
 * @param {*} value - Value to find the associated key.
 * @return {String}
 */
function findKeyForExactValue(object, value) {
  function forExactValue(current) { return current === value; }
  return _.findKey(object, forExactValue);
}

module.exports = {
  DataCache: DataCache,
  getValueOrDefault: getValueOrDefault,
  findKeyForExactValue: findKeyForExactValue
};
