'use strict';

describe('[app.auth] authInterceptor', function () {
  beforeEach(module('app.auth'));

  var $rootScope;
  var $http;
  var $httpBackend;
  var authInterceptor;
  var AUTH_EVENTS;

  beforeEach(inject(function (
    _$rootScope_,
    _$http_,
    _$httpBackend_,
    _authInterceptor_,
    _AUTH_EVENTS_
  ) {
    $rootScope = _$rootScope_;
    $http = _$http_;
    $httpBackend = _$httpBackend_;
    authInterceptor = _authInterceptor_;
    AUTH_EVENTS = _AUTH_EVENTS_;
  }));

  describe('authInterceptor.request', function () {
    it('should be a function', function () {
      expect(_.isFunction(authInterceptor.request)).toBe(true);
    });

    describe('interception logic', function () {
      var request;

      beforeEach(function () {
        $httpBackend.whenGET('https://fake').respond(200, '');
        $httpBackend.whenGET('http://fake').respond(200, '');
        $httpBackend.whenGET('//fake').respond(200, '');
        $httpBackend.whenGET('/fake').respond(200, '');
        spyOn(authInterceptor, 'request').and.callThrough();

        request = function (url) {
          return authInterceptor.request({
            headers: { Authorization: 'whatever' },
            url: url
          });
        };
      });

      it('should have been called', function () {
        $http.get('https://fake');
        $http.get('http://fake');
        $http.get('//fake');
        $http.get('/fake');
        $httpBackend.flush();
        expect(authInterceptor.request.calls.count()).toBe(4);
      });

      it('should return an object', function () {
        expect(_.isPlainObject(request('https://fake'))).toBe(true);
        expect(_.isPlainObject(request('http://fake'))).toBe(true);
        expect(_.isPlainObject(request('//fake'))).toBe(true);
        expect(_.isPlainObject(request('/fake'))).toBe(true);
      });

      it('should delete the Authorization header', function () {
        expect(request('https://fake')).not.toEqual(jasmine.objectContaining({
          headers: { Authorization: 'whatever' }
        }));
        expect(request('http://fake')).not.toEqual(jasmine.objectContaining({
          headers: { Authorization: 'whatever' }
        }));
        expect(request('//fake')).not.toEqual(jasmine.objectContaining({
          headers: { Authorization: 'whatever' }
        }));
      });

      it('should not delete the Authorization header', function () {
        expect(request('/fake')).toEqual(jasmine.objectContaining({
          headers: { Authorization: 'whatever' }
        }));
      });
    });
  });

  describe('authInterceptor.responseError', function () {
    it('should be a function', function () {
      expect(_.isFunction(authInterceptor.responseError)).toBe(true);
    });

    describe('interception logic', function () {
      var backend;

      beforeEach(function () {
        backend = $httpBackend.whenGET('/fake').respond(401, '');
        spyOn(authInterceptor, 'responseError').and.callThrough();
        spyOn($rootScope, '$broadcast').and.callThrough();
      });

      it('should have been called', function () {
        $http.get('/fake');
        $httpBackend.flush();

        expect(authInterceptor.responseError).toHaveBeenCalled();
      });

      it('return a promise', function () {
        $http.get('/fake');
        $httpBackend.flush();

        var mostRecent = authInterceptor.responseError.calls.mostRecent();
        expect(_.isFunction(mostRecent.returnValue.then)).toBe(true);
      });

      it('should broadcast an event on 401', function () {
        $http.get('/fake');
        $httpBackend.flush();

        expect($rootScope.$broadcast).toHaveBeenCalledWith(
          AUTH_EVENTS.UNAUTHORIZED_REQUEST,
          jasmine.any(Object)
        );
      });

      it('shouldnt broadcast an event on 404', function () {
        backend.respond(404, '');
        $http.get('/fake');
        $httpBackend.flush();

        expect($rootScope.$broadcast).not.toHaveBeenCalledWith(
          AUTH_EVENTS.UNAUTHORIZED_REQUEST,
          jasmine.any(Object)
        );
      });
    });
  });
});
