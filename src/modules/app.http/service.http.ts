/**
 * @memberOf app.http
 */
namespace app.http {
  'use strict';

  const module: ng.IModule = angular.module('app.http');

  export interface ICustomRequestConfig extends ng.IRequestShortcutConfig {
    toData?: boolean;
  }

  export interface IHttpService {
    /**
     * Check if the given url is external.
     * @param {string} url
     * @return {boolean}
     */
    isExternal(url: string): boolean;

    /**
     * Make a request to given url.
     * @param {string} method - Request method.
     * @param {string} url - Request url.
     * @param {any} [query] - Request parameters.
     * @param {any} [body] - Request data.
     * @param {ICustomRequestConfig} [config] - Extra request config properties.
     * @param {boolean} [config.toData=true] - Pass `response.data` if `true`.
     * @returns {ng.IPromise<T | ng.IHttpPromiseCallbackArg<T>>} - Passing the response data.
     */
    request<T>(
      method: string,
      url: string,
      query?: any,
      body?: any,
      config?: ICustomRequestConfig
    ): ng.IPromise<T | ng.IHttpPromiseCallbackArg<T>>;

    /**
     * Make a get request to given url.
     * @param {string} url - Request url.
     * @param {any} [query] - Request parameters.
     * @param {ICustomRequestConfig} [config] - See the request method.
     * @returns {ng.IPromise<T | ng.IHttpPromiseCallbackArg<T>>} - Passing the response data.
     */
    get<T>(
      url: string,
      query?: any,
      config?: ICustomRequestConfig
    ): ng.IPromise<T | ng.IHttpPromiseCallbackArg<T>>;

    /**
     * Make a post request to given url.
     * @param {string} url - Request url.
     * @param {any} [body] - Request data.
     * @param {ICustomRequestConfig} [config] - See the request method.
     * @returns {ng.IPromise<T | ng.IHttpPromiseCallbackArg<T>>} - Passing the response data.
     */
    post<T>(
      url: string,
      body?: any,
      config?: ICustomRequestConfig
    ): ng.IPromise<T | ng.IHttpPromiseCallbackArg<T>>;

    /**
     * Make a put request to given url.
     * @param {string} url - Request url.
     * @param {any} [data] - Request parameters.
     * @param {ICustomRequestConfig} [config] - See the request method.
     * @returns {ng.IPromise<T | ng.IHttpPromiseCallbackArg<T>>} - Passing the response data.
     */
    put<T>(
      url: string,
      body?: any,
      config?: ICustomRequestConfig
    ): ng.IPromise<T | ng.IHttpPromiseCallbackArg<T>>;

    /**
     * Make a delete request to given url.
     * @param {string} url - Request url.
     * @param {any} [body] - Request parameters.
     * @param {ICustomRequestConfig} [config] - See the request method.
     * @returns {ng.IPromise<T | ng.IHttpPromiseCallbackArg<T>>} - Passing the response data.
     */
    delete<T>(
      url: string,
      body?: any,
      config?: ICustomRequestConfig
    ): ng.IPromise<T | ng.IHttpPromiseCallbackArg<T>>;

    /**
     * Simulate an HTTP rejection so that it won't break interceptors.
     * @param {number} status - HTTP status code.
     * @param {T} [body] - Response data.
     * @param {ICustomRequestConfig} [config={}] - Request config.
     * @return {ng.IHttpPromise<T>}
     */
    reject<T>(
      status: number,
      body?: T,
      config?: ICustomRequestConfig
    ): ng.IPromise<T | ng.IHttpPromiseCallbackArg<T>>;
  }

  class HttpService implements IHttpService {
    constructor(
      private $q: ng.IQService,
      private $http: ng.IHttpService,
      private $timeout: ng.ITimeoutService,
      private API_SERVER_URL: string
    ) { }

    isExternal(url: string): boolean {
      return (
        /^(:?http(:?s)?:)?\/\//.test(url) &&
        !_.startsWith(url, this.API_SERVER_URL)
      );
    }

    request<T>(
      method: string,
      url: string,
      query?: any,
      body?: any,
      config: ICustomRequestConfig = {}
    ): ng.IPromise<T | ng.IHttpPromiseCallbackArg<T>> {
      if (!this.isExternal(url)) {
        url = this.API_SERVER_URL + url;
      }
      const options = { url, method, params: query, data: body };
      const promise = this.$http<T>(_.extend(options, config));
      if (config.toData === false) {
        return promise;
      }
      return promise.then(response => response.data);
    }

    get<T>(
      url: string,
      query?: any,
      config?: ICustomRequestConfig
    ): ng.IPromise<T | ng.IHttpPromiseCallbackArg<T>> {
      return this.request<T>('GET', url, query, null, config);
    }

    post<T>(
      url: string,
      body?: any,
      config?: ICustomRequestConfig
    ): ng.IPromise<T | ng.IHttpPromiseCallbackArg<T>> {
      return this.request<T>('POST', url, null, body, config);
    }

    put<T>(
      url: string,
      body?: any,
      config?: ICustomRequestConfig
    ): ng.IPromise<T | ng.IHttpPromiseCallbackArg<T>> {
      return this.request<T>('PUT', url, null, body, config);
    }

    delete<T>(
      url: string,
      body?: any,
      config?: ICustomRequestConfig
    ): ng.IPromise<T | ng.IHttpPromiseCallbackArg<T>> {
      return this.request<T>('DELETE', url, null, body, config);
    }

    reject<T>(status: number, data?: T, config: ICustomRequestConfig = {}): ng.IHttpPromise<T> {
      return this.$q.reject({ status, data, config });
    }
  }

  module.service('httpService', [
    '$q',
    '$http',
    '$timeout',
    'API_SERVER_URL',
    HttpService
  ]);
}
