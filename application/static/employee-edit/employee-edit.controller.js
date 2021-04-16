'use strict';

angular.module('employeeEdit').controller('employeeEdit', [
  '$scope',
  '$routeParams',
  '$controller',
  'employeeService',
  function ($scope, $routeParams, $controller, employeeService) {
    angular.extend(this, $controller('base', { $scope }));
    $scope.employee = { fullname: '', department: '' };

    employeeService.getEmployeeById(parseInt($routeParams.employeeid, 10)).then(
      (employee) => {
        $scope.employee = employee;
        this.onFailure();
      },
      (error) => {
        this.onFailure(error);
      }
    );

    function editEmployee() {
      const { fullname, department } = $scope.employee;
      const { employeeid } = $routeParams;
      this.onSubmit();

      employeeService
        .updateEmployeeById({
          employeeid: parseInt(employeeid, 10),
          fullname,
          department,
        })
        .then(
          (response) => {
            if (response.result === 'success') {
              this.onSuccess();
              return;
            }
            this.onFailure();
          },
          (error) => {
            this.onFailure(error);
          }
        );
    }

    $scope.editEmployee = editEmployee.bind(this);
  },
]);
