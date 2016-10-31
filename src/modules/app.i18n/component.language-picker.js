/**
 * @memberOf app.i18n
 */
(function (module) {
  'use strict';

  function LanguagePickerController(i18nService) {
    var controller = this;

    if (!controller.key) { controller.key = 'language'; }

    /**
     * Available locales.
     * @type {Array}
     */
    controller.LOCALES = i18nService.getLocales();

    /**
     * Set the application local in sync with this component.
     */
    controller.syncLocale = function () {
      i18nService.setLocale(controller.settings[controller.key]);
    };
  }

  module.component('languagePicker', {
    bindings: { settings: '=', key: '@?' },
    controller: ['i18nService', LanguagePickerController],
    templateUrl: ['templateUtils', function (templateUtils) {
      var template = 'smartphone/language-picker';
      return templateUtils.getUrlFromModule(module, template);
    }]
  });

}(angular.module('app.i18n')));
