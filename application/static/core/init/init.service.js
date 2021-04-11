'use strict';

angular.module('core.init').service('initService', [
  '$q',
  function($q) {
    const d = $q.defer();
    return {
      defer: d,
      promise: d.promise,
    };
  },
]);
