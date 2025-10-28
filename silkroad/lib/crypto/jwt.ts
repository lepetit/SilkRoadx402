/**
 * JWT Utilities
 * 
 * JSON Web Token signing and verification for authentication
 * 
 * NOTE: Simplified for demo/mock mode. For production, use proper JWT signing.
 */

import type { UserJWTPayload, AdminJWTPayload } from '@/types/api';
import { CONFIG, JWT_CONFIG } from '@/config/constants';

/**
 * Sign user JWT
 * 
 * @param wallet - User's Solana wallet address
 * @param tosAccepted - Whether user accepted TOS
 * @returns string - Signed JWT token (mock for demo)
 */
export function signUserJWT(wallet: string, tosAccepted: boolean = false): string {
  // Mock token for demo mode
  if (CONFIG.MOCK_MODE) {
    return `mock_user_token_${wallet.slice(0, 8)}_${tosAccepted}`;
  }
  
  // For production, implement proper JWT signing
  return `user_token_${Date.now()}`;
}

/**
 * Verify user JWT
 * 
 * @param token - JWT token string
 * @returns UserJWTPayload | null - Decoded payload or null if invalid
 */
export function verifyUserJWT(token: string): UserJWTPayload | null {
  // Mock verification for demo mode
  if (CONFIG.MOCK_MODE) {
    if (!token || !token.startsWith('mock_user_token_')) {
      return null;
    }
    
    // Extract wallet from token
    const parts = token.split('_');
    const wallet = parts[3] || 'unknown';
    const tosAccepted = parts[4] === 'true';
    
    return {
      wallet,
      tosAccepted,
      exp: Date.now() + 3600000,
      iat: Date.now(),
    } as UserJWTPayload;
  }
  
  // For production, implement proper JWT verification
  return null;
}

/**
 * Sign admin JWT
 * 
 * @returns string - Signed admin JWT token (mock for demo)
 */
export function signAdminJWT(): string {
  // Mock token for demo mode
  if (CONFIG.MOCK_MODE) {
    return `mock_admin_token_${Date.now()}`;
  }
  
  // For production, implement proper JWT signing
  return `admin_token_${Date.now()}`;
}

/**
 * Verify admin JWT
 * 
 * @param token - JWT token string
 * @returns AdminJWTPayload | null - Decoded payload or null if invalid
 */
export function verifyAdminJWT(token: string): AdminJWTPayload | null {
  // Mock verification for demo mode
  if (CONFIG.MOCK_MODE) {
    if (!token || !token.startsWith('mock_admin_token_')) {
      return null;
    }
    
    return {
      isAdmin: true,
      exp: Date.now() + 3600000,
      iat: Date.now(),
    } as AdminJWTPayload;
  }
  
  // For production, implement proper JWT verification
  return null;
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
  // Mock decode for demo mode
  if (CONFIG.MOCK_MODE) {
    if (token.startsWith('mock_user_token_')) {
      const parts = token.split('_');
      return {
        wallet: parts[3] || 'unknown',
        tosAccepted: parts[4] === 'true',
      };
    }
    if (token.startsWith('mock_admin_token_')) {
      return { isAdmin: true };
    }
  }
  
  // For production, implement proper JWT decoding
  return null;
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


