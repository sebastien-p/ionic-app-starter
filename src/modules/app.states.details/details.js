/**
 * @module app.states.details
 */
(function (module) {
  'use strict';

  var STATE_DETAILS = 'states.details';

  function movieDataResolver($stateParams,statesService){//:id-----url
    return statesService.getMovie($stateParams);//id =1
  }

  function config($stateProvider) {
    $stateProvider.state(STATE_DETAILS, {
      data: { module: module, navBar: true },
      url: '/details/:id',//URL -> CONTROLEUR    id from URL
      views: {
        'content-smartphone': {
          controller: 'detailsController as detailsController'
        }
      },
      resolve: {//protect ecran,when none result
        movieData: ['$stateParams','statesService',movieDataResolver]
      }
    });
  }

  function run($rootScope) { $rootScope.STATE_DETAILS = STATE_DETAILS; }

  module.constant('STATE_DETAILS', STATE_DETAILS);
  module.config(['$stateProvider', config]);
  module.run(['$rootScope', run]);

}(angular.module('app.states.details', ['app.states'])));
