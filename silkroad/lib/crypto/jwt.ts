/**
 * JWT Utilities
 * 
 * JSON Web Token signing and verification for authentication
 */

import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import type { UserJWTPayload, AdminJWTPayload } from '@/types/api';
import { CONFIG, JWT_CONFIG } from '@/config/constants';

// JWT secret from config
const JWT_SECRET: Secret = CONFIG.JWT_SECRET;

/**
 * Sign user JWT
 * 
 * @param wallet - User's Solana wallet address
 * @param tosAccepted - Whether user accepted TOS
 * @returns string - Signed JWT token
 */
export function signUserJWT(wallet: string, tosAccepted: boolean = false): string {
  const payload: Omit<UserJWTPayload, 'exp' | 'iat'> = {
    wallet,
    tosAccepted,
  };

  const options: SignOptions = {
    expiresIn: JWT_CONFIG.EXPIRY,
  };

  return jwt.sign(payload, JWT_SECRET, options);
}

/**
 * Verify user JWT
 * 
 * @param token - JWT token string
 * @returns UserJWTPayload | null - Decoded payload or null if invalid
 */
export function verifyUserJWT(token: string): UserJWTPayload | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as UserJWTPayload;
    return payload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}

/**
 * Sign admin JWT
 * 
 * @returns string - Signed admin JWT token
 */
export function signAdminJWT(): string {
  const payload: Omit<AdminJWTPayload, 'exp' | 'iat'> = {
    isAdmin: true,
  };

  const options: SignOptions = {
    expiresIn: JWT_CONFIG.EXPIRY,
  };

  return jwt.sign(payload, JWT_SECRET, options);
}

/**
 * Verify admin JWT
 * 
 * @param token - JWT token string
 * @returns AdminJWTPayload | null - Decoded payload or null if invalid
 */
export function verifyAdminJWT(token: string): AdminJWTPayload | null {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as AdminJWTPayload;
    
    // Verify it's actually an admin token
    if (!payload.isAdmin) {
      return null;
    }

    return payload;
  } catch (error) {
    console.error('Admin JWT verification failed:', error);
    return null;
  }
}

/**
 * Update user JWT with TOS acceptance
 * 
 * @param token - Existing JWT token
 * @returns string | null - New JWT with tosAccepted=true, or null if invalid
 */
export function updateJWTWithTOS(token: string): string | null {
  const payload = verifyUserJWT(token);
  
  if (!payload) {
    return null;
  }

  // Create new token with TOS accepted
  return signUserJWT(payload.wallet, true);
}

/**
 * Decode JWT without verification (for debugging)
 * 
 * @param token - JWT token string
 * @returns any - Decoded payload (unverified)
 */
export function decodeJWT(token: string): any {
  try {
    return jwt.decode(token);
  } catch (error) {
    console.error('JWT decode failed:', error);
    return null;
  }
}

/**
 * Extract JWT from cookie string
 * 
 * @param cookieHeader - Cookie header string
 * @param cookieName - Name of the JWT cookie
 * @returns string | null - JWT token or null if not found
 */
export function extractJWTFromCookie(
  cookieHeader: string | null,
  cookieName: string = JWT_CONFIG.COOKIE_NAME
): string | null {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(';').map(c => c.trim());
  const jwtCookie = cookies.find(c => c.startsWith(`${cookieName}=`));

  if (!jwtCookie) {
    return null;
  }

  return jwtCookie.split('=')[1];
}

