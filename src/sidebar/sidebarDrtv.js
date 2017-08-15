;(function() {
  'use strict';
  angular.module('dropmind').directive('sidebar', sidebarDrtv);

  function sidebarDrtv() {
    return {
      scope: {
        state: '=?',
        cell: '='
      },
      controller: 'sidebarCtrl',
      templateUrl: 'sidebar/sidebarTmpl.html'
    };
  };
})();
