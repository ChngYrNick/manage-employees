'use strict';

angular.module('signIn').controller('signIn', [
  '$scope',
  '$location',
  '$controller',
  'authService',
  function ($scope, $location, $controller, authService) {
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
            $location.path('/');
          }
          this.onFailure();
        },
        (error) => {
          this.onFailure(error);
        }
      );
    }

    $scope.onSignIn = onSignIn.bind(this);
  },
]);
