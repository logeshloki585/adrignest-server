import bcrypt from 'bcryptjs';
import User from '../models/UserModel.js';
import { generateTokens } from '../utils/generateToken.js';
import { OAuth2Client } from 'google-auth-library';

// User Login Controller
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const tokens = generateTokens(user);
    res.json(tokens);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', errorq: err });
  }
};

// User Registration Controller
export const registerUser = async (req, res) => {
  try {
    const { email, password, userName } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, passwordHash: hashedPassword, userName });
    await user.save();

    const tokens = generateTokens(user);
    res.status(200).json(tokens);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', errorq: err });
  }
};


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
  const { credential } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const { email, given_name, family_name } = payload;
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        email,
        userName: `${given_name} ${family_name}`,
        authSource: 'google',
      });
      await user.save();
    }

    const token = generateTokens(user);
    res.status(200).json(token);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Google authentication failed' });
  }
};