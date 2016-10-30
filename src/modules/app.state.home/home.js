/**
 * @module app.state.home
 */
(function (module) {
  'use strict';

  var STATE_HOME = 'state.home';

  function config($stateProvider) {
    var views = {};
    var controller = 'homeController as homeController';
    views['content-smartphone'] = { controller: controller };
    views['content-tablet'] = { controller: controller };

    $stateProvider.state(STATE_HOME, {
      data: { module: module, navBar: true },
      url: '/home',
      views: views
    });
  }

  function run($rootScope) { $rootScope.STATE_HOME = STATE_HOME; }

  module.constant('STATE_HOME', STATE_HOME);
  module.config(['$stateProvider', config]);
  module.run(['$rootScope', run]);

}(angular.module('app.state.home', ['app.state'])));
