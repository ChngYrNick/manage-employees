'use strict';

angular.module('employeeCreate').component('employeeCreate', {
  templateUrl: 'employee-create/employee-create.template.html',
  controller: [
    '$scope',
    '$window',
    '$controller',
    'employeeService',
    function($scope, $window, $controller, employeeService) {
      angular.extend(this, $controller('base', { $scope }));

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
          },
        );
      }

      $scope.createEmployee = createEmployee.bind(this);

      $scope.goBack = function() {
        $window.location.href = '/#!/';
      };
    },
  ],
});
