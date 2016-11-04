'use strict';

describe('[app.native]', function () {
  var $rootScope;
  var cordovaUtils;

  beforeEach(module('app.native'));

  beforeEach(inject(function (
    _$rootScope_,
    _cordovaUtils_
  ) {
    $rootScope = _$rootScope_;
    cordovaUtils = _cordovaUtils_;
  }));

  describe('$rootScope', function () {
    it('should set `IS_CORDOVA` on the root scope', function () {
      expect(_.isBoolean($rootScope.IS_CORDOVA)).toBe(true);
      expect($rootScope.IS_CORDOVA).toBe(cordovaUtils.isCordova());
    });
  });
});
