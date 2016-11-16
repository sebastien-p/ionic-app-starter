/**
 * @memberOf app.i18n
 */
(function (module) {
  'use strict';

  /**
   * Additional i18n units.
   * @constant
   * @type {Object}
   */
  var I18N_UNITS = {
    'EN-US': { TEMPERATURE: { SYMBOL: '°F' } },
    'FR-FR': { TEMPERATURE: { SYMBOL: '°C' } }
  };

  module.constant('I18N_UNITS', I18N_UNITS);

}(angular.module('app.i18n')));
