/**
 * @memberOf app.states
 */
(function (module) {
  'use strict';

  function StatesService($q, httpService, i18nService) {
    var service = this;

    service.getMovie = function (id) {
      return $q.resolve({ id: id, title: 'Movie', description: 'Awesome' });
    };

    service.search = function (query) {
      return $q.resolve(
        [{ title: query, id: 1 }, { title: query, id: 2 }]
      );
    };

    /**
     * Resolve states data.
     * @return {Promise} Passing an object.
     */
    service.resolveStatesData = function () {
      return httpService.all({
        // Force loading of dynamic locale using the determined one.
        locale: i18nService.setLocale()
      });
    };
  }

  module.service('statesService', [
    '$q',
    'httpService',
    'i18nService',
    StatesService
  ]);

}(angular.module('app.states')));
