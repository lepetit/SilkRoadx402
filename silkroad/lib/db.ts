/**
 * MongoDB Connection (Simplified for Mock Mode Demo)
 * 
 * NOTE: For demo deployment, database connection is bypassed in mock mode.
 * For production, implement proper MongoDB connection.
 */

import { CONFIG } from '@/config/constants';

/**
 * Connect to MongoDB (Mock mode compatible)
 */
async function connectDB() {
  // In mock mode, skip database connection
  if (CONFIG.MOCK_MODE) {
    console.log('🧪 MOCK MODE: Skipping database connection');
    return null;
  }

  // For production, implement proper MongoDB connection
  console.warn('⚠️ Production mode without database - implement MongoDB connection');
  return null;
}

/**
 * Disconnect from MongoDB
 */
async function disconnectDB() {
  console.log('🧪 MOCK MODE: No database to disconnect');
}

// Export functions
export { connectDB, disconnectDB };

