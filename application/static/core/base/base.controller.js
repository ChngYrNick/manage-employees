'use strict';

angular.module('core.base').controller('base', [
  '$scope',
  '$location',
  function ($scope, $location) {
    $scope.status = {
      isLoading: false,
      isSuccess: false,
      showInfo: false,
    };

    $scope.goBack = function () {
      $location.path('/');
    };

    this.onSuccess = function () {
      $scope.status.isSuccess = true;
      $scope.status.isLoading = false;
    };

    this.onFailure = function (error) {
      if (error) {
        $scope.error = `Error: ${error.message}`;
        console.error(error);
      }
      $scope.status.isSuccess = false;
      $scope.status.isLoading = false;
    };

    this.onSubmit = function () {
      $scope.error = '';
      $scope.status.isLoading = true;
      $scope.status.showInfo = true;
    };
  },
]);
