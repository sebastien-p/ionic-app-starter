/**
 * @module app
 */
namespace app {
  'use strict';

  const module: ng.IModule = angular.module('app', [
    'fp.utils'
  ]);

  function config(
    $compileProvider: ng.ICompileProvider,
    $ionicConfigProvider: ionic.utility.IonicConfigProvider,
    $stateProvider: ng.ui.IStateProvider,
    stateFolderServiceProvider: IStateFolderServiceProvider,
    templateUtilsProvider: any, // TODO: typings
    IS_PROD: boolean
  ): void {
    // Should improve runtime performances.
    $compileProvider.debugInfoEnabled(!IS_PROD);
    // Disable Ionic template prefetching feature.
    $ionicConfigProvider.templates.maxPrefetch(0);
    $ionicConfigProvider.scrolling.jsScrolling(ionic.Platform.isIOS()); // TODO: false?

    // Update all states templateUrl to add device type (tablet/smartphone).
    $stateProvider.decorator('views', (
      state: ng.ui.IState,
      decorated: IFunction<IMap<ng.ui.IState>>
    ): IMap<ng.ui.IState> => {
      const root: string = stateFolderServiceProvider.folder + '/';
      return _.each(decorated(state), (view: ng.ui.IState): void => {
        const module: ng.IModule = state.data && state.data.module;
        if (!module) { return; }
        const file: string = view.templateUrl ? root + view.templateUrl : root;
        view.templateUrl = templateUtilsProvider.getUrlFromModule(module, file);
      });
    });
  }

  function run(
    $rootScope: ng.IRootScopeService,
    $state: ng.ui.IStateService,
    $ionicHistory: ionic.navigation.IonicHistoryService,
    $ionicNavBarDelegate: ionic.navigation.IonicNavBarDelegate,
    appService: IAppService,
    APP_VERSION: string,
    APP_NAME: string
  ): void {
    $rootScope.APP_VERSION = APP_VERSION;
    $rootScope.APP_NAME = APP_NAME;

    $rootScope.$on('$ionicView.beforeEnter', ($e: ng.IAngularEvent): void => {
      // Update state resolved data.
      const globals: IMap<any> = $state.$current.locals.globals;
      const scope: ng.IScope = $e.targetScope.$parent;
      _.each(globals, (value: any, key: string): void => {
        const update: boolean = appService.shouldUpdate(globals, scope, key);
        if (update) { scope[key] = globals[key]; } // TODO: prefix or suffix?
      });
      // Hide the nav bar if we don't need it.
      $ionicNavBarDelegate.showBar(
        // Casted to `any` because the typings are outdated...
        (<any>$ionicHistory).enabledBack($ionicHistory.currentView())
        || !!$state.current.data.navBar
      );
    });
  }

  module.config([
    '$compileProvider',
    '$ionicConfigProvider',
    '$stateProvider',
    'stateFolderServiceProvider',
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
}
