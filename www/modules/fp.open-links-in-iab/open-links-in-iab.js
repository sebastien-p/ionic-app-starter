/**
 * @module fp.open-links-in-iab
 */
(function (module) {
  'use strict';

  /**
   * The fpOpenLinksInIab directive.
   * @function openLinksInIab
   * @param {Object} $cordovaEmailComposer - ngCordova's $cordovaEmailComposer.
   * @param {Object} $cordovaInAppBrowser - ngCordova's $cordovaInAppBrowser.
   * @param {Object} cordovaUtils - Some Cordova utilities.
   * @return {Object}
   */
  function openLinksInIab(
    $cordovaEmailComposer,
    $cordovaInAppBrowser,
    cordovaUtils
  ) {

    /**
     * Open a link via the In App Browser plugin.
     * @private
     * @function open
     * @param {String} target - A valid In App Browser target value.
     */
    function open(target) {
      $cordovaInAppBrowser.open(encodeURI(this.href), target);
    }

    /**
     * Open a link via the Email Composer plugin.
     * @private
     * @function compose
     */
    function compose() {
      $cordovaEmailComposer.open({ to: this.href.split(':').pop() });
    }

    /**
     * Prevent the default browser behavior.
     * @private
     * @function noop
     * @param {Object} event - A DOM click event object.
     */
    var noop = function (event) { event.preventDefault(); };

    /**
     * Open a link in the In App Browser with system as the target.
     * @private
     * @function system
     */
    var system = _.partial(open, '_system');

    /**
     * Open a link in the In App Browser with blank as the target.
     * @private
     * @function system
     */
    var blank = _.partial(open, '_blank');

    /**
     * Open a link via the Email Composer plugin or the system browser.
     * @private
     * @function mail
     * @param {Object} event - A DOM click event object.
     */
    function mail(event) {
      var promise = $cordovaEmailComposer.isAvailable();
      promise.then(_.bind(compose, this, event));
      promise.catch(_.bind(system, this, event));
    }

    var events = {
      'a[href^="http://"],a[href^="https://"]': blank,
      'a[href^="mailto:"]': mail,
      'a[href^="tel:"]': system
    };

    return {
      restrict: 'A',
      scope: false,
      link: function (scope, element) {
        cordovaUtils.callWhenReady(function () {
          /*eslint new-cap:0, max-nested-callbacks:0 */
          var gator = Gator(element[0]);
          gator.on('click', _.keys(events).join(','), noop);
          _.each(events, function (handler, selector) {
            gator.on('click', selector, handler);
          });
          element.on('$destroy', function () { gator.off(); });
        });
      }
    };
  }

  module.directive(_.camelCase(module.name), [
    '$cordovaEmailComposer',
    '$cordovaInAppBrowser',
    'cordovaUtils',
    openLinksInIab
  ]);

}(angular.module('fp.open-links-in-iab', ['fp.utils'])));
