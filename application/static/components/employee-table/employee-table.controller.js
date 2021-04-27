'use strict';

angular.module('employeeTable').controller('employeeTable', [
  '$scope',
  '$location',
  '$controller',
  'employeeService',
  'modalService',
  function ($scope, $location, $controller, employeeService, modalService) {
    angular.extend(this, $controller('base', { $scope }));

    this.reloadData = function () {
      this.onSubmit();
      employeeService.getEmployees().then((employees) => {
        this.onSuccess();
        $scope.employees = employees;
        $scope.departments = employees
          .map((employee) => employee.department)
          .filter((x, i, a) => a.indexOf(x) === i);

        $scope.departments.unshift('');
      });
    };

    this.reloadData();

    function onDelete(id) {
      function onConfirm(id) {
        modalService.close('modal-confirm');

        employeeService
          .deleteEmployeeById(parseInt(id, 10))
          .then((response) => {
            if (response.result === 'success') {
              this.reloadData();
            }
          });
      }

      $scope.confirmDelete = onConfirm.bind(this, id);

      modalService.open('modal-confirm');
    }

    $scope.onDelete = onDelete.bind(this);

    $scope.closeModal = function (id) {
      modalService.close(id);
    };

    $scope.onEmployee = function (employeeid) {
      $location.path(`/employee/${employeeid}`);
    };

    $scope.onAdd = function () {
      $location.path('/create');
    };

    $scope.onEdit = function (employeeid) {
      $location.path(`/edit/${employeeid}`);
    };
  },
]);
