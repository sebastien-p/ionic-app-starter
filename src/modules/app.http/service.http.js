/**
 * @memberOf app.http
 */
(function (module) {
  'use strict';

  function HttpService($q, $http, $timeout, API_SERVER_URL) {
    var service = this;

    var pollingPool = {};

    function Poller(options) {
      if (!(this instanceof Poller)) { return new Poller(options); }
      _.bindAll(this, '_request', '_poll');
      this.delay = options.delay || service.POLLING_INTERVAL.MEDIUM;
      this.callback = options.callback;
      this.polled = options.polled;
      this.start();
    }

    _.extend(Poller.prototype, {
      _request: function () {
        // Recover from network errors like nothing wrong happened...
        return this.polled().then(this._deferred.notify, $q.resolve);
      },
      _poll: function () {
        this._timeout = $timeout(this._request, this.delay);
        // Do it this way because chaining breaks `$timeout.cancel`...
        this._timeout.then(this._poll);
      },
      stop: function () {
        if (!this._timeout) { return; }
        $timeout.cancel(this._timeout);
        this._deferred.reject();
        this._deferred = null;
        this._timeout = null;
      },
      start: function () {
        this.stop();
        this._deferred = $q.defer();
        this._deferred.promise.finally(null, this.callback);
        this._poll();
      }
    });

    /**
     * Stores common polling interval durations constants.
     * @type {Object}
     */
    service.POLLING_INTERVAL = { SHORT: 5000, MEDIUM: 30000, LONG: 120000 };

    /**
     * Start or restart a given named polling task.
     * @param {String} name
     * @param {Object} options
     * @param {Number} [options.delay=MEDIUM] - Interval duration in ms.
     * @param {Function} options.callback - Passing the polled value.
     * @param {Function} options.polled - Must return a promise.
     */
    service.startPolling = function (name, options) {
      if (_.has(pollingPool, name)) { pollingPool[name].start(); }
      else { pollingPool[name] = new Poller(options); }
    };

    /**
     * Stop a given named polling task without removing it from the pool.
     * @param {String} name
     */
    service.pausePolling = function (name) {
      if (_.has(pollingPool, name)) { pollingPool[name].stop(); }
    };

    /**
     * Stop a given named polling task and remove it from the pool.
     * @param {String} name
     */
    service.stopPolling = function (name) {
      service.pausePolling(name);
      pollingPool[name] = null;
      delete pollingPool[name];
    };

    /**
     * Pause all current polling tasks.
     */
    service.pausePollings = function () {
      _.each(pollingPool, service.pausePolling, service);
    };

    /**
     * Resume all current polling tasks.
     */
    service.resumePollings = function () {
      _.each(pollingPool, service.startPolling, service);
    };

    /**
     * Check if the given url is external.
     * @method isExternal
     * @param {String} url
     * @return {Boolean}
     */
    service.isExternal = function (url) {
      return /^(:?http(:?s)?:)?\/\//.test(url)
        && !_.startsWith(url, API_SERVER_URL);
    };

    /**
     * Make a request to given url.
     * @param {String} method - Request method.
     * @param {String} url - Request url.
     * @param {Object} [params] - Request parameters.
     * @param {Object} [data] - Request data.
     * @param {Object} [config] - Extra request config properties or by default
     *                          `{ skipFPLoadingInterceptor: !!config }`.
     * @param {Boolean} [config.toData=true] - Pass `response.data` if `true`.
     * @returns {Promise} - Passing the response data.
     */
    service.request = function (method, url, params, data, config) {
      if (!_.isPlainObject(config)) {
        config = { skipFPLoadingInterceptor: !!config };
      }
      if (!service.isExternal(url)) { url = API_SERVER_URL + url; }
      var options = { url: url, method: method, params: params, data: data };
      var promise = $http(_.extend(options, config));
      if (config.toData === false) { return promise; }
      return promise.then(function (response) { return response.data; });
    };

    /**
     * Make a get request to given url.
     * @param {String} url - Request url.
     * @param {Object} [params] - Request parameters.
     * @param {Boolean} [config] - See the request method.
     * @returns {Promise} - Passing the response data.
     */
    service.get = function (url, params, config) {
      return service.request('GET', url, params, null, config);
    };

    /**
     * Make a post request to given url.
     * @param {String} url - Request url.
     * @param {Object} [data] - Request data.
     * @param {Boolean} [config] - See the request method.
     * @returns {Promise} - Passing the response data.
     */
    service.post = function (url, data, config) {
      return service.request('POST', url, null, data, config);
    };

    /**
     * Make a put request to given url.
     * @param {String} url - Request url.
     * @param {Object} [data] - Request parameters.
     * @param {Boolean} [config] - See the request method.
     * @returns {Promise} - Passing the response data.
     */
    service.put = function (url, data, config) {
      return service.request('PUT', url, null, data, config);
    };

    /**
     * Make a delete request to given url.
     * @param {String} url - Request url.
     * @param {Object} [data] - Request parameters.
     * @param {Boolean} [config] - See the request method.
     * @returns {Promise} - Passing the response data.
     */
    service.delete = function (url, data, config) {
      return service.request('DELETE', url, null, data, config);
    };

    /**
     * Group promises and wait for all of them to resolve.
     * @param {Object} promises - A key/value object of promises
     * @return {Promise} - Passing the object with resolved values.
     */
    service.all = function (promises) { return $q.all(promises); };

    /**
     * Simulate an HTTP rejection so that it won't break interceptors.
     * @param {Number} status - HTTP status code.
     * @param {*} [data] - Response data.
     * @param {Object} [config={}] - Request config.
     * @return {Promise}
     */
    service.reject = function (status, data, config) {
      config = _.extend({}, config);
      return $q.reject({ status: status, data: data, config: config });
    };
  }

  module.service('httpService', [
    '$q',
    '$http',
    '$timeout',
    'API_SERVER_URL',
    HttpService
  ]);

}(angular.module('app.http')));
