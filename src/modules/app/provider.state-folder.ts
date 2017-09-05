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

  export interface IStateFolderService {
    /**
     * The currently used folder.
     */
    folder: Folder;
  }

  export type IStateFolderServiceProvider = IStateFolderService;

  class StateFolderService implements IStateFolderService {
    constructor(
      private stateFolderServiceProvider: StateFolderServiceProvider
    ) {}

    get folder(): Folder {
      return this.stateFolderServiceProvider.folder;
    }
  }

  class StateFolderServiceProvider
    implements ng.IServiceProvider, IStateFolderServiceProvider {
    constructor() {
      // Set the default folder.
      this.folder = Folder.SMARTPHONE;
    }

    private current: Folder;

    set folder(folder: Folder) {
      this.current = folder;
    }

    get folder(): Folder {
      return this.current;
    }

    $get: ng.Injectable<IFunction<StateFolderService>> = [
      () => new StateFolderService(this)
    ];
  }

  module.provider('stateFolderService', [
    StateFolderServiceProvider
  ]);
}
