/**
 * @module app
 */
(function (module) {
  'use strict';

  function config(
    $compileProvider,
    $ionicConfigProvider,
    $stateProvider,
    stateFolderProvider,
    templateUtilsProvider,
    IS_PROD
  ) {
    // Should improve runtime performances.
    $compileProvider.debugInfoEnabled(!IS_PROD);
    // Disable Ionic template prefetching feature.
    $ionicConfigProvider.templates.maxPrefetch(0);
    $ionicConfigProvider.scrolling.jsScrolling(ionic.Platform.isIOS()); // TODO: false?

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
  }

  function run(
    $rootScope,
    $state,
    $ionicHistory,
    $ionicNavBarDelegate,
    appService,
    APP_VERSION,
    APP_NAME
  ) {
    $rootScope.APP_VERSION = APP_VERSION;
    $rootScope.APP_NAME = APP_NAME;

    $rootScope.$on('$ionicView.beforeEnter', function ($event) {
      // Update state resolved data.
      var globals = $state.$current.locals.globals;
      var scope = $event.targetScope.$parent;
      _.each(globals, function (value, key) {
        var update = appService.shouldUpdateResolved(globals, scope, key);
        if (update) { scope[key] = globals[key]; } // TODO: prefix or suffix?
      });
      // Hide the nav bar if we don't need it.
      var hasBack = $ionicHistory.enabledBack($ionicHistory.currentView());
      $ionicNavBarDelegate.showBar(hasBack || !!$state.current.data.navBar);
    });
  }

  module.config([
    '$compileProvider',
    '$ionicConfigProvider',
    '$stateProvider',
    'stateFolderProvider',
    'templateUtilsProvider',
    'IS_PROD',
    config
  ]);

  module.run([
    '$rootScope',
    '$state',
    '$ionicHistory',
    '$ionicNavBarDelegate',
    'appService',
    'APP_VERSION',
    'APP_NAME',
    run
  ]);

}(angular.module('app', ['fp.utils'])));
