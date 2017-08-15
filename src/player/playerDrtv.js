;(function() {
  'use strict';
  angular.module('dropmind').directive('player', playerDrtv);

  function playerDrtv() {
    return {
      scope: {
        state: '=?',
        cell: '='
      },
      controller: 'playerCtrl',
      templateUrl: 'player/playerTmpl.html'
    };
  }
})();
