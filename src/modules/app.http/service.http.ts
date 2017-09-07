/**
 * @memberOf app.http
 */
namespace app.http {
  'use strict';

  const module: ng.IModule = angular.module('app.http');

  export interface ICustomRequestConfig extends ng.IRequestConfig {
    toData?: boolean;
    skipErrorsInterceptor?: boolean | number[];
  }

  export interface ICustomHttpPromiseCallbackArg<T> extends ng.IHttpPromiseCallbackArg<T> {
    config?: ICustomRequestConfig;
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
     * @param {IMap<string>} [query] - Request parameters.
     * @param {any} [body] - Request body.
     * @param {Partial<ICustomRequestConfig>} [config] - Extra request config properties.
     * @param {boolean} [config.toData=true] - Pass `response.data` if `true`.
     * @returns {ng.IPromise<T | ICustomHttpPromiseCallbackArg<T>>} - Passing the response data.
     */
    request<T>(
      method: string,
      url: string,
      query?: IMap<string>,
      body?: any,
      config?: Partial<ICustomRequestConfig>
    ): ng.IPromise<T | ICustomHttpPromiseCallbackArg<T>>;
    /**
     * Make a get request to given url.
     * @param {string} url - Request url.
     * @param {IMap<string>} [query] - Request parameters.
     * @param {Partial<ICustomRequestConfig>} [config] - See the request method.
     * @returns {ng.IPromise<T | ICustomHttpPromiseCallbackArg<T>>} - Passing the response data.
     */
    get<T>(
      url: string,
      query?: IMap<string>,
      config?: Partial<ICustomRequestConfig>
    ): ng.IPromise<T | ICustomHttpPromiseCallbackArg<T>>;
    /**
     * Make a post request to given url.
     * @param {string} url - Request url.
     * @param {any} [body] - Request body.
     * @param {Partial<ICustomRequestConfig>} [config] - See the request method.
     * @returns {ng.IPromise<T | ICustomHttpPromiseCallbackArg<T>>} - Passing the response data.
     */
    post<T>(
      url: string,
      body?: any,
      config?: Partial<ICustomRequestConfig>
    ): ng.IPromise<T | ICustomHttpPromiseCallbackArg<T>>;
    /**
     * Make a put request to given url.
     * @param {string} url - Request url.
     * @param {any} [body] - Request body.
     * @param {Partial<ICustomRequestConfig>} [config] - See the request method.
     * @returns {ng.IPromise<T | ICustomHttpPromiseCallbackArg<T>>} - Passing the response data.
     */
    put<T>(
      url: string,
      body?: any,
      config?: Partial<ICustomRequestConfig>
    ): ng.IPromise<T | ICustomHttpPromiseCallbackArg<T>>;
    /**
     * Make a delete request to given url.
     * @param {string} url - Request url.
     * @param {any} [body] - Request parameters.
     * @param {Partial<ICustomRequestConfig>} [config] - See the request method.
     * @returns {ng.IPromise<T | ICustomHttpPromiseCallbackArg<T>>} - Passing the response data.
     */
    delete<T>(
      url: string,
      body?: any,
      config?: Partial<ICustomRequestConfig>
    ): ng.IPromise<T | ICustomHttpPromiseCallbackArg<T>>;
    /**
     * Simulate an HTTP rejection so that it won't break interceptors.
     * @param {number} status - HTTP status code.
     * @param {T} [body] - Response data.
     * @param {Partial<ICustomRequestConfig>} [config={}] - Request config.
     * @return {ng.IPromise<ICustomHttpPromiseCallbackArg<T>>}
     */
    reject<T>(
      status: number,
      body?: T,
      config?: Partial<ICustomRequestConfig>
    ): ng.IPromise<ICustomHttpPromiseCallbackArg<T>>;
  }

  class HttpService implements IHttpService {
    constructor(
      private $q: ng.IQService,
      private $http: ng.IHttpService,
      private API_SERVER_URL: string
    ) {}

    isExternal(url: string): boolean {
      return /^(:?http(:?s)?:)?\/\//.test(url)
        && !_.startsWith(url, this.API_SERVER_URL);
    }

    request<T>(
      method: string,
      url: string,
      query?: IMap<string>,
      body?: any,
      config: Partial<ICustomRequestConfig> = {}
    ): ng.IPromise<T | ICustomHttpPromiseCallbackArg<T>> {
      if (!this.isExternal(url)) {
        url = this.API_SERVER_URL + url;
      }
      const options: ICustomRequestConfig = { url, method, params: query, data: body };
      const promise: ng.IPromise<ICustomHttpPromiseCallbackArg<T>> =
        this.$http<T>(_.extend(options, config));
      if (config.toData === false) {
        return promise;
      }
      return promise.then((response) => response.data);
    }

    get<T>(
      url: string,
      query?: IMap<string>,
      config?: Partial<ICustomRequestConfig>
    ): ng.IPromise<T | ICustomHttpPromiseCallbackArg<T>> {
      return this.request<T>('GET', url, query, null, config);
    }

    post<T>(
      url: string,
      body?: any,
      config?: Partial<ICustomRequestConfig>
    ): ng.IPromise<T | ICustomHttpPromiseCallbackArg<T>> {
      return this.request<T>('POST', url, null, body, config);
    }

    put<T>(
      url: string,
      body?: any,
      config?: Partial<ICustomRequestConfig>
    ): ng.IPromise<T | ICustomHttpPromiseCallbackArg<T>> {
      return this.request<T>('PUT', url, null, body, config);
    }

    delete<T>(
      url: string,
      body?: any,
      config?: Partial<ICustomRequestConfig>
    ): ng.IPromise<T | ICustomHttpPromiseCallbackArg<T>> {
      return this.request<T>('DELETE', url, null, body, config);
    }

    reject<T>(
      status: number,
      data?: T,
      config: Partial<ICustomRequestConfig> = {}
    ): ng.IPromise<ICustomHttpPromiseCallbackArg<T>> {
      return this.$q.reject({ status, data, config });
    }
  }

  module.service('httpService', [
    '$q',
    '$http',
    'API_SERVER_URL',
    HttpService
  ]);
}
