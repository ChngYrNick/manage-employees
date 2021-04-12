({
  caption: 'Get all employees',
  description: 'Return all employee records from the database',
  access: 'logged',
  method: async () => {
    const data = await domain.db.select('Employee');
    return { result: 'success', data };
  },
});
