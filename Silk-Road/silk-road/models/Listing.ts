/**
 * Listing Model
 * 
 * Mongoose schema for software listings
 */

import mongoose, { Schema } from 'mongoose';
import type { IListing } from '@/types/database';
import { LISTING_CATEGORIES, RISK_LEVELS, LISTING_STATES } from '@/config/constants';

const ListingSchema = new Schema<IListing>(
  {
    wallet: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      minlength: 50,
      maxlength: 2000,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    demoVideoUrl: {
      type: String,
    },
    whitepaperUrl: {
      type: String,
    },
    githubUrl: {
      type: String,
    },
    deliveryUrl: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0.10,
    },
    category: {
      type: String,
      required: true,
      enum: LISTING_CATEGORIES,
    },
    riskLevel: {
      type: String,
      required: true,
      enum: Object.values(RISK_LEVELS),
      default: RISK_LEVELS.STANDARD,
    },
    state: {
      type: String,
      required: true,
      enum: Object.values(LISTING_STATES),
      default: LISTING_STATES.IN_REVIEW,
    },
    approved: {
      type: Boolean,
      required: true,
      default: false,
    },
    reportsCount: {
      type: Number,
      required: true,
      default: 0,
    },
    failedPurchaseCount: {
      type: Number,
      required: true,
      default: 0,
    },
    lastFailureAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for performance
ListingSchema.index({ state: 1, category: 1 });
ListingSchema.index({ wallet: 1, state: 1 });

export const Listing = mongoose.models.Listing || mongoose.model<IListing>('Listing', ListingSchema);

