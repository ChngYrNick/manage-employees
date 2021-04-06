'use strict';

angular.module('core.employee').factory('employeeService', [
  '$q',
  'metacom',
  ($q, metacom) => ({
    getEmployees() {
      return $q((resolve, reject) => {
        metacom.api.employee
          .getEmployees()
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => reject(err));
      });
    },
    getEmployeeById(id) {
      return $q((resolve, reject) => {
        metacom.api.employee
          .getEmployeeById({ employeeid: id })
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => reject(err));
      });
    },
    createEmployee(data) {
      return $q((resolve, reject) => {
        metacom.api.employee
          .createEmployee(data)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => reject(err));
      });
    },
    updateEmployeeById(data) {
      return $q((resolve, reject) => {
        metacom.api.employee
          .updateEmployeeById(data)
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => reject(err));
      });
    },
    deleteEmployeeById(id) {
      return $q((resolve, reject) => {
        metacom.api.employee
          .deleteEmployeeById({ employeeid: id })
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => reject(err));
      });
    },
  }),
]);
