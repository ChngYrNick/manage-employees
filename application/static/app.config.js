'use strict';

angular.
  module('manageEmployeeApp').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/', {
          template: '<hello-world></hello-world>'
        }).
        otherwise('/');
    }
  ]);
