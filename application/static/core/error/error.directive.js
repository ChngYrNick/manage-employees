'use strict';

angular.module('core.error').directive('error', () => ({
  templateUrl: 'partials/error.template.html',
  scope: {
    error: '=error',
  },
}));
