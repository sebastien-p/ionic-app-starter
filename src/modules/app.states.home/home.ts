/**
 * @module app.states.home
 */
namespace app.states.home {
  'use strict';

  const module = angular.module('app.states.home', [
    'app.states'
  ]);

  const STATE_HOME = 'states.home';

  function config(
    $stateProvider: ng.ui.IStateProvider
  ) {
    const views: any = {};
    const controller = 'homeController as homeController';
    views['content-smartphone'] = { controller: controller };
    views['content-tablet'] = { controller: controller };

    $stateProvider.state(STATE_HOME, {
      data: { module: module, navBar: true },
      url: '/home',
      views: views
    });
  }

  function run(
    $rootScope: ng.IRootScopeService
  ) {
    $rootScope.STATE_HOME = STATE_HOME;
  }

  module.constant('STATE_HOME', STATE_HOME);

  module.config([
    '$stateProvider',
    config
  ]);

  module.run([
    '$rootScope',
    run
  ]);

}
