;(function() {
  'use strict';
  angular.module('dropmind').controller('sidebarCtrl', ['$scope', '$http', sidebarCtrl]);
   function sidebarCtrl($scope, $http, $event) {
     $scope.sidebarCont = function() {
       if ($scope.sidebarControl == true) {
         $scope.sidebarControl = false;
       } else {
         $scope.sidebarControl = true;
       };
     };
     $scope.themes = [
        {theme: 'Drum&Bass'},
        {theme: 'Retrowave (COMING SOON)'},
        {theme: 'Witch House (COMING SOON)'}
     ];
     if ($scope.showVisualizer == false ) {
       console.log('Sjsjs');
     } else {
       console.log('123');
     };
    //  $scope.chooseTheme = function(e) {
    //    window.location
    //  };
   };
 })();
