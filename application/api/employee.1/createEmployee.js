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
    if (department.length < 2) {
      return new Error('Department must be at least 2 characters long');
    }
    if (fullname.split(' ').length < 2) {
      return new Error('Full name must contain at least 2 words');
    }

    await domain.db.insert('Employee', { fullname, department });
    return { result: 'success' };
  },
});
