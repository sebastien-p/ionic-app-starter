/**
 * @memberOf app.state
 */
(function (module) {
  'use strict';

  // Provider to manage folder used by the $state views decorator.
  function StateFolderProvider() {
    var provider = this;
    var current = null;

    /**
     * Available folders.
     * @type {Object}
     */
    provider.FOLDERS = {
      SMARTPHONE: 'smartphone',
      TABLET: 'tablet',
      WEB: 'web'
    };

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
    function StateFolder() {
      var service = this;

      /**
       * Get the used folder.
       * @returns {String}
       */
      service.getFolder = provider.getFolder;
    }

    provider.$get = [function () { return new StateFolder(); }];
  }

  module.provider('stateFolder', [StateFolderProvider]);

}(angular.module('app.state')));
