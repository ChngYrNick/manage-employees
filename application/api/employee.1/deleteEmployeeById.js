async ({ employeeid }) => {
  await domain.db.delete('Employee', { employeeid });
  return { result: 'success' };
};
