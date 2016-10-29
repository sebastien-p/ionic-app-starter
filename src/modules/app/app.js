/**
 * @module app
 */
(function (module) {
  'use strict';

  function config($compileProvider, $ionicConfigProvider, IS_PROD) {
    // Should improve runtime performances.
    $compileProvider.debugInfoEnabled(!IS_PROD);
    $ionicConfigProvider.scrolling.jsScrolling(ionic.Platform.isIOS()); // TODO: false?
    // Disable Ionic template prefetch.
    $ionicConfigProvider.templates.maxPrefetch(0);
  }

  function run($rootScope, cordovaUtils, APP_VERSION, APP_NAME) {
    $rootScope.IS_CORDOVA = cordovaUtils.isCordova();
    $rootScope.APP_VERSION = APP_VERSION;
    $rootScope.APP_NAME = APP_NAME;
  }

  module.config([
    '$compileProvider',
    '$ionicConfigProvider',
    'IS_PROD',
    config
  ]);

  module.run(['$rootScope', 'cordovaUtils', 'APP_VERSION', 'APP_NAME', run]);

}(angular.module('app', ['fp.utils'])));
