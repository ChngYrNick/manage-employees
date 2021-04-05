'use strict';

angular.module('employeeTable').component('employeeTable', {
  templateUrl: 'employee-table/employee-table.template.html',
  controller: [
    '$scope',
    'employeeService',
    function EmployeeTableController($scope, employeeService) {
      employeeService.getEmployees().then((employees) => {
        $scope.employees = employees;
        $scope.departments = employees
          .map((employee) => employee.department)
          .filter((x, i, a) => a.indexOf(x) === i);
      });
    },
  ],
});
