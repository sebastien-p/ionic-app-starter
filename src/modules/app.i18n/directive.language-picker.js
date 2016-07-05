/**
 * @memberOf app.i18n
 */
(function (module) {
  'use strict';

  function languagePicker(templateUtils, i18nService) {
    var TEMPLATE_URL = 'smartphone/language-picker';
    var LOCALES = i18nService.getLocales();

    function preLink(scope) { scope.LOCALES = LOCALES; }

    return {
      templateUrl: templateUtils.getUrlFromModule(module, TEMPLATE_URL),
      scope: { account: '=' },
      link: { pre: preLink },
      restrict: 'E'
    };
  }

  module.directive('languagePicker', [
    'templateUtils',
    'i18nService',
    languagePicker
  ]);

}(angular.module('app.i18n')));
