/**
 * Encryption Utilities
 * 
 * AES encryption for sensitive data (deliveryUrl)
 */

import CryptoJS from 'crypto-js';
import { CONFIG } from '@/config/constants';

// Encryption secret from config
const APP_SECRET = CONFIG.APP_SECRET;

/**
 * Encrypt string using AES
 * 
 * @param plaintext - String to encrypt
 * @returns string - Encrypted ciphertext
 */
export function encrypt(plaintext: string): string {
  try {
    const ciphertext = CryptoJS.AES.encrypt(plaintext, APP_SECRET).toString();
    return ciphertext;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}

/**
 * Decrypt AES ciphertext
 * 
 * @param ciphertext - Encrypted string
 * @returns string - Decrypted plaintext
 */
export function decrypt(ciphertext: string): string {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, APP_SECRET);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);

    if (!plaintext) {
      throw new Error('Decryption produced empty result');
    }

    return plaintext;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
}

/**
 * Hash string using SHA-256
 * 
 * Useful for storing OTP hashes, etc.
 * 
 * @param input - String to hash
 * @returns string - SHA-256 hash
 */
export function hash(input: string): string {
  return CryptoJS.SHA256(input).toString();
}

/**
 * Generate random nonce
 * 
 * @param length - Length of nonce (default 16)
 * @returns string - Random hex string
 */
export function generateNonce(length: number = 16): string {
  const randomBytes = CryptoJS.lib.WordArray.random(length);
  return randomBytes.toString(CryptoJS.enc.Hex);
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

