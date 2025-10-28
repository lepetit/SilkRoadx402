/**
 * Report Model
 * 
 * Mongoose schema for user reports
 */

import mongoose, { Schema } from 'mongoose';
import type { IReport } from '@/types/database';

const ReportSchema = new Schema<IReport>(
  {
    listingId: {
      type: String,
      required: true,
      index: true,
    },
    reporterWallet: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      maxlength: 100,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Unique compound index: Prevents duplicate reports from same wallet
ReportSchema.index(
  { listingId: 1, reporterWallet: 1 },
  { unique: true }
);

export const Report = mongoose.models.Report || mongoose.model<IReport>('Report', ReportSchema);

