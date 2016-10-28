'use strict';

exports.config = {
  allScriptsTimeout: 30 * 1000,
  rootElement: '[ng-app]',
  directConnect: true,
  capabilities: { browserName: 'firefox' }, // FIXME: use chrome when the driver works...
  onPrepare: function () {
    browser.addMockModule('noAnimations', function () {
      function noAnimations($animate) { $animate.enabled(false); }
      angular.module('noAnimations', []).run(['$animate', noAnimations]);
    });
  }
};
