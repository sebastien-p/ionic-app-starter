/**
 * @memberOf app.states.home
 */
namespace app.states.home {
  'use strict';

  const module = angular.module('app.states.home');

  class HomeController implements ng.IController {
    constructor(
      private $scope: ng.IScope,
      private popupService: app.states.IPopupService,
      private statesData: any
    ) { }

    $onInit() {
      this.$scope.statesData = this.statesData;
      this.$scope.from = 'homeController';
    }

    showPopup() {
      const scope = { from: this.$scope.from, title: 'Popup' };
      this.popupService.open(module, 'smartphone/popup', scope);
    }

    onLanguageChange(locale: string) {
      console.debug(locale);
    }
  }

  module.controller('homeController', [
    '$scope',
    'popupService',
    'statesData',
    HomeController
  ]);

}
