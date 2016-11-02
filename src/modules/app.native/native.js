/**
 * @module app.native
 */
(function (module) {
  'use strict';

  function config($cordovaInAppBrowserProvider) {
    $cordovaInAppBrowserProvider.setDefaultOptions({
      mediaPlaybackRequiresUserAction: 'yes',
      enableViewportScale: 'yes',
      clearSessionCache: 'yes',
      clearCache: 'yes',
      location: 'no'
      // TODO: i18n close button
    });
  }

  function run(
    cordovaUtils,
    $cordovaKeyboard,
    $cordovaStatusbar,
    $cordovaSplashscreen
  ) {
    cordovaUtils.callWhenReady(function () {
      $cordovaStatusbar.style($cordovaStatusbar.STYLES.DEFAULT);
      $cordovaKeyboard.hideAccessoryBar(false);
      $cordovaKeyboard.disableScroll(true);
      $cordovaSplashscreen.hide();
    });
  }

  module.config(['$cordovaInAppBrowserProvider', config]);

  module.run([
    'cordovaUtils',
    '$cordovaKeyboard',
    '$cordovaStatusbar',
    '$cordovaSplashscreen',
    run
  ]);

}(angular.module('app.native', ['app.i18n'])));
