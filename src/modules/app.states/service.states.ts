/**
 * @memberOf app.states
 */
namespace app.states {
  'use strict';

  const module: ng.IModule = angular.module('app.states');

  export interface IStateDataResolve {
    locale: string;
  }

  export interface IStatesService {
    /**
     * Resolve states data.
     * @return {ng.IPromise} Passing an object.
     */
    resolveStatesData(): ng.IPromise<IStateDataResolve>;
  }

  class StatesService implements IStatesService {
    constructor(
      private $q: ng.IQService,
      private i18nService: i18n.II18nService
    ) { }

    resolveStatesData(): ng.IPromise<IStateDataResolve> {
      return this.$q.all<IStateDataResolve>({
        // Force loading of dynamic locale using the determined one.
        locale: this.i18nService.setLocale()
      });
    }
  }

  module.service('statesService', [
    '$q',
    'i18nService',
    StatesService
  ]);
}
