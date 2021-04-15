'use strict';

angular.module('core.employee').factory('employeeService', [
  '$q',
  'metacom',
  ($q, metacom) => ({
    getEmployees() {
      const deffered = $q.defer();

      metacom.api.employee
        .getEmployees()
        .then((response) => {
          deffered.resolve(response.data);
        })
        .catch((err) => deffered.reject(err));

      return deffered.promise;
    },
    getEmployeeById(id) {
      const deffered = $q.defer();

      metacom.api.employee
        .getEmployeeById({ employeeid: id })
        .then((response) => {
          deffered.resolve(response.data);
        })
        .catch((err) => deffered.reject(err));

      return deffered.promise;
    },
    createEmployee(data) {
      const deffered = $q.defer();

      metacom.api.employee
        .createEmployee(data)
        .then((response) => {
          deffered.resolve(response);
        })
        .catch((err) => deffered.reject(err));

      return deffered.promise;
    },
    updateEmployeeById(data) {
      const deffered = $q.defer();

      metacom.api.employee
        .updateEmployeeById(data)
        .then((response) => {
          deffered.resolve(response);
        })
        .catch((err) => deffered.reject(err));

      return deffered.promise;
    },
    deleteEmployeeById(id) {
      const deffered = $q.defer();

      metacom.api.employee
        .deleteEmployeeById({ employeeid: id })
        .then((response) => {
          deffered.resolve(response);
        })
        .catch((err) => deffered.reject(err));

      return deffered.promise;
    },
  }),
]);
