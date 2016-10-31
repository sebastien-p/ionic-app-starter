'use strict';

describe('[app.state] stateFolderProvider', function () {
  var stateFolderProvider;
  var stateFolder;

  beforeEach(module('app.state', function (
    _stateFolderProvider_
  ) {
    stateFolderProvider = _stateFolderProvider_;
  }));

  beforeEach(inject(function (
    _stateFolder_
  ) {
    stateFolder = _stateFolder_;
  }));

  it('should have a FOLDERS property', function () {
    expect(_.isPlainObject(stateFolderProvider.FOLDERS)).toBe(true);
    expect(stateFolderProvider.FOLDERS.SMARTPHONE).toBe('smartphone');
    expect(stateFolderProvider.FOLDERS.TABLET).toBe('tablet');
    expect(stateFolderProvider.FOLDERS.WEB).toBe('web');
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
      stateFolderProvider.setFolder(FOLDERS.WEB);
      expect(stateFolderProvider.getFolder()).toBe(FOLDERS.WEB);
    });
  });

  describe('stateFolder', function () {
    it('should expose its provider getFolder method', function () {
      expect(stateFolder.getFolder).toBe(stateFolderProvider.getFolder);
    });
  });
});
