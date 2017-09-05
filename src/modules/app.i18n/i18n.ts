/**
 * @module app.i18n
 */
namespace app.i18n {
  'use strict';

  const module: ng.IModule = angular.module('app.i18n', [
    'pascalprecht.translate',
    'tmh.dynamicLocale',
    'ngCookies',
    'app'
  ]);

  function config(
    $translateProvider: ng.translate.ITranslateProvider,
    tmhDynamicLocaleProvider: ng.dynamicLocale.tmhDynamicLocaleProvider,
    I18N: ILocales
  ): void {
    const pattern: string = 'lib/angular-i18n/angular-locale_{{ locale }}.js';
    tmhDynamicLocaleProvider.localeLocationPattern(pattern);
    $translateProvider.useSanitizeValueStrategy('escape');
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
    'I18N',
    config
  ]);
}
