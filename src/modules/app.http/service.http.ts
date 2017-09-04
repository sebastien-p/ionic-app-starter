/**
 * @memberOf app.http
 */
namespace app {
  "use strict";

  const module: ng.IModule = angular.module("app.http");

  export interface IHttpService {
    /**
     * Check if the given url is external.
     * @method isExternal
     * @param {string} url
     * @return {boolean}
     */
    isExternal(url: string): boolean;

    /**
     * Make a request to given url.
     * @param {String} method - Request method.
     * @param {String} url - Request url.
     * @param {Object} [params] - Request parameters.
     * @param {Object} [data] - Request data.
     * @param {Object} [config] - Extra request config properties.
     * @param {Boolean} [config.toData=true] - Pass `response.data` if `true`.
     * @returns {Promise} - Passing the response data.
     */
    request<T>(
      method: string,
      url: string,
      query: any,
      body: any,
      config: Partial<ICustomConfig>
    ): T | ng.IHttpPromise<T>;

    /**
     * Make a get request to given url.
     * @param {String} url - Request url.
     * @param {Object} [params] - Request parameters.
     * @param {Boolean} [config] - See the request method.
     * @returns {Promise} - Passing the response data.
     */
    get<T>(
      url: string,
      query: any,
      config: Partial<ICustomConfig>
    ): T | ng.IHttpPromise<T>;

    /**
     * Make a post request to given url.
     * @param {String} url - Request url.
     * @param {Object} [data] - Request data.
     * @param {Boolean} [config] - See the request method.
     * @returns {Promise} - Passing the response data.
     */
    post<T>(
      url: string,
      body: any,
      config: Partial<ICustomConfig>
    ): T | ng.IHttpPromise<T>;

    /**
     * Make a put request to given url.
     * @param {String} url - Request url.
     * @param {Object} [data] - Request parameters.
     * @param {Boolean} [config] - See the request method.
     * @returns {Promise} - Passing the response data.
     */
    put<T>(
      url: string,
      body: any,
      config: Partial<ICustomConfig>
    ): T | ng.IHttpPromise<T>;

    /**
     * Make a delete request to given url.
     * @param {String} url - Request url.
     * @param {Object} [data] - Request parameters.
     * @param {Boolean} [config] - See the request method.
     * @returns {Promise} - Passing the response data.
     */
    delete<T>(
      url: string,
      body: any,
      config: Partial<ICustomConfig>
    ): T | ng.IHttpPromise<T>;

    /**
     * Simulate an HTTP rejection so that it won't break interceptors.
     * @param {Number} status - HTTP status code.
     * @param {*} [data] - Response data.
     * @param {Object} [config={}] - Request config.
     * @return {Promise}
     */
    reject<T>(
      status: number,
      body: T,
      config: Partial<ICustomConfig>
    ): T | ng.IHttpPromise<T>;
  }

  interface ICustomConfig extends ng.IRequestShortcutConfig {
    toData: boolean;
  }

  class HttpService implements IHttpService {
    constructor(
      private $q: ng.IQService,
      private $http: ng.IHttpService,
      private $timeout: ng.ITimeoutService,
      private API_SERVER_URL: string
    ) {}

    isExternal(url: string): boolean {
      return (
        /^(:?http(:?s)?:)?\/\//.test(url) &&
        !_.startsWith(url, this.API_SERVER_URL)
      );
    }

    request<T>(
      method: string,
      url: string,
      query: any,
      body: any,
      config: Partial<ICustomConfig>
    ): T | ng.IHttpPromise<T> {
      if (!_.isPlainObject(config)) {
        config = {};
      }
      if (!this.isExternal(url)) {
        url = this.API_SERVER_URL + url;
      }
      var options = { url, method, params: query, data: body };
      var promise = this.$http<T>(_.extend(options, config));
      if (config.toData === false) {
        return promise;
      }
      return promise.then(response => response.data);
    }

    get<T>(
      url: string,
      query: any,
      config: Partial<ICustomConfig>
    ): T | ng.IHttpPromise<T> {
      return this.request("GET", url, query, null, config);
    }

    post<T>(
      url: string,
      body: any,
      config: Partial<ICustomConfig>
    ): T | ng.IHttpPromise<T> {
      return this.request("POST", url, null, body, config);
    }

    put<T>(
      url: string,
      body: any,
      config: Partial<ICustomConfig>
    ): T | ng.IHttpPromise<T> {
      return this.request("PUT", url, null, body, config);
    }

    delete<T>(
      url: string,
      body: any,
      config: Partial<ICustomConfig>
    ): T | ng.IHttpPromise<T> {
      return this.request("DELETE", url, null, body, config);
    }

    reject<T>(status: any, data: T, config: any): ng.IHttpPromise<T> {
      return this.$q.reject({ status, data, config });
    }
  }

  module.service("httpService", [
    "$q",
    "$http",
    "$timeout",
    "API_SERVER_URL",
    HttpService
  ]);
}
