/**
 * @memberOf app.http
 */
namespace app.http {
  'use strict';

  const module: ng.IModule = angular.module('app.http');

  class ErrorsInterceptor implements ng.IHttpInterceptor {
    constructor(
      private $rootScope: ng.IRootScopeService,
      private $q: ng.IQService,
      private HTTP_EVENTS: HttpEvents
    ) {}

    /**
     * Check if the interceptor should be skipped.
     * @private
     * @param {ICustomHttpPromiseCallbackArg} response - Angular $http response object.
     * @param {boolean|number[]} response.config.skipErrorsInterceptor
     * @return {boolean}
     */
    private shouldSkipInterceptor(response: ICustomHttpPromiseCallbackArg<any>): boolean {
      const status: number = response.status;
      const skip: boolean | number[] = response.config.skipErrorsInterceptor;
      return skip === true
        || !_.isNumber(status)
        || _.isArray(skip) && _.contains(skip, status)
        || status > 100 && status < 400;
    }

    /**
     * To be called when a response is an error.
     * @param {ICustomHttpPromiseCallbackArg} response - Angular $http response object.
     * @return {ng.IPromise<ICustomHttpPromiseCallbackArg<any>>} Rejected promise.
     */
    responseError(
      response: ICustomHttpPromiseCallbackArg<any>
    ): ng.IPromise<ICustomHttpPromiseCallbackArg<any>> {
      const ok: boolean = !this.shouldSkipInterceptor(response);
      if (ok) { this.$rootScope.$broadcast(this.HTTP_EVENTS.ERROR, response); }
      return this.$q.reject(response);
    }
  }

  module.service('errorsInterceptor', [
    '$rootScope',
    '$q',
    'HTTP_EVENTS',
    ErrorsInterceptor
  ]);
}
