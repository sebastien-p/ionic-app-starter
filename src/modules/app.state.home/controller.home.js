/**
 * @memberOf app.state.home
 */
(function (module) {
  'use strict';

  function HomeController($scope, popupService, locale) {
    var controller = this;

    $scope.settings = { language: locale };

    $scope.from = 'homeController';

    controller.showPopup = function () {
      var scope = { from: $scope.from, title: 'Popup' };
      popupService.open(module, 'smartphone/popup', scope);
    };
  }

  module.controller('homeController', [
    '$scope',
    'popupService',
    'locale',
    HomeController
  ]);

}(angular.module('app.state.home')));
