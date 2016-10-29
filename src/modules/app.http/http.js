/**
 * @module app.http
 */
(function (module) {
  'use strict';

  function config($httpProvider) {
    $httpProvider.interceptors.push('loadingInterceptor');
    $httpProvider.interceptors.push('errorsInterceptor');
  }

  function run($rootScope, loadingService, httpService) {
    $rootScope.$on('fpUtils.loading.show', loadingService.show);
    $rootScope.$on('fpUtils.loading.hide', loadingService.hide);
    $rootScope.$on('fpUtils.cordova.paused', httpService.pausePollings);
    $rootScope.$on('fpUtils.cordova.resumed', httpService.resumePollings);
  }

  module.config(['$httpProvider', config]);
  module.run(['$rootScope', 'loadingService', 'httpService', run]);

}(angular.module('app.http', ['app'])));
