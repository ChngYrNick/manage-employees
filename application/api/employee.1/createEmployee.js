({
  caption: 'Create employee',
  description: 'Store employee record to database',
  access: 'logged',
  parameters: {
    fullname: 'string',
    department: 'string',
  },
  method: async ({ fullname, department }) => {
    if (!fullname || !department) {
      return new Error('Not all fields provided');
    }

    try {
      domain.employee.validate.validateEmployee({ fullname, department });
    } catch (error) {
      return error;
    }

    await domain.db.insert('Employee', { fullname, department });
    return { result: 'success' };
  },
});
