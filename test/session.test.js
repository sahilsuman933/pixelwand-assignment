import Session  from '../model/Session';

describe('Session', () => {
  it('should be able to create a new session for a user', async () => {
    const user = new User({
      email: 'user@example.com',
      password: 'password',
      name: 'John Doe',
    });

    await user.save();

    const session = new Session({
      userId: user._id,
    });

    await session.save();

    const foundSession = await Session.findById(session._id);

    expect(foundSession).toEqual(session);
  });

  it('should not be able to create a new session for a non-existent user', async () => {
    const session = new Session({
      userId: '1234567890abcdef12345678',
    });

    try {
      await session.save();
    } catch (error) {
      expect(error.message).toBe(
        'Session must be associated with a valid user',
      );
    }
  });
});
