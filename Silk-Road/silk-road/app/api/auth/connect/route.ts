import { NextRequest, NextResponse } from 'next/server';
import { PublicKey } from '@solana/web3.js';
import { checkTokenBalance } from '@/lib/solana/tokenGating';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { CONFIG } from '@/config/constants';
import { mockStore } from '@/lib/mockStore';

export async function POST(req: NextRequest) {
  try {
    const { wallet } = await req.json();

    if (!wallet) {
      return NextResponse.json(
        { error: 'Wallet address required' },
        { status: 400 }
      );
    }

    // Validate wallet address
    let publicKey: PublicKey;
    try {
      publicKey = new PublicKey(wallet);
    } catch {
      return NextResponse.json(
        { error: 'Invalid wallet address' },
        { status: 400 }
      );
    }

    // ============================================
    // MOCK MODE (for testing without database)
    // ============================================
    if (CONFIG.MOCK_MODE) {
      console.log('🧪 MOCK MODE: Using in-memory data store');
      
      // Get or create mock user
      const mockUser = mockStore.getUser(wallet, CONFIG.MOCK_TOKEN_GATING_PASSED);

      return NextResponse.json({
        success: true,
        wallet,
        tokenGatingPassed: mockUser.isTokenGated,
        hasAcceptedTOS: mockUser.hasAcceptedTOS,
        _mock: true,
      });
    }

    // ============================================
    // REAL MODE (production)
    // ============================================

    // Connect to database
    await connectDB();

    // Check token balance for gating (mainnet)
    const balanceResult = await checkTokenBalance(wallet);
    const tokenGatingPassed = balanceResult.meetsRequirement;

    // Check if user has accepted TOS
    let user = await User.findOne({ wallet });
    const hasAcceptedTOS = user?.hasAcceptedTOS || false;

    // Create user record if doesn't exist
    if (!user) {
      user = await User.create({
        wallet,
        hasAcceptedTOS: false,
        isTokenGated: tokenGatingPassed,
        tokenBalance: balanceResult.total,
        lastSeen: new Date(),
      });
    } else {
      // Update last seen and token gating status
      user.isTokenGated = tokenGatingPassed;
      user.tokenBalance = balanceResult.total;
      user.lastSeen = new Date();
      await user.save();
    }

    return NextResponse.json({
      success: true,
      wallet,
      tokenGatingPassed,
      hasAcceptedTOS,
    });
  } catch (error: any) {
    console.error('Auth connect error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

