'use strict';

angular.module('employeeTable').directive('toolbar', () => ({
  templateUrl: 'employee-table/toolbar.template.html',
  scope: {
    search: '=search',
    departments: '=departments',
    onAdd: '&onAdd',
  },
  restrict: 'E',
  transclude: true,
}));
