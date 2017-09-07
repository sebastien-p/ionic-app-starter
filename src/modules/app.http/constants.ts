/**
 * @memberOf app.http
 */
namespace app.http {
  'use strict';

  const module: ng.IModule = angular.module('app.http');

  /**
   * Events triggered from http service.
   * @constant
   * @type {Object}
   */
  export enum HttpEvent {
    ERROR = 'events.http.error'
  }

  export type HttpEvents = typeof HttpEvent;

  module.constant('HTTP_EVENTS', HttpEvent);
}
