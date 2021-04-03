async ({ employeeid, fullname, department }) => {
  const newData = {};
  if (fullname) Object.assign(newData, { fullname });
  if (department) Object.assign(newData, { department });
  await domain.db.update('Employee', newData, { employeeid });
  return { result: 'success' };
};
