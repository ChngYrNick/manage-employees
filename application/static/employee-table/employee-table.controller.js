'use strict';

angular.module('employeeTable').controller('employeeTable', [
  '$scope',
  '$location',
  'employeeService',
  'modalService',
  function ($scope, $location, employeeService, modalService) {
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

    $scope.onDelete = function (id) {
      function onConfirm(id) {
        modalService.close('modal-confirm');

        employeeService
          .deleteEmployeeById(parseInt(id, 10))
          .then((response) => {
            if (response.result === 'success') {
              reloadData();
            }
          });
      }

      $scope.confirmDelete = onConfirm.bind(null, id);

      modalService.open('modal-confirm');
    };

    $scope.closeModal = function (id) {
      modalService.close(id);
    };

    $scope.goToEmployeeDetail = function (employeeid) {
      $location.path(`/employee/${employeeid}`);
    };

    $scope.goToEmployeeCreate = function () {
      $location.path('/create');
    };

    $scope.onEdit = function (employeeid) {
      $location.path(`/edit/${employeeid}`);
    };
  },
]);
