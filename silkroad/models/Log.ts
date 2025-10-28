/**
 * Log Model
 * 
 * Mongoose schema for system logs
 */

import mongoose, { Schema } from 'mongoose';
import type { ILog } from '@/types/database';
import { LOG_TYPES, LOG_TTL_DAYS } from '@/config/constants';

const LogSchema = new Schema<ILog>(
  {
    type: {
      type: String,
      required: true,
      enum: Object.values(LOG_TYPES),
      index: true,
    },
    message: {
      type: String,
      required: true,
    },
    wallet: {
      type: String,
    },
    ip: {
      type: String,
      // Only for admin fails and fraud attempts
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// TTL Index: Auto-delete logs after 7 days
LogSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: LOG_TTL_DAYS * 24 * 60 * 60 }
);

export const Log = mongoose.models.Log || mongoose.model<ILog>('Log', LogSchema);

