/**
 * @memberOf app
 */
namespace app {
  'use strict';

  const module: ng.IModule = angular.module('app');

  export interface IMap<T> {
    [key: string]: T;
  }

  export interface IFunction<T> {
    (...args: any[]): T;
  }

  const toString: IFunction<string> = _.bind(
    Object.prototype.toString.call,
    Object.prototype.toString
  );

  export interface IAppService {
    /**
     * Scroll back to top of scroll views.
     */
    scrollToTop(): void;
    /**
     * Check if resolved data should be updated.
     * @param {TODO} resolved
     * @param {TODO} locals - Should be an Angular scope object.
     * @param {string} key - Name of resolved data to check for.
     * @return {boolean}
     */
    shouldUpdate(
      resolved: IMap<any>,
      locals: ng.IScope,
      key: string
    ): boolean;
  }

  class AppService implements IAppService {
    constructor(
      private $window: ng.IWindowService
    ) {}

    scrollToTop(): void { // FIXME: use $ionicScrollDelegate + decorator
      this.$window.scrollTo(0, 0);
    }

    shouldUpdate(
      resolved: IMap<any>,
      locals: ng.IScope,
      key: string
    ): boolean {
      if (!_.has(resolved, key) || !_.has(locals, key)) { return false; }
      resolved = resolved[key];
      locals = locals[key];
      return toString(resolved) === toString(locals) && resolved !== locals;
    }
  }

  module.service('appService', [
    '$window',
    AppService
  ]);
}
