/**
 * @module app
 */
(function (module) {
  'use strict';

  /**
   * Define the module's configuration.
   * @private
   * @function config
   * @param {Object} $httpProvider - The Angular $httpProvider service.
   * @param {Object} $ionicConfigProvider - Ionic $ionicConfigProvider service.
   * @param {Object} $urlRouterProvider - UI Router $urlRouterProvider service.
   */
  function config($httpProvider, $ionicConfigProvider, $urlRouterProvider) {
    $ionicConfigProvider.scrolling.jsScrolling(ionic.Platform.isIOS());
    $httpProvider.interceptors.push('loadingInterceptor');
    $urlRouterProvider.otherwise('/home');
  }

  /**
   * Setup the module's run lifecycle behavior.
   * @private
   * @function run
   * @param {Object} $rootScope - The Angular root scope object.
   * @param {Object} $ionicLoading - The Ionic $ionicLoading service.
   */
  function run($rootScope, $ionicLoading) {
    $rootScope.$on('loading:show', $ionicLoading.show);
    $rootScope.$on('loading:hide', $ionicLoading.hide);
  }

  module.config([
    '$httpProvider',
    '$ionicConfigProvider',
    '$urlRouterProvider',
    config
  ]);
  module.run(['$rootScope', '$ionicLoading', run]);

}(angular.module('app', ['fp.utils', 'app.home'])));
