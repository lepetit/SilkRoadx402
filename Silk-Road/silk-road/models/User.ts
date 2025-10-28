import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  wallet: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  hasAcceptedTOS: {
    type: Boolean,
    default: false,
  },
  tosAcceptedAt: {
    type: Date,
  },
  isTokenGated: {
    type: Boolean,
    default: false,
  },
  tokenBalance: {
    type: Number,
    default: 0,
  },
  lastSeen: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);

