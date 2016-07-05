/**
 * @memberOf app
 */
(function (module) {
  'use strict';

  function config(stateFolderProvider) {
    stateFolderProvider.setFolder(stateFolderProvider.FOLDERS.TABLET);
  }

  module.config(['stateFolderProvider', config]);

}(angular.module('app')));
