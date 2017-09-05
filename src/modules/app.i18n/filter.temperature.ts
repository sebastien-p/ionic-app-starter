/**
 * @memberOf app.i18n
 */
namespace app.i18n {
  'use strict';

  const module: ng.IModule = angular.module('app.i18n');

  export interface ITemperatureFilter {
    (value: number | string): string;
    $stateful: boolean;
  }

  function temperatureFilterFactory(
    $locale: ng.ILocaleService,
    $filter: ng.IFilterService
  ): ITemperatureFilter {
    const numberFilter: ng.IFilterNumber = $filter('number');
    const temp: ITemperature = (<any>$locale).NUMBER_FORMATS.TEMPERATURE;

    /**
     * Append the current locale temperature symbol to a given value.
     * @param {number|string} value
     * @return {string}
     */
    return _.extend(function (value: number | string): string {
      return numberFilter(value, 0) + ' ' + temp.SYMBOL;
    }, { $stateful: true });
  }

  module.filter('temperature', [
    '$locale',
    '$filter',
    temperatureFilterFactory
  ]);
}
