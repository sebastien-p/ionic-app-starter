/**
 * @memberOf app.states.home
 */
(function (module) {
  'use strict';

  function HomeController($scope, statesService) {
    var controller = this;

    $scope.search = { query: '', results: []};

    controller.search = function() {
      statesService.search($scope.search.query)
      .then(function(res) {
        $scope.search.results = res;
      });
    };
  }

  module.controller('homeController', [
    '$scope',
    'statesService',
    HomeController
  ]);

}(angular.module('app.states.home')));
