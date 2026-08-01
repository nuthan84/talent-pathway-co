const User = require('../models/User');
const Provider = require('../models/Provider');
const generateToken = require('../utils/generateToken');

// POST /api/auth/register
// Registers a new service provider. Admin accounts are not self-service —
// see backend/seed-admin.js for creating an admin account.
async function register(req, res) {
  try {
    const { name, email, phone, password, category } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ error: 'name, email, phone, and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    const user = await User.create({ name, email, phone, password, role: 'provider' });

    // Every provider gets a linked profile in draft status the moment they register.
    await Provider.create({
      user: user._id,
      category: category || '',
      status: 'draft',
    });

    const token = generateToken(user);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// POST /api/auth/login
async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.comparePassword(password))) {
      // Same error for "no such user" and "wrong password" — don't leak which one it was.
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/auth/me
async function getMe(req, res) {
  res.json({ user: req.user });
}

module.exports = { register, login, getMe };
