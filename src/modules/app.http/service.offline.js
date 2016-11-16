/**
 * @memberOf app.http
 */
(function (module) {
  'use strict';

  function OfflineService(cacheUtils) {
    var service = this;

    /**
     * Create a Store instance.
     * @param {String} name - Angular cache name.
     * @param {Object|Number} [options] - See FP Utils' `cacheUtils` service.
     * @return {Store}
     */
    service.createStore = _.merge(function Store(name, options) {
      if (!(this instanceof Store)) { return new Store(name, options); }

      /**
       * Associated Angular cache instance.
       * @type {Object}
       */
      this.cache = cacheUtils.getCache(name, options);
    }, {
      prototype: {

        /**
         * Get cached or fetch data.
         * @param {String} key - Cache data key.
         * @param {Function} fetch - How to fetch data, must return a promise.
         * @param {Boolean} sync - Force server sync if `true`.
         * @return {Promise}
         */
        getCachedOrFetch: function (key, fetch, sync) {
          var cache = this.cache;
          return sync !== true && cacheUtils.resolveCachedValue(cache, key)
            || fetch().then(function (data) { return cache.put(key, data); });
        }
      }
    });
  }

  module.service('offlineService', ['cacheUtils', OfflineService]);

}(angular.module('app.http')));
