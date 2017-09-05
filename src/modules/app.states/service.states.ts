/**
 * @memberOf app.states
 */
namespace app.states {
  'use strict';

  const module: ng.IModule = angular.module('app.states');

  export interface IStatesService {
    /**
     * Resolve states data.
     * @return {ng.IPromise} Passing an object.
     */
    resolveStatesData(): ng.IPromise<any>; // TODO: typedef
  }

  class StatesService implements IStatesService {
    constructor(
      private $q: ng.IQService,
      private i18nService: any // TODO: typedef
    ) { }

    resolveStatesData(): ng.IPromise<any> { // TODO: typedef
      return this.$q.all({
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
