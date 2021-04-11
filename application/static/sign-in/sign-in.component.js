'use strict';

angular.module('signIn').component('signIn', {
  templateUrl: 'sign-in/sign-in.template.html',
  controller: [
    '$scope',
    '$window',
    'authService',
    function signInController($scope, $window, authService) {
      $scope.onSignIn = function() {
        const { login, password } = $scope.form;

        authService.signIn({ login, password }).then((token) => {
          localStorage.setItem('metarhia.session.token', token);
          $scope.form = { login: '', password: '' };
          $window.location.href = '/#!/';
        });
      };
    },
  ],
});
