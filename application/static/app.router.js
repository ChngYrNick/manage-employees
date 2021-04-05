'use strict';

angular.module('manageEmployeeApp').run([
  '$window',
  '$q',
  'Metacom',
  'authService',
  ($window, $q, Metacom, authService) => {
    const protocol = location.protocol === 'http:' ? 'ws' : 'wss';
    $window.metacom = Metacom.create(`${protocol}://${location.host}/api`);
    $window.api = metacom.api;

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
