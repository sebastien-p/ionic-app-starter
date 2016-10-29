/**
 * @memberOf app.state
 */
(function (module) {
  'use strict';

  function config(stateFolderProvider) {
    stateFolderProvider.setFolder(stateFolderProvider.FOLDERS.TABLET);
  }

  function run($rootScope, stateService) {
    $rootScope.$on('$stateChangeSuccess', stateService.scrollToTop);
  }

  module.config(['stateFolderProvider', config]);
  module.run(['$rootScope', 'stateService', run]);

}(angular.module('app.state')));
