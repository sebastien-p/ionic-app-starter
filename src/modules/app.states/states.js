/**
 * @module app.states
 */
(function (module) {
  'use strict';

  var STATE = 'states';

  function statesDataResolver(statesService) {
    return statesService.resolveStatesData();
  }

  function config(
    $stateProvider,
    $urlRouterProvider,
    stateFolderProvider,
    templateUtilsProvider
  ) {
    // Update all states templateUrl to add device type (tablet/smartphone).
    $stateProvider.decorator('views', function (state, decorated) {
      var folder = stateFolderProvider.getFolder() + '/';
      return _.each(decorated(state), function (view) {
        var module = state.data && state.data.module;
        if (!module) { return; }
        var file = view.templateUrl ? folder + view.templateUrl : folder;
        view.templateUrl = templateUtilsProvider.getUrlFromModule(module, file);
      });
    });

    $stateProvider.state(STATE, {
      resolve: { statesData: ['statesService', statesDataResolver] },
      data: { module: module },
      views: { root: {} },
      abstract: true
    });

    // Default route if none matching.
    $urlRouterProvider.otherwise('/home');
  }

  function run(
    $rootScope,
    $state,
    $ionicHistory,
    $ionicNavBarDelegate,
    statesService
  ) {
    $rootScope.$on('$ionicView.beforeEnter', function ($event) {
      // Update state resolved data.
      var globals = $state.$current.locals.globals;
      var scope = $event.targetScope.$parent;
      _.each(globals, function (value, key) {
        var update = statesService.shouldUpdateResolved(globals, scope, key);
        if (update) { scope[key] = globals[key]; } // TODO: prefix or suffix?
      });
      // Hide the nav bar if we don't need it.
      var hasBack = $ionicHistory.enabledBack($ionicHistory.currentView());
      $ionicNavBarDelegate.showBar(hasBack || !!$state.current.data.navBar);
    });
  }

  module.config([
    '$stateProvider',
    '$urlRouterProvider',
    'stateFolderProvider',
    'templateUtilsProvider',
    config
  ]);

  module.run([
    '$rootScope',
    '$state',
    '$ionicHistory',
    '$ionicNavBarDelegate',
    'statesService',
    run
  ]);

}(angular.module('app.states', ['app.http', 'app.i18n'])));
