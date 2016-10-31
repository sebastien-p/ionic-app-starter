/**
 * @memberOf app.i18n
 */
(function (module) {
  'use strict';

  function LanguagePickerController(i18nService) {
    var controller = this;

    if (!controller.key) { controller.key = 'language'; }
    if (!controller.onChange) { controller.onChange = _.noop; }

    /**
     * Available locales.
     * @type {Array}
     */
    controller.LOCALES = i18nService.getLocales();

    /**
     * Set the application local in sync with this component.
     * Call the `onChange` callback when successful, passing the new locale.
     */
    controller.syncLocale = function () {
      var locale = controller.settings[controller.key];
      i18nService.setLocale(locale).then(function () {
        controller.onChange({ locale: locale });
      });
    };
  }

  module.component('languagePicker', {
    controller: ['i18nService', LanguagePickerController],
    bindings: { settings: '=', key: '@?', onChange: '&?' },
    templateUrl: ['templateUtils', function (templateUtils) {
      var template = 'smartphone/language-picker';
      return templateUtils.getUrlFromModule(module, template);
    }]
  });

}(angular.module('app.i18n')));
