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
        .getEmployeeById(parseInt($routeParams.employeeid, 10))
        .then(
          (employee) => {
            $scope.employee = employee;
          },
          (error) => {
            $scope.error = error;
          },
        );

      $scope.goBack = function() {
        $window.location.href = '/#!/';
      };
    },
  ],
});
