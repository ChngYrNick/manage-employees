'use strict';

angular.module('signIn').component('signIn', {
  templateUrl: 'sign-in/sign-in.template.html',
  controller: [
    '$scope',
    '$window',
    '$controller',
    'authService',
    function($scope, $window, $controller, authService) {
      angular.extend(this, $controller('base', { $scope }));

      function onSignIn() {
        const { login, password } = $scope.form;
        this.onSubmit();

        authService.signIn({ login, password }).then(
          (response) => {
            if (response.status === 'logged') {
              this.onSuccess();
              localStorage.setItem('metarhia.session.token', response.token);
              $scope.form = { login: '', password: '' };
              $window.location.href = '/#!/';
            }
            this.onFailure();
          },
          (error) => {
            this.onFailure(error);
          },
        );
      }

      $scope.onSignIn = onSignIn.bind(this);
    },
  ],
});
