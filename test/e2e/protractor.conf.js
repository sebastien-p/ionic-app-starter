'use strict';

exports.config = {
  framework: 'jasmine2',
  allScriptsTimeout: 30 * 1000,
  capabilities: { browserName: 'chrome' },
  onPrepare: function () {
    browser.addMockModule('noAnimations', function () {
      function noAnimations($animate) { $animate.enabled(false); }
      angular.module('noAnimations', []).run(['$animate', noAnimations]);
    });
  }
};
