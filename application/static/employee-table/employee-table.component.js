'use strict';

angular.module('employeeTable').component('employeeTable', {
  templateUrl: 'employee-table/employee-table.template.html',
  controller: [
    '$scope',
    '$window',
    'employeeService',
    function EmployeeTableController($scope, $window, employeeService) {
      employeeService.getEmployees().then((employees) => {
        $scope.employees = employees;
        $scope.departments = employees
          .map((employee) => employee.department)
          .filter((x, i, a) => a.indexOf(x) === i);
      });

      $scope.goToEmployeeDetail = function(employeeid) {
        $window.location.href = `/#!/${employeeid}`;
      };
    },
  ],
});
