'use strict';

angular.module('app').run([
  '$q',
  'metacom',
  'authService',
  ($q, metacom, authService) => {
    $q(() => {
      metacom.load('auth', 'employee');
    }).then(() => {
      const token = localStorage.getItem('metarhia.session.token');
      if (token) {
        authService.restore(token).then((status) => {
          if (status !== 'logged') {
            authService
              .signIn({ login: 'marcus', password: 'marcus' })
              .then((token) => {
                localStorage.setItem('metarhia.session.token', token);
              });
          }
        });
      }
      authService
        .signIn({ login: 'marcus', password: 'marcus' })
        .then((token) => {
          localStorage.setItem('metarhia.session.token', token);
        });
    });
  },
]);
