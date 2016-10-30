/**
 * @memberOf app.http
 */
(function (module) {
  'use strict';

  function LoadingService($rootScope, $ionicLoading) {
    var service = this;
    var loading = 0;

    /**
     * Show the Ionic loader.
     */
    service.show = function () {
      if (0 === loading) { $ionicLoading.show(); }
      loading += 1;
    };

    /**
     * Hide the Ionic loader if nothing else needs it.
     */
    service.hide = function () {
      loading -= 1;
      if (0 === loading) { $ionicLoading.hide(); }
    };
  }

  module.service('loadingService', [
    '$rootScope',
    '$ionicLoading',
    LoadingService
  ]);

}(angular.module('app.http')));
