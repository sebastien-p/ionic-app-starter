/**
 * @module app.states.home
 */
namespace app.states.home {
  'use strict';

  const module: ng.IModule = angular.module('app.states.home', [
    'app.states'
  ]);

  const STATE_HOME: string = 'states.home';

  function config(
    $stateProvider: ng.ui.IStateProvider
  ): void {
    const views: IMap<ng.ui.IState> = {};
    const controller: string = 'homeController as homeController';
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
  ): void {
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
