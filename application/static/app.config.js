'use strict';

angular.module('app').config([
  '$routeProvider',
  function config($routeProvider) {
    const when = $routeProvider.when;

    $routeProvider.when = function(path, route) {
      route.resolve || (route.resolve = {});
      angular.extend(route.resolve, {
        init: [
          'initService',
          function(initService) {
            return initService.promise;
          },
        ],
      });

      return when.call($routeProvider, path, route);
    };

    $routeProvider
      .when('/', {
        template: '<employee-table></employee-table>',
      })
      .when('/sign-in', {
        template: '<sign-in></sign-in>',
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
        templateUrl: '/partials/not-found.template.html',
      });
  },
]);
