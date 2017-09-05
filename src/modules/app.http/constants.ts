/**
 * @memberOf app.http
 */
namespace app.http {
  'use strict';

  const module: ng.IModule = angular.module('app.http');

  export interface IHttpEvents {
    ERROR: string;
  }

  /**
   * Events triggered from http service.
   * @constant
   * @type {Object}
   */
  const HTTP_EVENTS: IHttpEvents = {
    ERROR: 'events.http.error'
  };

  module.constant('HTTP_EVENTS', HTTP_EVENTS);

}
