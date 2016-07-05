/**
 * @module app.native
 */
(function (module) {
  'use strict';

  function config($cordovaInAppBrowserProvider) {
    $cordovaInAppBrowserProvider.setDefaultOptions({ // TODO: what if plugin not installed or running outside cordova?
      mediaPlaybackRequiresUserAction: 'yes',
      enableViewportScale: 'yes',
      clearSessionCache: 'yes',
      clearCache: 'yes',
      location: 'no'
      // TODO: i18n close button
    });
  }

  function run(cordovaUtils, $cordovaStatusbar, $cordovaKeyboard) {
    cordovaUtils.callWhenReady(function () {
      $cordovaStatusbar.style($cordovaStatusbar.STYLES.DEFAULT);
      $cordovaKeyboard.hideAccessoryBar(false);
      $cordovaKeyboard.disableScroll(true);
    });
  }

  module.config(['$cordovaInAppBrowserProvider', config]);
  module.run(['cordovaUtils', '$cordovaStatusbar', '$cordovaKeyboard', run]);

}(angular.module('app.native', ['app'])));
