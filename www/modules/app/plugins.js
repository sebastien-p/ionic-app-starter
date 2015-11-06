/**
 * @memberOf app
 */
(function (module) {
  'use strict';

  /**
   * Define the module's Cordova plugins configuration.
   * @private
   * @function config
   * @param {Object} $cordovaInAppBrowserProvider - InAppBrowser configurator.
   */
  function config($cordovaInAppBrowserProvider) {
    $cordovaInAppBrowserProvider.setDefaultOptions({
      mediaPlaybackRequiresUserAction: 'yes',
      // closeButtonCaption: 'Close', // TODO?
      enableViewportScale: 'yes',
      clearSessionCache: 'yes',
      clearCache: 'yes',
      location: 'no'
    });
  }

  /**
   * Setup the module's run lifecycle behavior.
   * @private
   * @function run
   * @param {Object} $cordovaSplashscreen - ngCordova $cordovaSplashscreen.
   * @param {Object} $cordovaStatusbar - ngCordova $cordovaStatusbar.
   * @param {Object} $cordovaKeyboard - ngCordova $cordovaKeyboard.
   * @param {Object} cordovaUtils - Some Cordova utilities.
   */
  function run(
    $cordovaSplashscreen,
    $cordovaStatusbar,
    $cordovaKeyboard,
    cordovaUtils
  ) {
    cordovaUtils.callWhenReady(function () {
      $cordovaStatusbar.style($cordovaStatusbar.STYLES.LIGHT_CONTENT);
      $cordovaStatusbar.overlaysWebView(true);
      $cordovaKeyboard.hideAccessoryBar(true);
      $cordovaSplashscreen.hide();
    });
  }

  module.config(['$cordovaInAppBrowserProvider', config]);
  module.run([
    '$cordovaSplashscreen',
    '$cordovaStatusbar',
    '$cordovaKeyboard',
    'cordovaUtils',
    run
  ]);

}(angular.module('app')));
