/**
 * @memberOf app.http
 */
namespace app.http {
  'use strict';

  const module: ng.IModule = angular.module('app.http');

  export interface ILoaderService {
    /**
     * Show the Ionic loader.
     */
    show(): void;

    /**
     * Hide the Ionic loader if nothing else needs it.
     */
    hide(): void;
  }

  class LoaderService implements ILoaderService {
    constructor(
      private $rootScope: ng.IRootScopeService,
      private $ionicLoading: ionic.loading.IonicLoadingService
    ) { }

    private retain: number = 0;

    show() {
      if (this.retain === 0) {
        this.$ionicLoading.show();
      }
      this.retain += 1;
    }

    hide() {
      this.retain = Math.max(0, this.retain - 1);
      if (this.retain === 0) {
        this.$ionicLoading.hide();
      }
    }
  }

  module.service('loaderService', [
    '$rootScope',
    '$ionicLoading',
    LoaderService
  ]);
}
