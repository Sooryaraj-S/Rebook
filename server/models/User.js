/**
 * User Model
 * Stores user credentials securely
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\+?[1-9]\d{1,14}$/, 'Please provide a valid phone number (E.164 format)']
    },
    passcodeHash: {
      type: String,
      required: [true, 'Passcode is required'],
      set: function(value) {
        // Store the plain passcode temporarily for hashing in pre-save
        return value;
      }
    },
    lastLogin: {
      type: Date,
      default: null
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

/**
 * Hash passcode before saving
 */
userSchema.pre('save', async function(next) {
  // Only hash if passcode is new or modified
  if (!this.isNew && !this.isModified('passcodeHash')) {
    return next();
  }
  
  try {
    // Hash the passcode
    this.passcodeHash = await bcrypt.hash(this.passcodeHash, 10);
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Compare passcode with hash
 */
userSchema.methods.comparePasscode = async function(plainPasscode) {
  return await bcrypt.compare(plainPasscode, this.passcodeHash);
};

/**
 * Get user without sensitive data
 */
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.passcodeHash;
  return user;
};

module.exports = mongoose.model('User', userSchema);
