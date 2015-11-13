/**
 * @memberOf app
 */
(function (module) {
  'use strict';

  /**
   * The loading interceptor.
   * @constructor LoadingInterceptor
   * @param {Object} $rootScope - The Angular root scope.
   * @param {Object} $q - The Angular $q service.
   */
  function LoadingInterceptor($rootScope, $q) {
    var service = this;

    /**
     * Broadcast a given event only when dealing with API requests.
     * @private
     * @function broadcast
     * @param {String} event
     * @param {Object} config - Angular $http config object.
     */
    function broadcast(event, config) {
      var isExternalRequest = /^http(?:s)?:\/\//.test(config.url);
      if (isExternalRequest) { $rootScope.$broadcast(event); }
    }

    /**
     * To be called when a request is being made.
     * @method request
     * @param {Object} config - Angular $http config object.
     * @return {Object}
     */
    service.request = function (config) {
      broadcast('loading:show', config);
      return config;
    };

    /**
     * To be called when a request got a response.
     * @method request
     * @param {Object} response - Angular $http response object.
     * @return {Object}
     */
    service.response = function (response) {
      broadcast('loading:hide', response.config);
      return response;
    };

    /**
     * To be called when a request encountered an error.
     * @method request
     * @param {Object} config - Angular $http config object.
     * @return {Promise}
     */
    service.requestError = function (config) {
      return $q.reject(service.response(config));
    };

    /**
     * To be called when a response is an error.
     * @method request
     * @param {Object} response - Angular $http response object.
     * @return {Promise}
     */
    service.responseError = function (response) {
      return service.requestError(response);
    };
  }

  module.service('loadingInterceptor', [
    '$rootScope',
    '$q',
    LoadingInterceptor
  ]);

}(angular.module('app')));
