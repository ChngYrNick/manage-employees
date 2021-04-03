async ({ fullname, department }) => {
  await domain.db.insert('Employee', { fullname, department });
  return { result: 'success' };
};
