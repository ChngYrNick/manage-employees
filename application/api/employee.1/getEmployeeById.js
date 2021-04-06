async ({ employeeid }) => {
  const data = await domain.db.select('Employee', ['*'], { employeeid });
  return { result: 'success', data: data[0] };
};
