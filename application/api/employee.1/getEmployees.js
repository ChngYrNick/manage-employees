async () => {
  const data = await domain.db.select('Employee');
  return { result: 'success', data };
};
