/**
 * MongoDB Connection
 * 
 * Singleton connection to MongoDB Atlas
 */

import mongoose from 'mongoose';
import { CONFIG } from '@/config/constants';

// Connection state
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB
 * 
 * Uses connection pooling and caching for serverless environments
 */
async function connectDB() {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create new connection if promise doesn't exist
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    // MongoDB URI from config
    const MONGODB_URI = CONFIG.MONGODB_URI || 'mongodb://localhost:27017/silkroadx402';

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

/**
 * Disconnect from MongoDB
 * 
 * Useful for cleanup in tests
 */
async function disconnectDB() {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log('❌ MongoDB disconnected');
  }
}

// Export functions
export { connectDB, disconnectDB };

// TypeScript global augmentation
declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

