/**
 * @module app.states.home
 */
(function (module) {
  'use strict';

  var STATE_HOME = 'states.home';

  function config($stateProvider) {
    $stateProvider.state(STATE_HOME, {
      data: { module: module, navBar: true },
      url: '/home',
      views: {
        'content-smartphone': {
          controller: 'homeController as homeController'
        }
      }
    });
  }

  function run($rootScope) { $rootScope.STATE_HOME = STATE_HOME; }

  module.constant('STATE_HOME', STATE_HOME);
  module.config(['$stateProvider', config]);
  module.run(['$rootScope', run]);

}(angular.module('app.states.home', ['app.states'])));
