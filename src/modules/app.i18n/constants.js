/**
 * @memberOf app.i18n
 */
(function (module) {
  'use strict';

  /**
   * Angular locales location pattern.
   * @constant
   * @type {String}
   */
  var I18N_PATTERN = 'lib/angular-i18n/angular-locale_{{ locale }}.js';

  /**
   * Additional i18n units.
   * @constant
   * @type {Object}
   */
  var I18N_UNITS = {
    'EN-US': { TEMPERATURE: { SYMBOL: '°F' } },
    'FR-FR': { TEMPERATURE: { SYMBOL: '°C' } }
  };

  module.constant('I18N_PATTERN', I18N_PATTERN);
  module.constant('I18N_UNITS', I18N_UNITS);

}(angular.module('app.i18n')));
