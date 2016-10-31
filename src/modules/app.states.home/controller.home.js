/**
 * @memberOf app.states.home
 */
(function (module) {
  'use strict';

  function HomeController($scope, popupService, statesData) {
    var controller = this;

    $scope.statesData = statesData;

    $scope.from = 'homeController';

    controller.showPopup = function () {
      var scope = { from: $scope.from, title: 'Popup' };
      popupService.open(module, 'smartphone/popup', scope);
    };

    controller.onLanguageChange = function (locale) {
      console.debug(locale);
    };
  }

  module.controller('homeController', [
    '$scope',
    'popupService',
    'statesData',
    HomeController
  ]);

}(angular.module('app.states.home')));
