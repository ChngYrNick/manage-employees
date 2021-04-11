'use strict';

angular.module('employeeTable').component('employeeTable', {
  templateUrl: 'employee-table/employee-table.template.html',
  controller: [
    '$scope',
    '$window',
    'employeeService',
    'modalService',
    function EmployeeTableController(
      $scope,
      $window,
      employeeService,
      modalService,
    ) {
      function reloadData() {
        employeeService.getEmployees().then((employees) => {
          $scope.employees = employees;
          $scope.departments = employees
            .map((employee) => employee.department)
            .filter((x, i, a) => a.indexOf(x) === i);

          $scope.departments.unshift('');
        });
      }

      reloadData();

      $scope.onDelete = function(id) {
        function onConfirm(id) {
          modalService.close('modal-confirm');

          employeeService.deleteEmployeeById(id).then((response) => {
            if (response.result === 'success') {
              reloadData();
            }
          });
        }

        $scope.confirmDelete = onConfirm.bind(null, id);

        modalService.open('modal-confirm');
      };

      $scope.closeModal = function(id) {
        modalService.close(id);
      };

      $scope.goToEmployeeDetail = function(employeeid) {
        $window.location.href = `/#!/employee/${employeeid}`;
      };

      $scope.goToEmployeeCreate = function() {
        $window.location.href = '/#!/create';
      };
    },
  ],
});
