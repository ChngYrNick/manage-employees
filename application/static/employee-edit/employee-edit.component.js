'use strict';

angular.module('employeeEdit').component('employeeEdit', {
  templateUrl: 'employee-edit/employee-edit.template.html',
  controller: [
    '$scope',
    '$routeParams',
    '$window',
    '$controller',
    'employeeService',
    function($scope, $routeParams, $window, $controller, employeeService) {
      angular.extend(this, $controller('base', { $scope }));

      employeeService
        .getEmployeeById(parseInt($routeParams.employeeid, 10))
        .then(
          (employee) => {
            $scope.employee = employee;
          },
          (error) => {
            console.error(error);
            $scope.error = error;
          },
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
            },
          );
      }

      $scope.editEmployee = editEmployee.bind(this);

      $scope.goBack = function() {
        $window.location.href = '/#!/';
      };
    },
  ],
});
