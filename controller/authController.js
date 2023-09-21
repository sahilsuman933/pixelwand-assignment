import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import { JWT_SECRET } from '../config/index.js';
import User from '../model/User.js';
import Session from '../model/Session.js';

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    const validationErrors = result.error.details;
    res.status(400).json({
      errors: validationErrors.map((error) => error.message),
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ email: newUser.email }, JWT_SECRET, {
      expiresIn: '24h',
    });

    const session = new Session({
      token,
      userId: newUser._id,
    });

    await session.save();

    return res.status(201).json({ email: newUser.email, accessToken: token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    const validationErrors = result.error.details;

    return res.status(400).json({
      errors: validationErrors.map((error) => error.message),
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: '24h',
    });

    const session = new Session({
      token,
      userId: user._id,
    });

    await session.save();

    return res.status(200).json({ email: user.email, accessToken: token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const logout = async (req, res) => {
  const { token } = req.headers;

  const session = await Session.findOne({ token });
  if (!session) {
    return res.status(404).json({ message: 'Session not found' });
  }

  await session.deleteOne();

  return res.status(200).json({ message: 'Logout successful' });
};
