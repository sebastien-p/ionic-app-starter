/**
 * @memberOf app
 */
namespace app {
  'use strict';

  const module: ng.IModule = angular.module('app');

  function config(
    stateFolderServiceProvider: IStateFolderServiceProvider,
    STATE_FOLDERS: Folders
  ): void {
    stateFolderServiceProvider.folder = STATE_FOLDERS.TABLET;
  }

  function run(
    $rootScope: ng.IRootScopeService,
    appService: IAppService
  ): void {
    $rootScope.$on('$stateChangeSuccess', () => appService.scrollToTop);
  }

  module.config([
    'stateFolderServiceProvider',
    'STATE_FOLDERS',
    config
  ]);

  module.run([
    '$rootScope',
    'appService',
    run
  ]);
}
