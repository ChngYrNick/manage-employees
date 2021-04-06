'use strict';

angular.module('employeeDetail').component('employeeDetail', {
  templateUrl: 'employee-detail/employee-detail.template.html',
  controller: [
    '$scope',
    '$routeParams',
    '$window',
    'employeeService',
    function EmployeeDetailController(
      $scope,
      $routeParams,
      $window,
      employeeService,
    ) {
      employeeService
        .getEmployeeById($routeParams.employeeid)
        .then((employee) => {
          $scope.employee = employee;
        });

      $scope.goBack = function() {
        $window.location.href = '/#!/';
      };
    },
  ],
});
