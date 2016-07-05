/**
 * @memberOf app.i18n
 */
(function (module) {
  'use strict';

  var I18N_PATTERN = 'lib/angular-i18n/angular-locale_{{locale}}.js';

  var I18N_UNITS = {
    'EN-US': { TEMPERATURE: { SYMBOL: '°F' } },
    'FR-FR': { TEMPERATURE: { SYMBOL: '°C' } }
  };

  module.constant('I18N_PATTERN', I18N_PATTERN);
  module.constant('I18N_UNITS', I18N_UNITS);

}(angular.module('app.i18n')));
