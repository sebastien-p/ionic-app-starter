/**
 * @memberOf fp.utils
 */
(function (module) {
  'use strict';

  var camelCasedName = _.camelCase(module.name);

  /**
   * Some Cordova utilities.
   * @constructor CordovaUtils
   * @param {Object} $q - The Angular $q service.
   * @param {Object} $rootScope - The Angular root scope object.
   * @param {Object} $ionicPlatform - The Ionic $ionicPlatform service.
   * @param {Object} $cordovaToast - The ngCordova $cordovaToast service.
   */
  function CordovaUtils($q, $rootScope, $ionicPlatform, $cordovaToast) {
    var service = this;

    /**
     * Get root scope broadcaters given event names.
     * @method getBroadcaster
     * @param {String|Array} name
     * @return {Function|Object}
     */
    function getBroadcaster(name) {
      var isArray = _.isArray(name);
      if (isArray) { return _.object(name, _.map(name, getBroadcaster)); }
      name = camelCasedName + '.cordova.' + name;
      return _.bind($rootScope.$broadcast, $rootScope, name);
    }

    /**
     * Check whether the app is running in a WebView or not.
     * @method isCordova
     * @return {Boolean}
     */
    service.isCordova = function () { return ionic.Platform.isWebView(); };

    /**
     * Call a given callback when Cordova is available and ready.
     * @method callWhenReady
     * @param {Function} cb
     * @return {Promise}
     */
    service.callWhenReady = function (cb) {
      if (service.isCordova()) { return $ionicPlatform.ready().then(cb); }
      return $q.reject(new Error('App not running inside Cordova'));
    };

    /**
     * Get a callback that would be called when Cordova is available and ready.
     * @method whenReady
     * @param {Function} cb
     * @return {Function}
     */
    service.whenReady = function (cb) {
      return function () {
        var bound = _.bind.apply(_, [cb, this].concat(_.toArray(arguments)));
        return service.callWhenReady(bound);
      };
    };

    /**
     * Show a toast at the center of the screen for a short duration.
     * @method showToast
     * @param {String} message
     * @return {Promise}
     */
    service.showToast = service.whenReady(function (message) {
      return $cordovaToast.showShortCenter(message);
    });

    // Broadcast 'paused' and 'resumed' events when the app runs in Cordova.
    service.callWhenReady(function () {
      var broadcast = getBroadcaster(['paused', 'resumed']);
      $ionicPlatform.on('resume', broadcast.resumed);
      $ionicPlatform.on('pause', broadcast.paused);
      if (!ionic.Platform.isIOS()) { return; }
      $ionicPlatform.on('active', broadcast.resumed);
      $ionicPlatform.on('resign', broadcast.paused);
    });
  }

  module.service('cordovaUtils', [
    '$q',
    '$rootScope',
    '$ionicPlatform',
    '$cordovaToast',
    CordovaUtils
  ]);

}(angular.module('fp.utils')));
