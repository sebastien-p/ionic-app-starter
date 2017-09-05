/**
 * @memberOf app.i18n
 */
namespace app.i18n {
  'use strict';

  const module: ng.IModule = angular.module('app.i18n');

  export interface ITimezone {
    abbr: string;
    name: string;
    offset: string;
  }

  export interface II18nService {
    /**
     * Get a list of the application supported locales.
     * @return {string[]}
     */
    getLocales(): string[];
    /**
     * Get the application default locale.
     * @return {string}
     */
    getDefaultLocale(): string;
    /**
     * Get a copy of the unit constants object for a given locale.
     * @param {string} [locale] - The determined locale if not specified.
     *                            The default one if not supported.
     * @return {IUnits}
     */
    getUnits(locale?: string): IUnits;
    /**
     * Check whether a given locale is supported or not.
     * @param {string} locale
     * @return {boolean}
     */
    isLocaleSupported(locale: string): boolean;
    /**
     * Get the application current locale.
     * @return {string}
     */
    getLocale(): string;
    /**
     * Get the application current locale, default one if not supported.
     * @param {string} [locale] - The determined locale if not specified.
     * @return {string}
     */
    getLocaleOrDefault(locale?: string): string;
    /**
     * Get the application-wide default timezone.
     * @return {ITimezone}
     */
    getDefaultTimezone(): ITimezone;
    /**
     * Add units/other contants to the given angular $locale object.
     * @param {ng.ILocaleService} $locale - The `$locale` object to mutate.
     * @return {ng.ILocaleService} - The mutated $locale object.
     */
    addCustomUnitsAndFormats($locale: ng.ILocaleService): ng.ILocaleService;
    /**
     * Set the application current locale.
     * @param {string} [locale] - The determined locale if not specified.
     *                            The default one if not supported.
     * @return {ng.IPromise<string>} - Passing the current locale.
     */
    setLocale(locale?: string): ng.IPromise<string>;
    /**
     * Set the application-wide default timezone (using moment.js).
     * @param {string} [name] - The timezone name like 'Europe/Paris'.
     */
    setDefaultTimezone(name?: string): void;
    /**
     * Normalize the given locale to match the BCP47 format.
     * @param {string} locale
     * @return {string}
     */
    toBCP47(locale: string): string;
    /**
     * Get the currency symbol for the current locale.
     * @return {string}
     */
    getCurrencySymbol(): string;
  }

  class I18nService implements II18nService {
    constructor(
      private $document: ng.IDocumentService,
      private $locale: ng.ILocaleService,
      private $translate: ng.translate.ITranslateService,
      private dynamicLocale: ng.dynamicLocale.tmhDynamicLocaleService,
      private I18N_UNITS: ILocalizedUnits,
      private I18N: ILocales
    ) {
      this.setDefaultTimezone();
    }

    private timezone: ITimezone = {
      abbr: null,
      name: null,
      offset: null
    };

    getLocales(): string[] {
      return _.cloneDeep(this.I18N.LOCALES);
    }

    getDefaultLocale(): string {
      return this.I18N.DEFAULT;
    }

    getUnits(locale?: string): IUnits {
      locale = this.getLocaleOrDefault(this.toBCP47(locale));
      return _.cloneDeep(this.I18N_UNITS[locale.toUpperCase()]);
    }

    isLocaleSupported(locale: string): boolean {
      return _.contains(this.I18N.LOCALES, locale);
    }

    getLocale(): string {
      return this.$translate.use();
    }

    getLocaleOrDefault(locale?: string): string {
      if (!locale) { locale = this.getLocale(); }
      const isSupported: boolean = this.isLocaleSupported(locale);
      return isSupported ? locale : this.getDefaultLocale();
    }

    getDefaultTimezone(): ITimezone {
      return _.cloneDeep(this.timezone);
    }

    addCustomUnitsAndFormats($locale: ng.ILocaleService): ng.ILocaleService {
      const UNITS: IUnits = this.getUnits($locale.id);
      if (UNITS) {
        (<any>$locale).NUMBER_FORMATS.TEMPERATURE = UNITS.TEMPERATURE;
      }
      return $locale;
    }

    setLocale(locale?: string): ng.IPromise<string> {
      locale = this.getLocaleOrDefault(locale);
      return this.dynamicLocale.set(locale.toLowerCase())
        .then(($locale: any): ng.IPromise<string> => {
          this.$document.children().attr('lang', locale);
          this.addCustomUnitsAndFormats($locale);
          moment.locale((<ng.ILocaleService>$locale).id);
          return this.$translate.use(locale);
        });
    }

    setDefaultTimezone(name?: string): void {
      if (!name) { name = moment.tz.guess(); }
      if (name === this.timezone.name) { return; }
      moment.tz.setDefault(name);
      const now: moment.Moment = moment();
      this.timezone.name = name;
      this.timezone.abbr = now.format('z');
      this.timezone.offset = now.format('ZZ');
    }

    toBCP47(locale: string): string {
      if (!_.isString(locale)) { locale = ''; }
      const parts: string[] = locale.split(/[-_]+/);
      if (parts.length < 2 || !parts[1]) { parts[1] = parts[0]; }
      return parts[0].toLowerCase() + '-' + parts[1].toUpperCase();
    }

    getCurrencySymbol(): string {
      return this.$locale.NUMBER_FORMATS.CURRENCY_SYM;
    }
  }

  module.service('i18nService', [
    '$document',
    '$locale',
    '$translate',
    'tmhDynamicLocale',
    'I18N_UNITS',
    'I18N',
    I18nService
  ]);
}
