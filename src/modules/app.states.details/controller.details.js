/**
 * @memberOf app.states.details
 */
(function (module) {
  'use strict';

  function DetailsController($scope, movieDetails) {
    var controller = this;

    $scope.movieDetails =  movieDetails;
  }

  module.controller('detailsController', [
    '$scope',
    'movieDetails',
    DetailsController
  ]);

}(angular.module('app.states.details')));
