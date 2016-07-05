/**
 * @module app.i18n
 */
(function (module) {
  'use strict';

  var STATE_I18N = 'i18n';

  // Force loading of dynamic locale using the determined one.
  function localeResolver(i18nService) { return i18nService.setLocale(); }

  function config(
    $translate,
    $state,
    tmhDynamicLocale,
    I18N_PATTERN,
    I18N
  ) {
    tmhDynamicLocale.localeLocationPattern(I18N_PATTERN);
    $translate.useSanitizeValueStrategy('escape'); // TODO: change to 'sanitize'
    $translate.uniformLanguageTag('bcp47');
    $translate.useLocalStorage();
    $translate.addInterpolation('$translateMessageFormatInterpolation');
    $translate.registerAvailableLanguageKeys(I18N.locales);
    $translate.fallbackLanguage(I18N.default);
    $translate.determinePreferredLanguage();

    $state.state(STATE_I18N, {
      resolve: { locale: ['i18nService', localeResolver] },
      data: { module: module },
      abstract: true
    });
  }

  module.config([
    '$translateProvider',
    '$stateProvider',
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
