import Joi from 'joi';
import Session from '../model/Session.js';

const AuthValidation = async (req, res, next) => {
  const { token } = req.headers;

  const schema = Joi.object({
    token: Joi.string().required(),
  });

  const result = schema.validate({ token });

  if (result.error) {
    return res.status(404).json({ error: 'Unauthorized Access!' });
  }

  const session = await Session.findOne({ token });

  if (!session) {
    return res.status(404).json({ error: 'Invalid session token' });
  }

  if (session.expiresAt < new Date()) {
    return res.status(404).json({ error: 'Session token has expired' });
  }

  return next();
};

export default AuthValidation;
