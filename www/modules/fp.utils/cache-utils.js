/**
 * @memberOf fp.utils
 */
(function (module) {
  'use strict';

  /**
   * Some caching utilities.
   * @constructor CacheUtils
   * @param {Object} cacheFactory - The Angular Cache CacheFactory service.
   */
  function CacheUtils(cacheFactory) {
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
  }

  module.service('cacheUtils', ['CacheFactory', CacheUtils]);

}(angular.module('fp.utils')));
