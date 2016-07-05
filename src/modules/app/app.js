/**
 * @module app
 */
(function (module) {
  'use strict';

  function config($compileProvider, $ionicConfigProvider) {
    // https://medium.com/swlh/improving-angular-performance-with-1-line-of-code-a1fb814a6476
    $compileProvider.debugInfoEnabled(false); // TODO: disable if IS_PROD
    $ionicConfigProvider.scrolling.jsScrolling(ionic.Platform.isIOS()); // TODO: false?
  }

  function run($rootScope, APP_NAME) { // TODO: add isCordova?
    $rootScope.APP_NAME = APP_NAME;
  }

  module.config(['$compileProvider', '$ionicConfigProvider', config]);
  module.run(['$rootScope', 'APP_NAME', run]);

}(angular.module('app', ['ui.router.default', 'fp.utils'])));
