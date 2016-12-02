/**
 * @module app.states.details
 */
(function (module) {
  'use strict';

  var STATE_DETAILS = 'states.details';

  function moieDtaResolve($stateParams,statesSvervice){//:id-----url
    return statesSvervice.getMovie($stateParams);//id =1
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
        movieData: ['$stateParams','statesSvervice',moieDtaResolve]
      }
    });
  }

  function run($rootScope) { $rootScope.STATE_DETAILS = STATE_DETAILS; }

  module.constant('STATE_DETAILS', STATE_DETAILS);
  module.config(['$stateProvider', config]);
  module.run(['$rootScope', run]);

}(angular.module('app.states.details', ['app.states'])));
