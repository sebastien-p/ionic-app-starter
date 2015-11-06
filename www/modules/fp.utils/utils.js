/**
 * @module fp.utils
 */
(function (module) {
  'use strict';

  /**
   * The default modules path.
   * @constant MODULES_PATH
   * @type {String}
   */
  var MODULES_PATH = 'modules/';

  /**
   * The default module name separator.
   * @constant MODULE_NAME_SEPARATOR
   * @type {String}
   */
  var MODULE_NAME_SEPARATOR = '.';

  module.constant('MODULES_PATH', MODULES_PATH);
  module.constant('MODULE_NAME_SEPARATOR', MODULE_NAME_SEPARATOR);

}(angular.module('fp.utils', ['ionic', 'ngCordova', 'angular-cache'])));
