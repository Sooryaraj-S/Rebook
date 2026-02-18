/**
 * Contact Controller
 * Handles CRUD operations for emergency contacts
 */

const Contact = require('../models/Contact');

/**
 * Get all contacts for a user
 */
exports.getContacts = async (req, res) => {
  try {
    const userId = req.user.userId;

    const contacts = await Contact.find({ userId })
      .sort({ createdAt: -1 })
      .select('_id name phoneNumber createdAt');

    res.json({
      contacts,
      count: contacts.length,
      limit: 5
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};

/**
 * Add new contact
 */
exports.addContact = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, phoneNumber } = req.body;

    // Check contact limit
    const contactCount = await Contact.countDocuments({ userId });
    if (contactCount >= 5) {
      return res.status(400).json({
        error: 'Maximum 5 contacts allowed per user'
      });
    }

    // Create new contact
    const contact = new Contact({
      userId,
      name,
      phoneNumber
    });

    await contact.save();

    res.status(201).json({
      message: 'Contact added successfully',
      contact: {
        _id: contact._id,
        name: contact.name,
        phoneNumber: contact.phoneNumber
      }
    });
  } catch (error) {
    console.error('Add contact error:', error);
    res.status(500).json({ error: error.message || 'Failed to add contact' });
  }
};

/**
 * Update contact
 */
exports.updateContact = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { contactId } = req.params;
    const { name, phoneNumber } = req.body;

    // Find and verify contact belongs to user
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    if (contact.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Update contact
    if (name) contact.name = name;
    if (phoneNumber) contact.phoneNumber = phoneNumber;

    await contact.save();

    res.json({
      message: 'Contact updated successfully',
      contact: {
        _id: contact._id,
        name: contact.name,
        phoneNumber: contact.phoneNumber
      }
    });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ error: error.message || 'Failed to update contact' });
  }
};

/**
 * Delete contact
 */
exports.deleteContact = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { contactId } = req.params;

    // Find and verify contact belongs to user
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    if (contact.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Delete contact
    await Contact.deleteOne({ _id: contactId });

    res.json({
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ error: 'Failed to delete contact' });
  }
};
