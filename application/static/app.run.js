'use strict';

angular.module('app').run([
  '$rootScope',
  '$location',
  'metacom',
  'authService',
  'initService',
  ($rootScope, $location, metacom, authService, initService) => {
    metacom.load('auth', 'employee').then(() => {
      $rootScope.$on('$routeChangeStart', () => {
        const token = localStorage.getItem('metarhia.session.token');
        if (!token) {
          $location.path('/sign-in');
        }
      });

      const token = localStorage.getItem('metarhia.session.token');
      if (!token) {
        $location.path('/sign-in');
        initService.defer.resolve();
        return;
      }
      authService.restore(token).then((status) => {
        if (status !== 'logged') {
          $location.path('/sign-in');
        }
        initService.defer.resolve();
      });
    });
  },
]);
