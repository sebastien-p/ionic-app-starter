/**
 * @module app.states.home
 */
(function (module) {
  'use strict';

  var STATE_DETAILS = 'states.details';

  function movieDetailsResolver($stateParams, statesService) {
    return statesService.getMovie($stateParams.getmovieId);
  }

  function config($stateProvider) {
    $stateProvider.state(STATE_DETAILS, {
      data: { module: module, navBar: true },
      url: '/details/:movieId',
      views: {
        'content-smartphone': {
          controller: 'detailsController as detailsController'
        }
      },
      resolve: {
        movieDetails: ['$statesParams', 'statesService', movieDetailsResolver]
      }
    });
  }

  function run($rootScope) { $rootScope.STATE_DETAILS = STATE_DETAILS; }

  module.constant('STATE_DETAILS', STATE_DETAILS);
  module.config(['$stateProvider', config]);
  module.run(['$rootScope', run]);

}(angular.module('app.states.details', ['app.states'])));
