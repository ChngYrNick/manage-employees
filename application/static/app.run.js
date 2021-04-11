'use strict';

angular.module('app').run([
  'metacom',
  'authService',
  'initService',
  (metacom, authService, initService) => {
    metacom.load('auth', 'employee').then(() => {
      const token = localStorage.getItem('metarhia.session.token');
      if (token) {
        authService.restore(token).then((status) => {
          if (status !== 'logged') {
            authService
              .signIn({ login: 'marcus', password: 'marcus' })
              .then((token) => {
                localStorage.setItem('metarhia.session.token', token);
                initService.defer.resolve();
              });
          }
          initService.defer.resolve();
        });
      }
      authService
        .signIn({ login: 'marcus', password: 'marcus' })
        .then((token) => {
          localStorage.setItem('metarhia.session.token', token);
          initService.defer.resolve();
        });
    });
  },
]);
