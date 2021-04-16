'use strict';

angular.module('employeeCreate').controller('employeeCreate', [
  '$scope',
  '$controller',
  'employeeService',
  function ($scope, $controller, employeeService) {
    angular.extend(this, $controller('base', { $scope }));
    $scope.employee = { fullname: '', department: '' };

    function createEmployee() {
      const { fullname, department } = $scope.employee;
      this.onSubmit();

      employeeService.createEmployee({ fullname, department }).then(
        (response) => {
          if (response.result === 'success') {
            $scope.employee = { fullname: '', department: '' };
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

    $scope.createEmployee = createEmployee.bind(this);
  },
]);
