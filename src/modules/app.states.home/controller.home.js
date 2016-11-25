/**
 * @memberOf app.states.home
 */
(function (module) {
  'use strict';

  function HomeController($scope, statesService) {
    var controller = this;

    $scope.search = { query: '', results: [] };

    controller.search = function () {
      $scope.search.results = statesService.search($scope.search.query).then(function (results) {
        $scope.search.results = results;
      });
    };

  }

  module.controller('homeController', [
    '$scope',
    'statesService',
    HomeController
  ]);

}(angular.module('app.states.home')));
