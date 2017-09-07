/**
 * @memberOf app.http
 */
namespace app.http {
  'use strict';

  const module: ng.IModule = angular.module('app.http');

  export interface IStore {
    /**
     * Associated Angular cache instance.
     * @type {Object}
     */
    cache: ng.ICacheObject;
    /**
     * Get cached or fetch data.
     * @param {string} key - Cache data key.
     * @param {IFunction<ng.IPromise<T>>} fetch - How to fetch data, must return a promise.
     * @param {boolean} [sync=false] - Force server sync if `true`.
     * @return {ng.IPromise<T>}
     */
    getCachedOrFetch<T>(
      key: string,
      fetch: IFunction<ng.IPromise<T>>,
      sync?: boolean
    ): ng.IPromise<T>;
  }

  class Store implements IStore {
    constructor(
      name: string,
      options: IMap<any> | number, // TODO: typedef
      private cacheUtils: any // TODO: typedef
    ) {
      this.cache = this.cacheUtils.getCache(name, options);
    }

    cache: ng.ICacheObject;

    getCachedOrFetch<T>(
      key: string,
      fetch: IFunction<ng.IPromise<T>>,
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
     * @param {IMap<any>|number} [options] - See FP Utils' `cacheUtils` service.
     * @return {IStore}
     */
    createStore(
      name: string,
      options: IMap<any> | number // TODO: typedef
    ): IStore;
  }

  class OfflineService {
    constructor(
      private cacheUtils: any // TODO: typedef
    ) {}

    createStore(
      name: string,
      options: IMap<any> | number // TODO: typedef
    ): IStore {
      return new Store(name, options, this.cacheUtils);
    }
  }

  module.service('offlineService', ['cacheUtils', OfflineService]);
}
