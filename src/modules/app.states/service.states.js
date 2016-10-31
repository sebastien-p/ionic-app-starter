/**
 * @memberOf app.states
 */
(function (module) {
  'use strict';

  var type = _.bind(Object.prototype.toString.call, Object.prototype.toString);

  function StatesService($window, httpService, i18nService) {
    var service = this;

    /**
     * Scroll back to top of scroll views.
     */
    service.scrollToTop = function () { $window.scrollTo(0, 0); }; // FIXME: use $ionicScrollDelegate + decorator

    /**
     * Check if resolved data should be updated.
     * @param {Object} resolved
     * @param {Object} locals - Should be an Angular scope object.
     * @param {String} key - Name of resolved data to check for.
     * @return {Boolean}
     */
    service.shouldUpdateResolved = function (resolved, locals, key) {
      if (!_.has(resolved, key) || !_.has(locals, key)) { return false; }
      resolved = resolved[key];
      locals = locals[key];
      return type(resolved) === type(locals) && resolved !== locals;
    };

    /**
     * Resolve states data.
     * @return {Promise} Passing an object.
     */
    service.resolveStatesData = function () {
      return httpService.all({
        // Force loading of dynamic locale using the determined one.
        locale: i18nService.setLocale()
      });
    };
  }

  module.service('statesService', [
    '$window',
    'httpService',
    'i18nService',
    StatesService
  ]);

}(angular.module('app.states')));
