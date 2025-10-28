/**
 * Database Model Types
 * 
 * TypeScript interfaces matching Mongoose schemas
 */

import { Document } from 'mongoose';
import type { ListingCategory, RiskLevel, ListingState, TransactionStatus, LogType } from '@/config/constants';

// ============================================
// Listing
// ============================================
export interface IListing extends Document {
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
export interface ITransaction extends Document {
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
export interface ILog extends Document {
  type: LogType;
  message: string;
  wallet?: string;
  ip?: string;
  createdAt: Date;
}

// ============================================
// Report
// ============================================
export interface IReport extends Document {
  listingId: string;
  reporterWallet: string;
  reason?: string;
  createdAt: Date;
}

