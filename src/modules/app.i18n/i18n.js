/**
 * @module app.i18n
 */
(function (module) {
  'use strict';

  function config(
    $translateProvider,
    tmhDynamicLocaleProvider,
    I18N_PATTERN,
    I18N
  ) {
    tmhDynamicLocaleProvider.localeLocationPattern(I18N_PATTERN);
    $translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.uniformLanguageTag('bcp47');
    $translateProvider.useLocalStorage();
    $translateProvider.addInterpolation('$translateMessageFormatInterpolation');
    $translateProvider.registerAvailableLanguageKeys(I18N.LOCALES);
    $translateProvider.fallbackLanguage(I18N.DEFAULT);
    $translateProvider.determinePreferredLanguage();
  }

  module.config([
    '$translateProvider',
    'tmhDynamicLocaleProvider',
    'I18N_PATTERN',
    'I18N',
    config
  ]);

}(angular.module('app.i18n', [
  'pascalprecht.translate',
  'tmh.dynamicLocale',
  'ngCookies',
  'app'
])));
