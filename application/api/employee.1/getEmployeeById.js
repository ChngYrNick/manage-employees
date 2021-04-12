({
  caption: 'Get employee by id',
  description: 'Return employee record from the database',
  access: 'logged',
  parameters: {
    employeeid: 'number',
  },
  method: async ({ employeeid }) => {
    if (!employeeid) {
      return new Error('No id provided');
    }
    const data = await domain.db.select('Employee', ['*'], { employeeid });
    if (data.length === 0) {
      return new Error(`No employee with id: ${employeeid}`);
    }
    return { result: 'success', data: data[0] };
  },
});
