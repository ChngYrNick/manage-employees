'use strict';

angular.module('app').config([
  '$routeProvider',
  function config($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<employee-table></employee-table>',
      })
      .when('/:employeeid', {
        template: '<employee-detail></employee-detail>',
      })
      .otherwise({
        template: '<not-found></not-found>',
      });
  },
]);
