/**
 * Encryption Utilities (Simplified for Mock Mode Demo)
 * 
 * NOTE: For demo deployment, encryption is simplified.
 * For production, implement proper AES encryption.
 */

import { CONFIG } from '@/config/constants';

/**
 * Encrypt string (Mock mode compatible)
 * 
 * @param plaintext - String to encrypt
 * @returns string - Encrypted ciphertext (or plaintext in mock mode)
 */
export function encrypt(plaintext: string): string {
  // In mock mode, just base64 encode for demo purposes
  if (CONFIG.MOCK_MODE) {
    return Buffer.from(plaintext).toString('base64');
  }
  
  // For production, implement proper AES encryption
  return plaintext;
}

/**
 * Decrypt string (Mock mode compatible)
 * 
 * @param ciphertext - Encrypted string
 * @returns string - Decrypted plaintext
 */
export function decrypt(ciphertext: string): string {
  // In mock mode, just base64 decode
  if (CONFIG.MOCK_MODE) {
    try {
      return Buffer.from(ciphertext, 'base64').toString('utf-8');
    } catch {
      return ciphertext; // Return as-is if not valid base64
    }
  }
  
  // For production, implement proper AES decryption
  return ciphertext;
}

/**
 * Hash string (Mock mode compatible)
 * 
 * @param input - String to hash
 * @returns string - Hash (simple for demo)
 */
export function hash(input: string): string {
  // Mock hash for demo mode
  if (CONFIG.MOCK_MODE) {
    return Buffer.from(input).toString('base64');
  }
  
  // For production, implement proper SHA-256 hashing
  return input;
}

/**
 * Generate random nonce
 * 
 * @param length - Length of nonce (default 16)
 * @returns string - Random hex string
 */
export function generateNonce(length: number = 16): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

/**
 * Generate OTP (One-Time Password)
 * 
 * @returns string - 6-digit OTP
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Verify OTP
 * 
 * Compares hashed OTP with stored hash
 * 
 * @param inputOTP - User-provided OTP
 * @param storedHash - Stored OTP hash
 * @returns boolean - True if OTP matches
 */
export function verifyOTP(inputOTP: string, storedHash: string): boolean {
  const inputHash = hash(inputOTP);
  return inputHash === storedHash;
}

