/**
 * @memberOf fp.utils
 */
(function (module) {
  'use strict';

  var camelCasedName = _.camelCase(module.name);

  /**
   * Some Cordova utilities.
   * @constructor CordovaUtils
   * @param {Object} $rootScope - The Angular root scope object.
   * @param {Object} $ionicPlatform - The Ionic $ionicPlatform service.
   * @param {Object} $cordovaToast - The ngCordova $cordovaToast service.
   */
  function CordovaUtils($rootScope, $ionicPlatform, $cordovaToast) {
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
     * @param {Function} callback
     */
    service.callWhenReady = function (callback) {
      if (service.isCordova()) { $ionicPlatform.ready(callback); }
    };

    /**
     * Show a toast at the center of the screen for a short duration.
     * @method showToast
     * @param {String} message
     */
    service.showToast = function (message) {
      function showToast() { $cordovaToast.showShortCenter(message); }
      service.callWhenReady(showToast);
    };

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
    '$rootScope',
    '$ionicPlatform',
    '$cordovaToast',
    CordovaUtils
  ]);

}(angular.module('fp.utils')));
