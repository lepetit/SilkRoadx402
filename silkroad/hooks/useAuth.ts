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

      // Show TOS modal if not accepted yet
      if (!hasAcceptedTOS) {
        setShowTOSModal(true);
      }
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error.response?.data?.error || 'Failed to authenticate',
      }));
    }
  };

  const acceptTOS = async () => {
    if (!publicKey) return;

    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await axios.post('/api/auth/tos', {
        wallet: publicKey.toBase58(),
      });

      if (response.data.success) {
        // Update state immediately
        setAuthState(prev => ({
          ...prev,
          hasAcceptedTOS: true,
          isLoading: false,
          error: null,
        }));
        // Close modal
        setShowTOSModal(false);
        console.log('✅ TOS accepted successfully');
      }
    } catch (error: any) {
      console.error('❌ TOS acceptance failed:', error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error.response?.data?.error || 'Failed to accept TOS',
      }));
    }
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

