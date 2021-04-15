'use strict';

angular.module('core.auth').factory('authService', [
  '$q',
  'metacom',
  ($q, metacom) => ({
    signIn(data) {
      const deffered = $q.defer();

      metacom.api.auth
        .signin(data)
        .then((response) => {
          deffered.resolve(response);
        })
        .catch((err) => deffered.reject(err));

      return deffered.promise;
    },
    restore(token) {
      const deffered = $q.defer();

      metacom.api.auth
        .restore({ token })
        .then((response) => {
          deffered.resolve(response.status);
        })
        .catch((err) => deffered.reject(err));

      return deffered.promise;
    },
  }),
]);
