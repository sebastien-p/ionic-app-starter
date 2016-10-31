/**
 * @memberOf app.states
 */
(function (module) {
  'use strict';

  function config(stateFolderProvider) {
    stateFolderProvider.setFolder(stateFolderProvider.FOLDERS.TABLET);
  }

  function run($rootScope, statesService) {
    $rootScope.$on('$stateChangeSuccess', statesService.scrollToTop);
  }

  module.config(['stateFolderProvider', config]);
  module.run(['$rootScope', 'statesService', run]);

}(angular.module('app.states')));
