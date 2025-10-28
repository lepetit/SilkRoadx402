/**
 * Transaction Model
 * 
 * Mongoose schema for purchase transactions
 */

import mongoose, { Schema } from 'mongoose';
import type { ITransaction } from '@/types/database';
import { TRANSACTION_STATUS } from '@/config/constants';

const TransactionSchema = new Schema<ITransaction>(
  {
    listingId: {
      type: String,
      required: true,
      index: true,
    },
    buyerWallet: {
      type: String,
      required: true,
      index: true,
    },
    sellerWallet: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    txnHash: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    deliveryUrl: {
      type: String,
      required: true,
      // Stored encrypted (AES)
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(TRANSACTION_STATUS),
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const Transaction = mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);

