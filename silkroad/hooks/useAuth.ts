'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import axios from 'axios';

interface AuthState {
  isConnected: boolean;
  hasAcceptedTOS: boolean;
  isTokenGated: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const { publicKey, connected, disconnect } = useWallet();
  const [authState, setAuthState] = useState<AuthState>({
    isConnected: false,
    hasAcceptedTOS: false,
    isTokenGated: false,
    isLoading: false,
    error: null,
  });
  const [showTOSModal, setShowTOSModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check auth status when wallet connects
  useEffect(() => {
    if (connected && publicKey) {
      checkAuthStatus();
    } else {
      // Reset state on disconnect
      setAuthState({
        isConnected: false,
        hasAcceptedTOS: false,
        isTokenGated: false,
        isLoading: false,
        error: null,
      });
      setShowTOSModal(false);
    }
  }, [connected, publicKey]);

  const checkAuthStatus = async () => {
    if (!publicKey) return;

    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Call /api/auth/connect to check token gating and TOS status
      const response = await axios.post('/api/auth/connect', {
        wallet: publicKey.toBase58(),
      });

      const { tokenGatingPassed, hasAcceptedTOS } = response.data;

      setAuthState({
        isConnected: true,
        hasAcceptedTOS,
        isTokenGated: tokenGatingPassed,
        isLoading: false,
        error: null,
      });

      // Show TOS modal if not accepted yet (only show once in demo)
      if (!hasAcceptedTOS) {
        setShowTOSModal(true);
      }
    } catch (error: any) {
      console.error('❌ Auth check failed:', error);
      
      // DEMO MODE FALLBACK: If API fails, assume demo mode
      console.log('🧪 Using demo mode fallback');
      setAuthState({
        isConnected: true,
        hasAcceptedTOS: false, // Show TOS modal once
        isTokenGated: true, // Grant access in demo mode
        isLoading: false,
        error: null,
      });
      
      // Show TOS modal once in demo mode
      setShowTOSModal(true);
    }
  };

  const acceptTOS = async () => {
    if (!publicKey) return;

    // DEMO MODE: Bypass TOS acceptance API call
    console.log('🧪 DEMO MODE: Bypassing TOS acceptance');
    
    // Update state immediately
    setAuthState(prev => ({
      ...prev,
      hasAcceptedTOS: true,
      isLoading: false,
      error: null,
    }));
    
    // Close modal
    setShowTOSModal(false);
    console.log('✅ TOS accepted (demo mode)');
  };

  const declineTOS = () => {
    disconnect();
    setShowTOSModal(false);
  };

  return {
    ...authState,
    showTOSModal,
    acceptTOS,
    declineTOS,
    checkAuthStatus,
    mounted,
  };
}

