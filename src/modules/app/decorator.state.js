/**
 * @memberOf app
 */
(function (module) {
  'use strict';

  function config(
    $stateProvider,
    $ionicConfigProvider,
    templateUtils,
    stateFolderProvider
  ) {
    // Disable the ionic html template prefetch when declaring a new state.
    $ionicConfigProvider.templates.maxPrefetch(0);

    // Update all states templateUrl to add device type (tablet/smartphone).
    $stateProvider.decorator('views', function (state, decorated) {
      var folder = stateFolderProvider.getFolder() + '/';
      return _.each(decorated(state), function (view) {
        var stateModule = state.data && state.data.module;
        if (!stateModule) { return; }
        var file = view.templateUrl ? folder + view.templateUrl : folder;
        view.templateUrl = templateUtils.getUrlFromModule(stateModule, file);
      });
    });
  }

  module.config([
    '$stateProvider',
    '$ionicConfigProvider',
    'templateUtilsProvider',
    'stateFolderProvider',
    config
  ]);

}(angular.module('app')));
