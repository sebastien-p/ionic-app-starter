/**
 * @memberOf app.state
 */
(function (module) {
  'use strict';

  function PopupService(
    $q,
    $rootScope,
    $translate,
    $ionicPopup,
    templateUtils
  ) {
    var service = this;
    var deferred = null;
    var open = null;

    function onClose($event) {
      $event.preventDefault();
      service.close();
    }

    /**
     * Check whether a popup is open.
     * @return {Boolean}
     */
    service.isOpen = function () { return !!open && !!deferred; };

    /**
     * Close open popup if any.
     * @param {Boolean} [resolve=false] - Resolve the popup promise.
     */
    service.close = function (resolve) {
      if (!service.isOpen()) { return; }
      if (resolve === true) { deferred.resolve(); }
      else { deferred.reject(); }
      open.off();
      open.close();
      open = deferred = null;
    };

    /**
     * Open a popup view.
     * @param {Object} [module] - Angular module.
     * @param {String} [url] - Template file url.
     *   Optionnal only if module is passed, then relative to the given module.
     *   If no module is passed, must be an absolute path to the template.
     * @param {Object} [scope] - Popup scope.
     * @param {String|Array} [classes] - Extra CSS class names.
     * @return {Promise}
     */
    service.open = function (module, url, scope, classes) {
      if (module) { url = templateUtils.getUrlFromModule(module, url); }
      if (scope instanceof $rootScope.constructor) { scope = scope.$new(); }
      else { scope = _.extend($rootScope.$new(), scope); }

      service.close();
      open = $ionicPopup.show({
        cssClass: _.isArray(classes) ? classes.join(' ') : classes,
        title: scope.title || scope.APP_NAME,
        templateUrl: url,
        scope: scope,
        buttons: [{
          text: $translate.instant('STATE.POPUP.CLOSE'),
          type: 'popup-buttons__close',
          onTap: onClose
        }]
      });
      deferred = $q.defer();
      // Close popups when changing state successfully.
      // Do not resolve popup promises.
      open.off = $rootScope.$on('$stateChangeSuccess', service.close);
      // Handle Android hardware back button.
      open.then(service.close).catch(deferred.reject);
      return deferred.promise;
    };
  }

  module.service('popupService', [
    '$q',
    '$rootScope',
    '$translate',
    '$ionicPopup',
    'templateUtils',
    PopupService
  ]);

}(angular.module('app.state')));
