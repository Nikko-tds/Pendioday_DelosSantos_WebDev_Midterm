import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from './db';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// REGISTER ROUTE
router.post('/register', async (req, res) => {
  try {
    const email = req.body.email || req.body.username;
    const passwordHash = req.body.passwordHash;

    if (!email || !passwordHash) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user already exists
    const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(409).json({ error: 'Email is already registered' });
    }

    // Hash passwordHash & save user
    const hashedpasswordHash = await bcrypt.hash(passwordHash, 10);
    const newUser = await pool.query(
      'INSERT INTO users (email, passwordHash) VALUES ($1, $2) RETURNING id, email',
      [email, hashedpasswordHash]
    );

    return res.status(201).json({
      message: 'User registered successfully',
      user: newUser.rows[0],
    });
  } catch (err: any) {
    console.error('Registration error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// LOGIN ROUTE
router.post('/login', async (req, res) => {
  try {
    const email = req.body.email || req.body.username;
    const passwordHash = req.body.passwordHash;

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or passwordHash' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(passwordHash, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or passwordHash' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      token,
      userId: user.id,
      email: user.email,
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

export default router;