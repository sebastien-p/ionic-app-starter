/**
 * @memberOf app.i18n
 */
(function (module) {
  'use strict';

  function temperatureFilter($locale, $filter) {
    var number = $filter('number');
    var temperature = $locale.NUMBER_FORMATS.TEMPERATURE;

    /**
     * Append the current locale temperature symbol to a given value.
     * @param {*} value
     * @return {String}
     */
    return _.extend(function (value) {
      return number(value, 0) + ' ' + temperature.SYMBOL;
    }, { $stateful: true });
  }

  module.filter('temperature', ['$locale', '$filter', temperatureFilter]);

}(angular.module('app.i18n')));
