/**
 * @module app.states
 */
(function (module) {
  'use strict';

  var STATE = 'states';

  function statesDataResolver(statesService) {
    return statesService.resolveStatesData();
  }

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider.state(STATE, {
      resolve: { statesData: ['statesService', statesDataResolver] },
      data: { module: module },
      views: { root: {} },
      abstract: true
    });

    // Default route if none matching.
    $urlRouterProvider.otherwise('/home');
  }

  module.config(['$stateProvider', '$urlRouterProvider', config]);

}(angular.module('app.states', ['app.native', 'app.http'])));
