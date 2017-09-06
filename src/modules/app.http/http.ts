/**
 * @module app.http
 */
namespace app.http {
  'use strict';

  const module: ng.IModule = angular.module('app.http', [
    'app'
  ]);

  function config(
    $httpProvider: ng.IHttpProvider
  ): void {
    $httpProvider.interceptors.push('loadingInterceptor');
    $httpProvider.interceptors.push('errorsInterceptor');
  }

  function run(
    $rootScope: ng.IRootScopeService,
    loaderService: app.http.ILoaderService,
    pollerService: app.http.IPollerService
  ): void {
    $rootScope.$on('fpUtils.loading.show', () => loaderService.show());
    $rootScope.$on('fpUtils.loading.hide', () => loaderService.hide());
    $rootScope.$on('fpUtils.cordova.paused', () => pollerService.pausePollings());
    $rootScope.$on('fpUtils.cordova.resumed', () => pollerService.resumePollings());
  }

  module.config([
    '$httpProvider',
    config
  ]);

  module.run([
    '$rootScope',
    'loaderService',
    'pollerService',
    run
  ]);
}
