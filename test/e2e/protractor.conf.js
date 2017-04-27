'use strict';

exports.config = {
  capabilities: { browserName: 'chrome' },
  allScriptsTimeout: 30 * 1000,
  rootElement: '[ng-app]',
  directConnect: true,
  onPrepare: function () {
    browser.addMockModule('noAnimations', function () {
      function noAnimations($animate) { $animate.enabled(false); }
      angular.module('noAnimations', []).run(['$animate', noAnimations]);
    });
  }
};
