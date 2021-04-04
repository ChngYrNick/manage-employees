'use strict';

angular.module('manageEmployeeApp').controller('appController', [
  '$scope',
  '$window',
  'Metacom',
  (scope, win, Metacom) => {
    scope.onInit = async () => {
      const protocol = location.protocol === 'http:' ? 'ws' : 'wss';
      win.metacom = Metacom.create(`${protocol}://${location.host}/api`);
      win.api = metacom.api;
      await metacom.load('auth', 'employee');
      const token = localStorage.getItem('metarhia.session.token');
      let logged = false;
      if (token) {
        const res = await api.auth.restore({ token });
        logged = res.status === 'logged';
      }
      if (!logged) {
        const res = await api.auth.signin({
          login: 'marcus',
          password: 'marcus',
        });
        if (res.token) {
          localStorage.setItem('metarhia.session.token', res.token);
        }
      }
    };
  },
]);
