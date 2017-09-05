/**
 * @module app.native
 */
namespace app.native {
  'use strict';

  const module: ng.IModule = angular.module('app.native', [
    'app.i18n'
  ]);

  function config(
    $cordovaInAppBrowserProvider: any // TODO: typings
  ): void {
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
    $rootScope: ng.IRootScopeService,
    $cordovaKeyboard: any, // TODO: typings
    $cordovaStatusbar: any, // TODO: typings
    $cordovaSplashscreen: any, // TODO: typings
    cordovaUtils: any // TODO: typings
  ): void {
    $rootScope.IS_CORDOVA = cordovaUtils.isCordova();

    cordovaUtils.callWhenReady((): void => {
      $cordovaStatusbar.style($cordovaStatusbar.STYLES.DEFAULT);
      $cordovaKeyboard.hideAccessoryBar(false);
      $cordovaKeyboard.disableScroll(true);
      $cordovaSplashscreen.hide();
    });
  }

  module.config([
    '$cordovaInAppBrowserProvider',
    config
  ]);

  module.run([
    '$rootScope',
    '$cordovaKeyboard',
    '$cordovaStatusbar',
    '$cordovaSplashscreen',
    'cordovaUtils',
    run
  ]);
}
