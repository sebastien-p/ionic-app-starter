/**
 * @memberOf app
 */
(function (module) {
  'use strict';

  var type = _.bind(Object.prototype.toString.call, Object.prototype.toString);

  function AppService($window) {
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
  }

  module.service('appService', ['$window', AppService]);

}(angular.module('app')));
