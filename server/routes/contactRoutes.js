/**
 * Contact Routes
 */

const express = require('express');
const contactController = require('../controllers/contactController');
const authenticateToken = require('../middleware/auth');
const { validateContact, handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// All contact routes require authentication
router.use(authenticateToken);

/**
 * GET /api/contacts
 * Get all contacts for authenticated user
 */
router.get('/', contactController.getContacts);

/**
 * POST /api/contacts
 * Add new contact (max 5 per user)
 */
router.post('/', validateContact, handleValidationErrors, contactController.addContact);

/**
 * PUT /api/contacts/:contactId
 * Update contact by ID
 */
router.put('/:contactId', validateContact, handleValidationErrors, contactController.updateContact);

/**
 * DELETE /api/contacts/:contactId
 * Delete contact by ID
 */
router.delete('/:contactId', contactController.deleteContact);

module.exports = router;
