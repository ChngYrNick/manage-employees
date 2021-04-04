'use strict';

angular.
  module('manageEmployeeApp').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/', {
          template: '<employee-table></employee-table>'
        }).
        otherwise('/');
    }
  ]);
