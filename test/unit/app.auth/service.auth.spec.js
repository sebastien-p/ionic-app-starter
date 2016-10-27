'use strict';

describe('[app.auth] authService', function () {
  beforeEach(module('app.auth'));

  var $q;
  var $httpParamSerializer;
  var $rootScope;
  var $timeout;
  var $auth;
  var $state;
  var $ionicHistory;
  var $httpBackend;
  var authService;
  var LOGIN_URL;
  var AUTH_EVENTS;

  beforeEach(inject(function (
    _$q_,
    _$httpParamSerializer_,
    _$rootScope_,
    _$timeout_,
    _$auth_,
    _$state_,
    _$ionicHistory_,
    _$httpBackend_,
    _authService_,
    _API_SERVER_URL_,
    _AUTH_EVENTS_
  ) {
    $q = _$q_;
    $httpParamSerializer = _$httpParamSerializer_;
    $rootScope = _$rootScope_;
    $timeout = _$timeout_;
    $auth = _$auth_;
    $state = _$state_;
    $ionicHistory = _$ionicHistory_;
    $httpBackend = _$httpBackend_;
    authService = _authService_;
    LOGIN_URL = _API_SERVER_URL_ + 'oauth/token';
    AUTH_EVENTS = _AUTH_EVENTS_;
  }));

  beforeEach(function () {
    spyOn($rootScope, '$broadcast').and.callThrough();
  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('authService.login', function () { // TODO: check set msisdn in cache
    var credentials;
    var data;

    beforeEach(function () {
      credentials = {
        username: '0836656565',
        password: 'papanoel'
      };
      // eslint-disable-next-line camelcase
      data = _.defaults({ grant_type: 'password' }, credentials);
      $httpBackend.whenPOST(LOGIN_URL).respond(200, '');
    });

    it('should be a function', function () {
      expect(_.isFunction(authService.login)).toBe(true);
    });

    it('should call satellizer', function () {
      spyOn($auth, 'login').and.returnValue($q.resolve());

      authService.login(credentials);
      expect($auth.login).toHaveBeenCalledWith(
        null,
        jasmine.objectContaining({
          skipAuthorization: true,
          data: data,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic Y2xpZW50aWQ6c2VjcmV0'
          }
        })
      );
    });

    it('should reach the backend', function () {
      authService.login(credentials);
      $httpBackend.expectPOST(LOGIN_URL, $httpParamSerializer(data));
      $httpBackend.flush();
    });

    it('should return a promise', function () {
      var promise = authService.login(credentials);
      $httpBackend.flush();
      expect(_.isFunction(promise.then)).toBe(true);
    });

    it('should broadcast an event on success', function () {
      authService.login(credentials);
      $httpBackend.flush();
      expect($rootScope.$broadcast)
        .toHaveBeenCalledWith(AUTH_EVENTS.USER_SIGNED_IN, { firstTime: false });
    });

    it('should set the firstTime event property to true', function () {
      authService.login(credentials, true);
      $httpBackend.flush();
      expect($rootScope.$broadcast)
        .toHaveBeenCalledWith(AUTH_EVENTS.USER_SIGNED_IN, { firstTime: true });
    });
  });

  describe('authService.isAuthenticated', function () { // TODO: check value
    it('should be a function', function () {
      expect(_.isFunction(authService.isAuthenticated)).toBe(true);
    });

    it('should call satellizer and return a boolean', function () {
      spyOn($auth, 'isAuthenticated').and.callThrough();
      var boolean = authService.isAuthenticated();

      expect($auth.isAuthenticated).toHaveBeenCalled();
      expect(_.isBoolean(boolean)).toBe(true);
    });
  });

  describe('authService.logout', function () {
    it('should be a function', function () {
      expect(_.isFunction(authService.logout)).toBe(true);
    });

    it('should call satellizer and return a promise', function () {
      spyOn($auth, 'logout').and.callThrough();
      var promise = authService.logout();

      expect($auth.logout).toHaveBeenCalled();
      expect(_.isFunction(promise.then)).toBe(true);
    });

    it('should broadcast an event on success', function () {
      authService.logout();
      $rootScope.$apply();

      expect($rootScope.$broadcast)
        .toHaveBeenCalledWith(AUTH_EVENTS.USER_SIGNED_OUT);
    });
  });

  describe('authService.setNextViewOptions', function () {
    beforeEach(function () {
      spyOn($ionicHistory, 'nextViewOptions');
    });

    it('should be a function', function () {
      expect(_.isFunction(authService.setNextViewOptions)).toBe(true);
    });

    it('should not call nextViewOptions if navigating to the current state', function () {
      spyOn($state, 'is').and.returnValue(true);
      authService.setNextViewOptions('a-state');
      expect($ionicHistory.nextViewOptions).not.toHaveBeenCalled();
    });

    it('should not call nextViewOptions passing optionnal params', function () {
      authService.setNextViewOptions('a-state');
      expect($ionicHistory.nextViewOptions)
        .toHaveBeenCalledWith({ disableAnimate: true, historyRoot: true });
      authService.setNextViewOptions(
        'a-state',
        { historyRoot: false, disableBack: true }
      );
      expect($ionicHistory.nextViewOptions).toHaveBeenCalledWith({
        disableAnimate: true,
        historyRoot: false,
        disableBack: true
      });
    });
  });

  describe('authService.redirectTo', function () {
    beforeEach(function () {
      spyOn(authService, 'setNextViewOptions');
      spyOn($state, 'go').and.returnValue($q.resolve());
      spyOn($ionicHistory, 'clearHistory');
      spyOn($ionicHistory, 'clearCache').and.returnValue($q.resolve());
    });

    it('should be a function', function () {
      expect(_.isFunction(authService.redirectTo)).toBe(true);
    });

    it('should call setNextViewOptions with given state name', function () {
      authService.redirectTo('a-state');
      expect(authService.setNextViewOptions).toHaveBeenCalledWith('a-state');
    });

    it('should call $state.go with given state name & params', function () {
      authService.redirectTo('a-state');
      expect($state.go).toHaveBeenCalledWith(
        'a-state',
        undefined,
        jasmine.objectContaining({ location: 'replace' })
      );

      var params = { param: true };
      authService.redirectTo('another-state', params);
      expect($state.go).toHaveBeenCalledWith(
        'another-state',
        params,
        jasmine.objectContaining({ location: 'replace' })
      );
    });

    it('should return a promise', function () {
      var promise = authService.redirectTo('a-state');
      expect(_.isFunction(promise.then)).toBe(true);
    });

    it('should clear both Ionic view history and cache on success', function () {
      authService.redirectTo('a-state');
      $rootScope.$apply();
      $timeout.flush();
      expect($ionicHistory.clearHistory).toHaveBeenCalled();
      expect($ionicHistory.clearCache).toHaveBeenCalled();
    });
  });

  describe('authService.getMSISDN', function () { // TODO: check msisdn in cache
    it('should be a function', function () {
      expect(_.isFunction(authService.getMSISDN)).toBe(true);
    });
  });
});
