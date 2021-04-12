'use strict';

angular.module('employeeCreate').component('employeeCreate', {
  templateUrl: 'employee-create/employee-create.template.html',
  controller: [
    '$scope',
    '$window',
    'employeeService',
    function EmployeeCreateController($scope, $window, employeeService) {
      $scope.status = {
        isLoading: false,
        isSuccess: false,
        showInfo: false,
      };

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
        $scope.employee = { fullname: '', department: '' };
        onSubmit();

        employeeService.createEmployee({ fullname, department }).then(
          (response) => {
            if (response.result === 'success') {
              onSuccess();
              return;
            }
            onFailure();
          },
          (error) => {
            onFailure();
            console.error(error);
          },
        );
      };

      $scope.goBack = function() {
        $window.location.href = '/#!/';
      };
    },
  ],
});
