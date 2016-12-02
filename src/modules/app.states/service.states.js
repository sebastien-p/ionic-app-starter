/**
 * @memberOf app.states
 */
(function (module) {
  'use strict';

  function StatesService($q,httpService, i18nService) {
    var service = this;
//service ->funvtion httpSer,....1）在其中写函数

    service.search =function(query){
      console.log(query);//montrez
      return $q.resolve([
      {titre: 'Jaws?!',id :1},
      {titre: 'Jaw2', id :2}
      ]);//list javascript->table   {},{}
      //http.enqute->promese
    };

    service.getMovie = function (id){//id from url !
      return $q.resolve(
        { titre: 'Jaw2', id: id}
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
    'httpService',
    'i18nService',
    StatesService
  ]);

}(angular.module('app.states')));
