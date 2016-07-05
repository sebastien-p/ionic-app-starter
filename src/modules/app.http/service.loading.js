/**
 * @memberOf app.http
 */
(function (module) {
  'use strict';

  function LoadingService($rootScope, $ionicLoading) {
    var service = this;
    var loading = 0;

    service.show = function () {
      if (0 === loading) { $ionicLoading.show(); }
      loading += 1;
    };

    service.hide = function () {
      loading -= 1;
      if (0 === loading) { $ionicLoading.hide(); }
    };

    service.loadingStart = function () { // TODO: useful here?
      $rootScope.$broadcast('fpUtils.loading.show');
    };

    service.loadingEnd = function () { // TODO: useful here?
      $rootScope.$broadcast('fpUtils.loading.hide');
    };
  }

  module.service('loadingService', [
    '$rootScope',
    '$ionicLoading',
    LoadingService
  ]);

}(angular.module('app.http')));
