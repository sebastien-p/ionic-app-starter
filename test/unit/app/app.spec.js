'use strict';

describe('[app]', function () {
  var $rootScope;
  var APP_VERSION;
  var APP_NAME;

  beforeEach(module('app'));

  beforeEach(inject(function (
    _$rootScope_,
    _APP_VERSION_,
    _APP_NAME_
  ) {
    $rootScope = _$rootScope_;
    APP_VERSION = _APP_VERSION_;
    APP_NAME = _APP_NAME_;
  }));

  describe('$rootScope', function () {
    it('should set the app version on the root scope', function () {
      expect(_.isString($rootScope.APP_VERSION)).toBe(true);
      expect($rootScope.APP_VERSION).toBeTruthy();
      expect($rootScope.APP_VERSION).toBe(APP_VERSION);
    });

    it('should set the app name on the root scope', function () {
      expect(_.isString($rootScope.APP_NAME)).toBe(true);
      expect($rootScope.APP_NAME).toBeTruthy();
      expect($rootScope.APP_NAME).toBe(APP_NAME);
    });
  });
});
