/**
 * Authentication Routes
 */

const express = require('express');
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/auth');
const loginLimiter = require('../middleware/rateLimiter');
const { validateLogin, handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

/**
 * POST /api/auth/register
 * Register new user with phone number and 6-digit passcode
 */
router.post('/register', validateLogin, handleValidationErrors, authController.register);

/**
 * POST /api/auth/login
 * Login user with phone number and passcode
 * Rate limited to 5 attempts per 15 minutes
 */
router.post('/login', loginLimiter, validateLogin, handleValidationErrors, authController.login);

/**
 * GET /api/auth/verify
 * Verify JWT token and get user info
 */
router.get('/verify', authenticateToken, authController.verifyToken);

module.exports = router;
