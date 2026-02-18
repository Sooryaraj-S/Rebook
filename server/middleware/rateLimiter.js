/**
 * Rate Limiter Middleware
 * Prevents brute force attacks on login endpoint
 */

const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per windowMs
  message: 'Too many login attempts, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req, res) => {
    // Skip rate limiting in development
    return process.env.NODE_ENV === 'development';
  }
});

module.exports = loginLimiter;
