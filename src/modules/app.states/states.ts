/**
 * @module app.states
 */
namespace app.states {
  'use strict';

  const module: ng.IModule = angular.module('app.states', [
    'app.native',
    'app.http'
  ]);

  const STATE = 'states';

  function statesDataResolver(statesService: IStatesService) {
    return statesService.resolveStatesData();
  }

  function config(
    $stateProvider: ng.ui.IStateProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider
  ) {
    $stateProvider.state(STATE, {
      resolve: {
        statesData: ['statesService', statesDataResolver]
      },
      data: {
        module: module
      },
      views: {
        root: {}
      },
      abstract: true
    });

    // Default route if none matching.
    $urlRouterProvider.otherwise('/home');
  }

  module.config([
    '$stateProvider',
    '$urlRouterProvider',
    config
  ]);

}
