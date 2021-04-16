({
  access: 'public',
  method: async ({ login, password }) => {
    if (!login || !password) {
      return new Error('Not all fields provided');
    }
    const user = await application.auth.getUser(login);
    const hash = user ? user.password : undefined;
    const valid = await metarhia.metautil.validatePassword(password, hash);
    if (!user || !valid) return new Error('Incorrect login or password');
    console.log(`Logged user: ${login}`);
    const token = await context.client.startSession(user.systemUserId);
    return { status: 'logged', token };
  },
});
