/**
 * @memberOf app
 */
namespace app {
  'use strict';

  const module: ng.IModule = angular.module('app');

  /**
   * Available folders.
   */
  export enum Folder {
    SMARTPHONE = 'smartphone',
    TABLET = 'tablet',
    WEB = 'web'
  }

  export type Folders = typeof Folder;

  module.constant('STATE_FOLDERS', Folder);
}
