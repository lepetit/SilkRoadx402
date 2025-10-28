/**
 * Database Model Types (Simplified for Mock Mode)
 * 
 * NOTE: For demo deployment, these are plain interfaces without Mongoose.
 * For production, extend from Mongoose Document types.
 */

import type { ListingCategory, RiskLevel, ListingState, TransactionStatus, LogType } from '@/config/constants';

// ============================================
// Listing
// ============================================
export interface IListing {
  _id?: string;
  wallet: string;
  title: string;
  description: string;
  imageUrl: string;
  demoVideoUrl?: string;
  whitepaperUrl?: string;
  githubUrl?: string;
  deliveryUrl: string;
  price: number;
  category: ListingCategory;
  riskLevel: RiskLevel;
  state: ListingState;
  approved: boolean;
  reportsCount: number;
  failedPurchaseCount: number;
  lastFailureAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// Transaction
// ============================================
export interface ITransaction {
  _id?: string;
  listingId: string;
  buyerWallet: string;
  sellerWallet: string;
  amount: number;
  txnHash: string;
  deliveryUrl: string; // Encrypted
  status: TransactionStatus;
  createdAt: Date;
}

// ============================================
// Log
// ============================================
export interface ILog {
  _id?: string;
  type: LogType;
  message: string;
  wallet?: string;
  ip?: string;
  createdAt: Date;
}

// ============================================
// Report
// ============================================
export interface IReport {
  _id?: string;
  listingId: string;
  reporterWallet: string;
  reason?: string;
  createdAt: Date;
}

