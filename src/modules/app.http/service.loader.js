/**
 * @memberOf app.http
 */
(function (module) {
  'use strict';

  function LoaderService($rootScope, $ionicLoading) {
    var service = this;
    var retain = 0;

    /**
     * Show the Ionic loader.
     */
    service.show = function () {
      if (retain === 0) { $ionicLoading.show(); }
      retain += 1;
    };

    /**
     * Hide the Ionic loader if nothing else needs it.
     */
    service.hide = function () {
      retain = Math.max(0, retain - 1);
      if (retain === 0) { $ionicLoading.hide(); }
    };
  }

  module.service('loaderService', [
    '$rootScope',
    '$ionicLoading',
    LoaderService
  ]);

}(angular.module('app.http')));
