/**
 * @memberOf app.http
 */
(function (module) {
  'use strict';

  /**
   * Events triggered from http service.
   * @constant
   * @type {Object}
   */
  var HTTP_EVENTS = {
    ERROR: 'event.http.error'
  };

  module.constant('HTTP_EVENTS', HTTP_EVENTS);

}(angular.module('app.http')));
