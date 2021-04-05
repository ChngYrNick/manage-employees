'use strict';

angular.module('core.auth').factory('authService', [
  '$q',
  'metacom',
  ($q, metacom) => ({
    signIn(data) {
      return $q((resolve, reject) => {
        metacom.api.auth
          .signIn(data)
          .then((response) => {
            resolve(response.token);
          })
          .catch((err) => reject(err));
      });
    },
    restore(token) {
      return $q((resolve, reject) => {
        metacom.api.auth
          .restore({ token })
          .then((response) => {
            resolve(response.status);
          })
          .catch((err) => reject(err));
      });
    },
  }),
]);
