'use strict';

angular.module('employeeEdit').component('employeeEdit', {
  templateUrl: 'employee-create/employee-create.template.html',
  controller: [
    '$scope',
    '$routeParams',
    '$window',
    'employeeService',
    function EmployeeEditController(
      $scope,
      $routeParams,
      $window,
      employeeService,
    ) {
      $scope.status = {
        isLoading: false,
        isSuccess: false,
        showInfo: false,
      };

      employeeService
        .getEmployeeById($routeParams.employeeid)
        .then((employee) => {
          $scope.employee = employee;
        });

      function onSuccess() {
        $scope.status.isSuccess = true;
        $scope.status.isLoading = false;
      }

      function onFailure() {
        $scope.status.isSuccess = false;
        $scope.status.isLoading = false;
      }

      function onSubmit() {
        $scope.status.isLoading = true;
        $scope.status.showInfo = true;
      }

      $scope.createEmployee = function() {
        const { fullname, department } = $scope.employee;
        const { employeeid } = $routeParams;
        onSubmit();

        employeeService
          .updateEmployeeById({ employeeid, fullname, department })
          .then(
            (response) => {
              if (response.result === 'success') {
                onSuccess();
                return;
              }
              onFailure();
            },
            (error) => {
              onFailure();
              console.log(error);
            },
          );
      };

      $scope.goBack = function() {
        $window.location.href = '/#!/';
      };
    },
  ],
});
