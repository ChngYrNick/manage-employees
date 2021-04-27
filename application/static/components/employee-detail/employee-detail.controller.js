'use strict';

angular.module('employeeDetail').controller('employeeDetail', [
  '$scope',
  '$routeParams',
  '$controller',
  'employeeService',
  function ($scope, $routeParams, $controller, employeeService) {
    angular.extend(this, $controller('base', { $scope }));

    employeeService.getEmployeeById(parseInt($routeParams.employeeid, 10)).then(
      (employee) => {
        $scope.employee = employee;
      },
      (error) => {
        $scope.error = error;
        this.onFailure(error);
      }
    );
  },
]);
