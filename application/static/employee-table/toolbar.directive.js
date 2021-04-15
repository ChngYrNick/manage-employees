'use strict';

angular.module('employeeTable').directive('toolbar', () => ({
  templateUrl: 'employee-table/toolbar.template.html',
  scope: {
    search: '=search',
    departments: '=departments',
  },
  restrict: 'E',
  transclude: true,
}));
