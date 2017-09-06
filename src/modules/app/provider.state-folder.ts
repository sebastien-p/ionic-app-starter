/**
 * @memberOf app
 */
namespace app {
  'use strict';

  const module: ng.IModule = angular.module('app');

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
    ) { }

    get folder(): Folder {
      return this.stateFolderServiceProvider.folder;
    }
  }

  class StateFolderServiceProvider
    implements ng.IServiceProvider, IStateFolderServiceProvider {
    constructor(
      STATE_FOLDERS: Folders
    ) {
      // Set the default folder.
      this.folder = STATE_FOLDERS.SMARTPHONE;
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
    'STATE_FOLDERS',
    StateFolderServiceProvider
  ]);
}
