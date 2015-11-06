/**
 * @memberOf fp.utils
 */
(function (module) {
  'use strict';

  /**
   * Some interceptor utilities.
   * @constructor InterceptorUtils
   * @param {Object} $injector - The Angular $injector service.
   */
  function InterceptorUtils($injector) {
    var service = this;

    /**
     * Convert a given value to an array if not already one.
     * @method toArray
     * @param {*} value
     * @return {Array}
     */
    service.toArray = function (value) {
      if (_.isArray(value)) { return value; }
      return _.isArguments(value) ? _.toArray(value) : [value];
    };

    /**
     * Get an array given two values that can be arrays.
     * @method concat
     * @param {*} valueA
     * @param {*} valueB
     * @param {Number} [skip=0] - Items to drop from valueB
     * @return {Array} [description]
     */
    service.concat = function (valueA, valueB, skip) {
      valueB = service.toArray(valueB);
      if (skip) { valueB = _.slice(valueB, skip); }
      return service.toArray(valueA).concat(valueB);
    };

    /**
     * Apply a given method on a given object passing optional arguments.
     * @method applyMethod
     * @param {Object} host
     * @param {String} method
     * @param {Object} [opt]
     * @param {*} [opt.a=[]]
     * @param {*} [opt.b=[]]
     * @param {*} [opt.skip=0]
     * @return {[type]} [description]
     */
    service.applyMethod = function (host, method, opt) {
      opt = _.defaults({}, opt, { a: [], b: [] });
      return host[method].apply(host, service.concat(opt.a, opt.b, opt.skip));
    };

    /**
     * Limit a given function parameters to a given number.
     * @method limitParams
     * @param {Function} callee
     * @param {Number} [limit=1]
     * @param {*} [context]
     * @return {Function}
     */
    service.limitParams = function (callee, limit, context) {
      callee = _.ary(callee, _.isNumber(limit) ? limit : 1);
      return arguments.length < 3 ? callee : _.bind(callee, context);
    };

    /**
     * Make sure to lock a given function with only the given parameters.
     * @method lockParams
     * @param {Function} callee
     * @param {*} params
     * @param {*} [context]
     * @return {Function}
     */
    service.lockParams = function (callee, params/*, context*/) {
      params = service.toArray(params);
      var options = { a: [callee, params.length], b: arguments, skip: 2 };
      var limited = service.applyMethod(service, 'limitParams', options);
      return service.applyMethod(_, 'partial', { a: limited, b: params });
    };

    /**
     * Get around circular dependencies error.
     * @method getCircularDeps
     * @param {Array|String} names - The dependencies names.
     * @return {Object|Function}
     */
    service.getCircularDeps = _.memoize(function (names) {
      names = service.toArray(names);
      var getDependency = service.limitParams($injector.get, 1, $injector);
      if (names.length === 1) { return getDependency(names[0]); }
      return _.zipObject(names, _.map(names, getDependency));
    });

    /**
     * Test if a requested resource requires authentication.
     * @method isUnauthorized
     * @param {Object} response - Angular $http response object.
     * @return {Boolean}
     */
    service.isUnauthorized = function (response) {
      return !response.config.skipAuthorization && response.status === 401;
    };

    /**
     * Retry a failed request given its response, maximum 10 times.
     * @method retryFailed
     * @param {Object} response - Angular $http response object.
     * @return {Promise}
     */
    service.retryFailed = function (response) {
      var config = response.config;
      var services = service.getCircularDeps(['$http', '$q']);
      if (config.retry === 0) { return services.$q.reject(response); }
      config.retry = _.isNumber(config.retry) ? config.retry - 1 : 9;
      return services.$http(config);
    };

    /**
     * Get a function which will retry a failed request when called.
     * @method getFailedRetryer
     * @param {Object} [response] - Angular $http response object.
     * @return {Function}
     */
    service.getFailedRetryer = function (response) {
      if (!response) { return service.limitParams(service.retryFailed); }
      return service.lockParams(service.retryFailed, response);
    };
  }

  module.service('interceptorUtils', ['$injector', InterceptorUtils]);

}(angular.module('fp.utils')));
