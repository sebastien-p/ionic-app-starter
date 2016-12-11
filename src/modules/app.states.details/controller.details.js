/**
 * @memberOf app.states.details
 */
(function (module) {
  'use strict';

  function DetailsController($scope, movieData) {
    var controller = this;

    $scope.movieData = movieData;
  }

  module.controller('detailsController', [
    '$scope',
    'movieData',
    DetailsController
  ]);

}(angular.module('app.states.details')));
