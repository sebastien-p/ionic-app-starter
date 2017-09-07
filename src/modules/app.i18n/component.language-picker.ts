/**
 * @memberOf app.i18n
 */
namespace app.i18n {
  'use strict';

  const module: ng.IModule = angular.module('app.i18n');

  class LanguagePickerController implements ng.IController {
    constructor(
      private i18nService: II18nService
    ) { }

    /**
     * Available locales.
     */
    LOCALES: string[];

    /**
     * Should have a property storing the language.
     */
    settings: IMap<any>;

    /**
     * @optional
     * Name of the property storing the language.
     */
    key: string = 'language';

    /**
     * @optional
     * Name of the property storing the language.
     */
    onChange: IFunction<void> = _.noop;

    $onInit(): void {
      this.LOCALES = this.i18nService.getLocales();
    }

    /**
     * Set the application local in sync with this component.
     * Call the `onChange` callback when successful, passing the new locale.
     */
    syncLocale(): void {
      const locale: string = this.settings[this.key];
      this.i18nService.setLocale(locale)
        .then(() => this.onChange({ locale }));
    }
  }

  function templateResolver(
    templateUtils: any // TODO: typings
  ): string {
    const template: string = 'smartphone/language-picker';
    return templateUtils.getUrlFromModule(module, template);
  }

  module.component('languagePicker', {
    bindings: {
      settings: '<',
      key: '@?',
      onChange: '&?'
    },
    controller: [
      'i18nService',
      LanguagePickerController
    ],
    templateUrl: [
      'templateUtils',
      templateResolver
    ]
  });
}
