/**
 * @memberOf app
 */
(function (module) {
  'use strict';

  function config(stateFolderProvider) {
    stateFolderProvider.setFolder(stateFolderProvider.FOLDERS.TABLET);
  }

  function run($rootScope, appService) {
    $rootScope.$on('$stateChangeSuccess', appService.scrollToTop);
  }

  module.config(['stateFolderProvider', config]);
  module.run(['$rootScope', 'appService', run]);

}(angular.module('app')));
