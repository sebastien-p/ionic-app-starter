/**
 * @memberOf app.i18n
 */
(function (module) {
  'use strict';

  function I18nService(
    $document,
    $locale,
    $translate,
    dynamicLocale,
    I18N_UNITS,
    I18N
  ) {
    var service = this;

    var timezone = { abbr: null, name: null };

    /**
     * Get a list of the application supported locales.
     * @return {Array} - Array of strings.
     */
    service.getLocales = function () { return _.cloneDeep(I18N.locales); };

    /**
     * Get the application default locale.
     * @return {String}
     */
    service.getDefaultLocale = function () { return I18N.default; };

    /**
     * Get a copy of the unit constants object for a given locale.
     * @param {String} [locale] - The determined locale if not specified.
     *                            The default one if not supported.
     * @return {Object}
     */
    service.getUnits = function (locale) {
      locale = service.getLocaleOrDefault(service.toBCP47(locale));
      return _.cloneDeep(I18N_UNITS[locale.toUpperCase()]);
    };

    /**
     * Check whether a given locale is supported or not.
     * @param {String} locale
     * @return {Boolean}
     */
    service.isLocaleSupported = function (locale) {
      return _.contains(service.getLocales(), locale);
    };

    /**
     * Get the application current locale.
     * @return {String}
     */
    service.getLocale = function () { return $translate.use(); };

    /**
     * Get the application current locale, default one if not supported.
     * @param {String} [locale] - The determined locale if not specified.
     * @return {String}
     */
    service.getLocaleOrDefault = function (locale) {
      if (!locale) { locale = service.getLocale(); }
      var isSupported = service.isLocaleSupported(locale);
      return isSupported ? locale : service.getDefaultLocale();
    };

    /**
     * Get the application-wide default timezone.
     * @return {Object} - `{ name, abbr }`.
     */
    service.getDefaultTimezone = function () { return _.cloneDeep(timezone); };

    /**
     * Add units/other contants to the given angular $locale object.
     * @param {Object} $locale - The $locale object to mutate.
     * @return {Object} - The mutated $locale object.
     */
    service.addCustomUnitsAndStuff = function ($locale) {
      var UNITS = service.getUnits($locale.id);
      var DATE = $locale.DATETIME_FORMATS;
      DATE.wlWeather = 'EEEE ' + DATE.longDate + ' ' + DATE.shortTime;
      $locale.NUMBER_FORMATS.TEMPERATURE = UNITS.TEMPERATURE;
      return $locale;
    };

    /**
     * Set the application current locale.
     * @param {String} [locale] - The determined locale if not specified.
     *                            The default one if not supported.
     * @return {Promise} - Passing the current locale.
     */
    service.setLocale = function (locale) {
      locale = service.getLocaleOrDefault(locale);
      return dynamicLocale.set(locale.toLowerCase()).then(function ($locale) {
        moment.locale($locale.id);
        service.addCustomUnitsAndStuff($locale);
        return $translate.use(locale);
      }).then(function (locale) {
        $document.children().attr('lang', locale);
        return locale;
      });
    };

    /**
     * Set the application-wide default timezone (using moment.js).
     * @param {String} name - The timezone name like 'Europe/Paris'.
     */
    service.setDefaultTimezone = function (name) {
      if (!name) { name = moment.tz.guess(); }
      if (name === timezone.name) { return; }
      moment.tz.setDefault(name);
      timezone.abbr = moment().format('z');
      timezone.name = name;
    };

    /**
     * Normalize the given locale to match the BCP47 format.
     * @param {String} locale
     * @return {String}
     */
    service.toBCP47 = function (locale) {
      locale = (_.isString(locale) ? locale : '').split(/[-_]+/);
      if (locale.length < 2 || !locale[1]) { locale[1] = locale[0]; }
      return locale[0].toLowerCase() + '-' + locale[1].toUpperCase();
    };

    /**
     * Get the currency symbol for the current locale.
     * @return {String}
     */
    service.getCurrencySymbol = function () {
      return $locale.NUMBER_FORMATS.CURRENCY_SYM;
    };

    service.setDefaultTimezone();
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

}(angular.module('app.i18n')));
