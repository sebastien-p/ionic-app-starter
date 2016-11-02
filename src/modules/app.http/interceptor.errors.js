/**
 * @memberOf app.http
 */
(function (module) {
  'use strict';

  function ErrorsInterceptor($rootScope, $q, HTTP_EVENTS) {
    var service = this;

    /**
     * Check if the interceptor should be skipped.
     * @private
     * @param {Object} response - Angular $http response object.
     * @param {Boolean|Number[]} response.config.skipErrorsInterceptor
     * @returns {Boolean}
     */
    function shouldSkipInterceptor(response) {
      var status = response.status;
      var skip = response.config.skipErrorsInterceptor;
      return skip === true
        || !_.isNumber(status)
        || _.isArray(skip) && _.contains(skip, status)
        || status > 100 && status < 400;
    }

    /**
     * To be called when a response is an error.
     * @param {Object} response - Angular $http response object.
     * @return {Promise} Rejected promise.
     */
    service.responseError = function (response) {
      var ok = !shouldSkipInterceptor(response);
      if (ok) { $rootScope.$broadcast(HTTP_EVENTS.ERROR, response); }
      return $q.reject(response);
    };
  }

  module.service('errorsInterceptor', [
    '$rootScope',
    '$q',
    'HTTP_EVENTS',
    ErrorsInterceptor
  ]);

}(angular.module('app.http')));
