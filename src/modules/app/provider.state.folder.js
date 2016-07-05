/**
 * @memberOf app
 */
(function (module) {
  'use strict';

  // Provider to manage folder used by the state decorator.
  function StateFolderProvider() {
    var provider = this;
    var current = null;

    /**
     * Available folders.
     * @type {Object}
     */
    provider.FOLDERS = { SMARTPHONE: 'smartphone', TABLET: 'tablet' };

    /**
     * Set the used folder.
     * @param {String} folder
     */
    provider.setFolder = function (folder) { current = folder; };

    /**
     * Get the used folder.
     * @returns {String}
     */
    provider.getFolder = function () { return current; };

    // Set the default folder.
    provider.setFolder(provider.FOLDERS.SMARTPHONE);

    // Associated service.
    function StateDecoratorFolder() {
      var service = this;

      /**
       * Get the used folder.
       * @returns {String}
       */
      service.getFolder = provider.getFolder;
    }

    provider.$get = [function () { return new StateDecoratorFolder(); }];
  }

  module.provider('stateDecoratorFolder', [StateFolderProvider]);

}(angular.module('app')));
