'use strict';

angular.module('core.metacom').factory('MetacomError', () => {
  class MetacomError extends Error {
    constructor({ message, code }) {
      super(message);
      this.code = code;
    }
  }

  return MetacomError;
});
