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

const DEMO_TOS_KEY = 'demo_tos_accepted';
const DEMO_TOS_WALLET_KEY = 'demo_tos_wallet';

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

  // Prevent hydration issues & load from localStorage
  useEffect(() => {
    setMounted(true);
    
    // DEMO MODE: Check localStorage for TOS acceptance
    if (typeof window !== 'undefined') {
      const savedTOS = localStorage.getItem(DEMO_TOS_KEY);
      const savedWallet = localStorage.getItem(DEMO_TOS_WALLET_KEY);
      
      if (savedTOS === 'true' && savedWallet && publicKey?.toBase58() === savedWallet) {
        console.log('🧪 DEMO: Restored TOS acceptance from localStorage');
        setAuthState(prev => ({
          ...prev,
          hasAcceptedTOS: true,
          isTokenGated: true,
        }));
      }
    }
  }, [publicKey]);

  // Check auth status when wallet connects
  useEffect(() => {
    if (connected && publicKey) {
      checkAuthStatus();
    } else {
      // Reset state on disconnect & clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem(DEMO_TOS_KEY);
        localStorage.removeItem(DEMO_TOS_WALLET_KEY);
      }
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

    // DEMO MODE: Check localStorage first
    if (typeof window !== 'undefined') {
      const savedTOS = localStorage.getItem(DEMO_TOS_KEY);
      const savedWallet = localStorage.getItem(DEMO_TOS_WALLET_KEY);
      
      if (savedTOS === 'true' && savedWallet === publicKey.toBase58()) {
        console.log('🧪 DEMO: Using cached TOS acceptance');
        setAuthState({
          isConnected: true,
          hasAcceptedTOS: true,
          isTokenGated: true,
          isLoading: false,
          error: null,
        });
        return; // Skip API call if already accepted in localStorage
      }
    }

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

    // DEMO MODE: Bypass TOS acceptance API call & save to localStorage
    console.log('🧪 DEMO MODE: Bypassing TOS acceptance');
    
    // Save to localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem(DEMO_TOS_KEY, 'true');
      localStorage.setItem(DEMO_TOS_WALLET_KEY, publicKey.toBase58());
      console.log('🧪 DEMO: Saved TOS acceptance to localStorage');
    }
    
    // Update state immediately
    setAuthState(prev => ({
      ...prev,
      hasAcceptedTOS: true,
      isTokenGated: true,
      isLoading: false,
      error: null,
    }));
    
    // Close modal
    setShowTOSModal(false);
    console.log('✅ TOS accepted (demo mode)');
  };

  const declineTOS = () => {
    // Clear localStorage on decline
    if (typeof window !== 'undefined') {
      localStorage.removeItem(DEMO_TOS_KEY);
      localStorage.removeItem(DEMO_TOS_WALLET_KEY);
    }
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

