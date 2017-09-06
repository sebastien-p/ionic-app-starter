/**
 * @memberOf app.http
 */
namespace app.http {
  'use strict';

  const module: ng.IModule = angular.module('app.http');

  export interface IStore {
    /**
     * Get cached or fetch data.
     * @param {string} key - Cache data key.
     * @param {() => ng.IPromise<T>} fetch - How to fetch data, must return a promise.
     * @param {boolean} [sync] - Force server sync if `true`.
     * @return {ng.IPromise<T>}
     */
    getCachedOrFetch<T>(
      key: string,
      fetch: () => ng.IPromise<T>,
      sync?: boolean
    ): ng.IPromise<T>;
  }

  class Store implements IStore {
    constructor(
      name: string,
      options: any, // TODO: typedef
      private cacheUtils: any // TODO: typedef
    ) {
      this.cache = this.cacheUtils.getCache(name, options);
    }

    /**
     * Associated Angular cache instance.
     * @type {Object}
     */
    private cache: ng.ICacheObject;

    getCachedOrFetch<T>(
      key: string,
      fetch: () => ng.IPromise<T>,
      sync: boolean = false
    ): ng.IPromise<T> {
      return sync && this.cacheUtils.resolveCachedValue(this.cache, key)
        || fetch().then((data) => this.cache.put(key, data));
    }
  }

  export interface IOfflineService {
    /**
     * Create a Store instance.
     * @param {string} name - Angular cache name.
     * @param {Object|Number} [options] - See FP Utils' `cacheUtils` service.
     * @return {IStore}
     */
    createStore(
      name: string,
      options: any
    ): IStore;
  }

  class OfflineService {
    constructor(
      private cacheUtils: any // TODO: typedef
    ) { }

    createStore(
      name: string,
      options: any
    ): IStore {
      return new Store(name, options, this.cacheUtils);
    }
  }

  module.service('offlineService', ['cacheUtils', OfflineService]);
}
