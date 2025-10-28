'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';

export function Navbar() {
  const { publicKey } = useWallet();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            SilkRoad<span className="text-blue-600">x402</span>
          </div>
        </Link>

        {/* Navigation Links (show when wallet connected) */}
        {publicKey && (
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/browse" 
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
            >
              Browse
            </Link>
            <Link 
              href="/sell" 
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
            >
              Sell
            </Link>
            <Link 
              href="/my-listings" 
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
            >
              My Listings
            </Link>
          </div>
        )}

        {/* Wallet Button */}
        <div className="flex items-center">
          {mounted && (
            <WalletMultiButton className="!bg-blue-600 hover:!bg-blue-700 !rounded-lg !h-10 !px-4 !text-sm !font-medium transition-colors" />
          )}
        </div>
      </div>
    </nav>
  );
}

