'use strict';

angular.module('app').config([
  '$routeProvider',
  function config($routeProvider) {
    $routeProvider
      .when('/', {
        template: '<employee-table></employee-table>',
      })
      .when('/employee/:employeeid', {
        template: '<employee-detail></employee-detail>',
      })
      .when('/edit/:employeeid', {
        template: '<employee-edit></employee-edit>',
      })
      .when('/create/', {
        template: '<employee-create></employee-create>',
      })
      .otherwise({
        template: '<not-found></not-found>',
      });
  },
]);
