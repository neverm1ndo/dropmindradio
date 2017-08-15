'use strict';
angular.module('dropmind').controller('dropCtrl', ['$scope', dropCtrl]);
function dropCtrl($scope, trackDuration) {
  $scope.trackDuration = trackDuration;
};
