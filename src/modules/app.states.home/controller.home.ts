/**
 * @memberOf app.states.home
 */
namespace app.states.home {
  'use strict';

  const module: ng.IModule = angular.module('app.states.home');

  class HomeController implements ng.IController {
    constructor(
      private $scope: ng.IScope,
      private $log: ng.ILogService,
      private popupService: IPopupService,
      private statesData: IStateData
    ) {
      this.$scope.statesData = this.statesData;
      this.$scope.from = 'homeController';
    }

    /**
     * To be used with new angularjs version.
     * We have to keep it to comply with `ng.IController` interface
     * even tho it's never called.
     */
    $onInit(): void {}

    showPopup(): void {
      const scope: IMap<any> = { from: this.$scope.from, title: 'Popup' };
      this.popupService.open(module, 'smartphone/popup', scope);
    }

    onLanguageChange(locale: string): void {
      this.$log.debug(locale);
    }
  }

  module.controller('homeController', [
    '$scope',
    '$log',
    'popupService',
    'statesData',
    HomeController
  ]);
}
