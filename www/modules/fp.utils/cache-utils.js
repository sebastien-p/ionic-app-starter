/**
 * @memberOf fp.utils
 */
(function (module) {
  'use strict';

  /**
   * Some caching utilities.
   * @constructor CacheUtils
   * @param {Object} $q - The Angular $q service.
   * @param {Object} cacheFactory - The Angular Cache CacheFactory service.
   */
  function CacheUtils($q, cacheFactory) {
    var service = this;

    /**
     * Get or create a cache.
     * @method getCache
     * @param {String} name - The cache name.
     * @param {Object|Number} [options] - A CacheFactory options object or
     * the cache validity duration in minutes.
     * @param {String} [options.storageMode='localStorage']
     * @param {String} [options.deleteOnExpire='passive']
     * @return {Object}
     */
    service.getCache = function (name, options) {
      var cache = cacheFactory.get(name);
      if (cache) { return cache; }
      if (_.isNumber(options)) { options = { maxAge: options * 60 * 1000 }; }
      else if (!_.isObject(options)) { options = null; }
      return cacheFactory.createCache(name, _.extend({ // TODO: max size ?
          storageMode: 'localStorage',
          deleteOnExpire: 'passive'
      }, options));
    };

    /**
     * Get or create a cache associated to a given module.
     * @method getModuleCache
     * @param {Object} module - An angular module object.
     * @param {Object|Number} [options] - A CacheFactory options object or
     * the cache validity duration in minutes.
     * @param {String} [options.storageMode='localStorage']
     * @param {String} [options.deleteOnExpire='passive']
     * @return {Object}
     */
    service.getModuleCache = function (module, options) {
      return service.getCache(module.name, options);
    };

    /**
     * Resolve a cached value if any.
     * @private
     * @function resolveCachedValue
     * @param {Object} cache - The cache object potentially storing the value.
     * @param {String} key - The key associated to the cached value.
     * @return {Promise|undefined} - Undefined if not cached.
     */
    service.resolveCachedValue = function (cache, key) {
      var value = cache && cache.get(key);
      if (value) { return $q.when(value); }
    };
  }

  module.service('cacheUtils', ['$q', 'CacheFactory', CacheUtils]);

}(angular.module('fp.utils')));
