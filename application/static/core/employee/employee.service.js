'use strict';

angular.module('core.employee').factory('employeeService', [
  '$q',
  ($q) => ({
    getEmployees() {
      return $q((resolve, reject) => {
        api.employee
          .getEmployees()
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => reject(err));
      });
    },
    getEmployeeById(id) {
      return $q((resolve, reject) => {
        api.employee
          .getEmployeeById({ employeeid: id })
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => reject(err));
      });
    },
    createEmployee(data) {
      return $q((resolve, reject) => {
        api.employee
          .createEmployee(data)
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => reject(err));
      });
    },
    updateEmployeeById(data) {
      return $q((resolve, reject) => {
        api.employee
          .updateEmployeeById(data)
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => reject(err));
      });
    },
    deleteEmployeeById(id) {
      return $q((resolve, reject) => {
        api.employee
          .deleteEmployeeById({ employeeid: id })
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => reject(err));
      });
    },
  }),
]);
