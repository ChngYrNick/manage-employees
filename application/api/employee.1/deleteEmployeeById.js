({
  caption: 'Delete employee by id',
  description: 'Delete employee record frow database',
  access: 'logged',
  parameters: {
    employeeid: 'number',
  },
  method: async ({ employeeid }) => {
    if (!employeeid) {
      return new Error('No id provided');
    }

    await domain.db.delete('Employee', { employeeid });
    return { result: 'success' };
  },
});
