/**
 * @memberOf fp.utils
 */
(function (module) {
  'use strict';

  /**
   * The template utils service provider.
   * @constructor TemplateUtilsProvider
   * @param {String} MODULES_PATH - The default modules path.
   * @param {String} MODULE_NAME_SEPARATOR - The default module name separator.
   */
  function TemplateUtilsProvider(MODULES_PATH, MODULE_NAME_SEPARATOR) {
    var provider = this;

    var modulesPath = MODULES_PATH;
    var moduleNameSeparator = MODULE_NAME_SEPARATOR;

    /**
     * Get the modules path prefix.
     * @method getModulesPath
     * @return {String}
     */
    provider.getModulesPath = function () { return modulesPath; };

    /**
     * Set the modules path prefix.
     * @method setModulesPath
     * @param {String} path
     */
    provider.setModulesPath = function (path) {
      if (_.isString(path)) { modulesPath = path; }
    };

    /**
     * Get the module name separator.
     * @method getModuleNameSeparator
     * @return {String}
     */
    provider.getModuleNameSeparator = function () {
      return moduleNameSeparator;
    };

    /**
     * Set the module name separator.
     * @method setModuleNameSeparator
     * @param {String} separator
     */
    provider.setModuleNameSeparator = function (separator) {
      if (_.isString(separator)) { moduleNameSeparator = separator; }
    };

    /**
     * Get the URL of a given Angular module.
     * @method getModuleUrl
     * @param {Object} module
     * @return {String}
     */
    provider.getModuleUrl = function (module) {
      return modulesPath + module.name + '/';
    };

    /**
     * Get the last part of the given module name.
     * @method getLastModuleNamePart
     * @param {Object} module
     * @return {String}
     */
    provider.getLastModuleNamePart = function (module) {
      return module.name.split(moduleNameSeparator).pop();
    };

    /**
     * Get a template URL from a given Angular module.
     * @method getUrlFromModule
     * @param {Object} module
     * @param {String} [file] - Last part of the module name by default.
     * @return {String}
     */
    provider.getUrlFromModule = function (module, file) {
      var validFileName = _.isString(file);
      if (!validFileName) { file = provider.getLastModuleNamePart(module); }
      return provider.getModuleUrl(module) + file + '.html';
    };

    /**
     * The template utils service.
     * @constructor TemplateUtils
     */
    function TemplateUtils() {
      var service = this;

      /**
       * Get the modules path prefix.
       * @method getModulesPath
       * @return {String}
       */
      service.getModulesPath = provider.getModulesPath;

      /**
       * Get the module name separator.
       * @method getModuleNameSeparator
       * @return {String}
       */
      service.getModuleNameSeparator = provider.getModuleNameSeparator;

      /**
       * Get the URL of a given Angular module.
       * @method getModuleUrl
       * @param {Object} module
       * @return {String}
       */
      service.getModuleUrl = provider.getModuleUrl;

      /**
       * Get the last part of the given module name.
       * @method getLastModuleNamePart
       * @param {Object} module
       * @return {String}
       */
      service.getLastModuleNamePart = provider.getLastModuleNamePart;

      /**
       * Get a template URL from a given Angular module.
       * @method getUrlFromModule
       * @param {Object} module
       * @param {String} [file] - Last part of the module name by default.
       * @return {String}
       */
      service.getUrlFromModule = provider.getUrlFromModule;
    }

    provider.$get = [function () { return new TemplateUtils(); }];
  }

  module.provider('templateUtils', [
    'MODULES_PATH',
    'MODULE_NAME_SEPARATOR',
    TemplateUtilsProvider
  ]);

}(angular.module('fp.utils')));
