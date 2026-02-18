/**
 * Input Validation Middleware
 * Validates phone numbers and passcodes
 */

const { body, validationResult } = require('express-validator');

// Validation rules for authentication
const validateLogin = [
  body('phoneNumber')
    .trim()
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Invalid phone number format'),
  body('passcode')
    .trim()
    .matches(/^\d{6}$/)
    .withMessage('Passcode must be exactly 6 digits')
];

// Validation rules for contact creation/update
const validateContact = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name cannot exceed 50 characters'),
  body('phoneNumber')
    .trim()
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Invalid phone number format')
];

// Middleware to check validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateLogin,
  validateContact,
  handleValidationErrors
};
