({
  caption: 'Update employee by id',
  description: 'Update employee record and then save all changes to database',
  access: 'logged',
  parameters: {
    employeeid: 'number',
    fullname: 'string',
    department: 'string',
  },
  method: async ({ employeeid, fullname, department }) => {
    if (!employeeid) {
      return new Error('No id provided');
    }
    if (!fullname && !department) {
      return new Error('Has to be at least one field provided');
    }
    try {
      domain.employee.validate.validateEmployee({ fullname, department });
    } catch (error) {
      return error;
    }

    const result = await api.employee.getEmployeeById({ employeeid });
    if (result instanceof Error) {
      return result;
    }

    const newData = {};
    if (fullname) Object.assign(newData, { fullname });
    if (department) Object.assign(newData, { department });
    await domain.db.update('Employee', newData, { employeeid });
    return { result: 'success' };
  },
});
