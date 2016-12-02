/**
 * @memberOf app.states.home
 */
(function (module) {
  'use strict';

  function HomeController($scope,statesService) {
    var controller = this;

    $scope.search = { query: 'auto', results: []};//init ,texte default
//2）调用函数 去 服务

    controller.search = function (){//after  cliclk button
       $scope.results = statesService.search('Jaw?!2048').then(function (results){//when not ,show in Chorme info(alaways 2048?)
       $scope.search.results = results;
      });
    };

    //$scope.results = statesService.search('Jaw?!2048').then(function (results){
    //  $scope.search.results = results;
    //});

    //debugge zuihouyewujiaguoxianshi(synchone)
  }

  module.controller('homeController', [
    '$scope',
    'statesService',//2）->3)pug网页如何显示

    HomeController
  ]);

}(angular.module('app.states.home')));
/*
ion-header.bar-subheader Header
  ion-content.has-subheader
    ion-list
      ion-item(ng-if="search.results.length < 1")
        | no nono
      ion-item.item-icon-right(
        ng-repeat="results in search.results",
        ui-state="STATE_DETATILS"
      )
        | {{ result.titre}}
        i.icon.ion-ios-arrow-forward
*/
