/**
 * @memberOf app.states
 */
namespace app.states {
  'use strict';

  const module: ng.IModule = angular.module('app.states');

  export interface IPopupService {
    /**
     * Check whether a popup is open.
     * @return {boolean}
     */
    isOpen(): boolean;

    /**
     * Close open popup if any.
     * @param {boolean} [resolve=false] - Resolve the popup promise.
     */
    close(resolve?: boolean): void;

    /**
     * Open a popup view.
     * @param {ng.IModule} [module] - Angular module.
     * @param {string} [url] - Template file url.
     *   Optionnal only if module is passed, then relative to the given module.
     *   If no module is passed, must be an absolute path to the template.
     * @param {Object} [scope] - Popup scope.
     * @param {string|string[]} [classes] - Extra CSS class names.
     * @return {Promise}
     */
    open<T extends ng.IScope>(
      module?: ng.IModule,
      url?: string,
      scope?: T | any,
      classes?: string | string[]
    ): ng.IPromise<any>;
  }

  interface ICustomIonicPopupPromise extends ionic.popup.IonicPopupPromise {
    off(): () => void;
  }

  class PopupService implements IPopupService {
    constructor(
      private $q: ng.IQService,
      private $rootScope: ng.IRootScopeService,
      private $translate: ng.translate.ITranslateService,
      private $ionicPopup: ionic.popup.IonicPopupService,
      private templateUtils: any // TODO: type this
    ) { }

    private deferred: ng.IDeferred<any> = null;
    private popupPromise: ICustomIonicPopupPromise = null;

    isOpen(): boolean {
      return !!this.popupPromise && !!this.deferred;
    }

    close(resolve: boolean = false): void {
      if (!this.isOpen()) { return; }
      if (resolve === true) { this.deferred.resolve(); }
      else { this.deferred.reject(); }
      this.popupPromise.off();
      this.popupPromise.close();
      this.popupPromise = this.deferred = null;
    }

    open<T extends ng.IScope>(
      module?: angular.IModule,
      url?: string,
      scope?: T | any,
      classes?: string | string[]
    ): angular.IPromise<any> {
      if (module) { url = this.templateUtils.getUrlFromModule(module, url); }

      // TODO: remove 2 next lines ? (we ask for a valid scope in arg)
      if (scope instanceof this.$rootScope.constructor) { scope = scope.$new(); }
      else { scope = _.extend(this.$rootScope.$new(), scope); }

      this.close();
      this.popupPromise = _.extend(
        this.$ionicPopup.show({
          cssClass: _.isArray(classes) ? classes.join(' ') : classes,
          title: scope.title || scope.APP_NAME,
          templateUrl: url,
          scope: scope,
          buttons: [{
            text: this.$translate.instant('STATES.POPUP.CLOSE'),
            type: 'popup-buttons__close',
            onTap: ($event) => {
              $event.preventDefault();
              this.close();
            }
          }]
        }),
        // Close popups when changing state successfully.
        { off: this.$rootScope.$on('$stateChangeSuccess', () => this.close) }
      );
      this.deferred = this.$q.defer();
      // Handle Android hardware back button.
      this.popupPromise.then(() => this.close).catch(this.deferred.reject);
      return this.deferred.promise;
    }
  }

  module.service('popupService', [
    '$q',
    '$rootScope',
    '$translate',
    '$ionicPopup',
    'templateUtils',
    PopupService
  ]);
}
