/**
 * Contact Model
 * Stores emergency contacts for users
 * Max 5 contacts per user strictly enforced
 */

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    name: {
      type: String,
      required: [true, 'Contact name is required'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters']
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid phone number']
    }
  },
  {
    timestamps: true
  }
);

/**
 * Enforce maximum 5 contacts per user
 */
contactSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await mongoose.model('Contact').countDocuments({ userId: this.userId });
    if (count >= 5) {
      const error = new Error('Maximum 5 contacts allowed per user');
      error.status = 400;
      return next(error);
    }
  }
  next();
});

/**
 * Index for efficient queries
 */
contactSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Contact', contactSchema);
