/**
 * @memberOf app.i18n
 */
namespace app.i18n {
  'use strict';

  const module: ng.IModule = angular.module('app.i18n');

  export interface ILocales {
    LOCALES: string[];
    DEFAULT: string;
  }

  export interface ITemperature {
    SYMBOL: string;
  }

  export interface IUnits {
    TEMPERATURE: ITemperature;
  }

  export type ILocalizedUnits = IMap<IUnits>;

  /**
   * Additional i18n units.
   * @constant
   * @type {ILocalizedUnits}
   */
  const I18N_UNITS: ILocalizedUnits = {
    'EN-US': { TEMPERATURE: { SYMBOL: '°F' } },
    'FR-FR': { TEMPERATURE: { SYMBOL: '°C' } }
  };

  module.constant('I18N_UNITS', I18N_UNITS);
}
