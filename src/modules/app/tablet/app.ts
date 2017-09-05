/**
 * @memberOf app
 */
namespace app {
  'use strict';

  const module: ng.IModule = angular.module('app');

  function config(
    stateFolderServiceProvider: IStateFolderServiceProvider
  ): void {
    stateFolderServiceProvider.folder = Folder.TABLET;
  }

  function run(
    $rootScope: ng.IRootScopeService,
    appService: IAppService
  ): void {
    $rootScope.$on('$stateChangeSuccess', () => appService.scrollToTop);
  }

  module.config([
    'stateFolderServiceProvider',
    config
  ]);

  module.run([
    '$rootScope',
    'appService',
    run
  ]);
}
