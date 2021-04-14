({
  validateFullName(fullname) {
    if (fullname.split(' ').length < 2) {
      throw new Error('Full name must contain at least 2 words');
    }
  },
  validateDepartment(department) {
    if (department.length < 2) {
      throw new Error('Department must be at least 2 characters long');
    }
  },
  validateEmployee({ fullname, department }) {
    if (fullname) this.validateFullName(fullname);
    if (department) this.validateDepartment(department);
  },
});
