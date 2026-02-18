/**
 * Authentication Controller
 * Handles user registration and login
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Register new user
 */
exports.register = async (req, res) => {
  try {
    const { phoneNumber, passcode } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(409).json({ error: 'Phone number already registered' });
    }

    // Create new user
    const user = new User({
      phoneNumber,
      passcodeHash: passcode
    });

    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      userId: user._id
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: error.message || 'Registration failed' });
  }
};

/**
 * Login user
 */
exports.login = async (req, res) => {
  try {
    const { phoneNumber, passcode } = req.body;

    // Find user by phone number
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(401).json({ error: 'Invalid phone number or passcode' });
    }

    // Verify passcode
    const isValidPasscode = await user.comparePasscode(passcode);
    if (!isValidPasscode) {
      return res.status(401).json({ error: 'Invalid phone number or passcode' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, phoneNumber: user.phoneNumber },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message || 'Login failed' });
  }
};

/**
 * Verify token
 */
exports.verifyToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      valid: true,
      user: user.toJSON()
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ error: 'Token verification failed' });
  }
};
