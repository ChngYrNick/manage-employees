'use strict';

angular.
  module('app').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/', {
          template: '<employee-table></employee-table>'
        }).
        otherwise('/');
    }
  ]);
