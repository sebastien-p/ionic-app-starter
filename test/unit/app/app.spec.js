'use strict';

describe('[app]', function () {
  var $rootScope;
  var stateFolderProvider;
  var stateFolder;
  var APP_NAME;

  beforeEach(module('app', function (
    _stateFolderProvider_
  ) {
    stateFolderProvider = _stateFolderProvider_;
  }));

  beforeEach(inject(function (
    _$rootScope_,
    _stateFolder_,
    _APP_NAME_
  ) {
    $rootScope = _$rootScope_;
    stateFolder = _stateFolder_;
    APP_NAME = _APP_NAME_;
  }));

  it('should set the app name on the root scope', function () {
    expect(_.isString($rootScope.APP_NAME)).toBe(true);
    expect($rootScope.APP_NAME).toBeTruthy();
    expect($rootScope.APP_NAME).toBe(APP_NAME);
  });

  describe('stateFolderProvider', function () {
    it('should have a FOLDERS property', function () {
      expect(_.isPlainObject(stateFolderProvider.FOLDERS)).toBe(true);
      expect(stateFolderProvider.FOLDERS.SMARTPHONE).toBe('smartphone');
      expect(stateFolderProvider.FOLDERS.TABLET).toBe('tablet');
    });

    describe('stateFolderProvider.getFolder', function () {
      it('should have a getFolder method', function () {
        expect(_.isFunction(stateFolderProvider.getFolder)).toBe(true);
      });

      it('should return the smartphone folder by default', function () {
        expect(stateFolderProvider.getFolder())
          .toBe(stateFolderProvider.FOLDERS.SMARTPHONE);
      });
    });

    describe('stateFolderProvider.setFolder', function () {
      it('should have a setFolder method', function () {
        expect(_.isFunction(stateFolderProvider.setFolder)).toBe(true);
      });

      it('should set the given folder', function () {
        var FOLDERS = stateFolderProvider.FOLDERS;
        stateFolderProvider.setFolder(FOLDERS.SMARTPHONE);
        expect(stateFolderProvider.getFolder()).toBe(FOLDERS.SMARTPHONE);
        stateFolderProvider.setFolder(FOLDERS.TABLET);
        expect(stateFolderProvider.getFolder()).toBe(FOLDERS.TABLET);
      });
    });
  });
});
