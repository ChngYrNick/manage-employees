'use strict';

angular.module('app').config([
  '$routeProvider',
  function config($routeProvider) {
    const when = $routeProvider.when;

    $routeProvider.when = function (path, route) {
      route.resolve || (route.resolve = {});
      angular.extend(route.resolve, {
        init: [
          'initService',
          function (initService) {
            return initService.promise;
          },
        ],
      });

      return when.call($routeProvider, path, route);
    };

    $routeProvider
      .when('/', {
        templateUrl: 'components/employee-table/employee-table.template.html',
        controller: 'employeeTable',
      })
      .when('/sign-in', {
        templateUrl: 'components/sign-in/sign-in.template.html',
        controller: 'signIn',
      })
      .when('/employee/:employeeid', {
        templateUrl: 'components/employee-detail/employee-detail.template.html',
        controller: 'employeeDetail',
      })
      .when('/edit/:employeeid', {
        templateUrl: 'components/employee-edit/employee-edit.template.html',
        controller: 'employeeEdit',
      })
      .when('/create/', {
        templateUrl: 'components/employee-create/employee-create.template.html',
        controller: 'employeeCreate',
      })
      .otherwise({
        templateUrl: '/partials/not-found.template.html',
      });
  },
]);
