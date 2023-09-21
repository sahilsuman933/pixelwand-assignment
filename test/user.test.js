import User from '../model/User';

describe('User', () => {
  it('should be able to register a new user', async () => {
    const user = new User({
      email: 'user@example.com',
      password: 'password',
      name: 'John Doe',
    });

    await user.save();

    const foundUser = await User.findById(user._id);

    expect(foundUser).toEqual(user);
  });

  it('should not be able to register a user with an existing email address', async () => {
    const user = new User({
      email: 'user@example.com',
      password: 'password',
      name: 'John Doe',
    });

    await user.save();

    const newUser = new User({
      email: 'user@example.com',
      password: 'newpassword',
      name: 'Jane Doe',
    });

    try {
      await newUser.save();
    } catch (error) {
      expect(error.message).toBe(
        'E11000 duplicate key error collection: test-auth.users index: email_1 dup key: { email: "user@example.com" }',
      );
    }
  });
});
