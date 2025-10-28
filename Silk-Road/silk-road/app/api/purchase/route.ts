import { NextRequest, NextResponse } from 'next/server';
import { PublicKey } from '@solana/web3.js';
import { CONFIG } from '@/config/constants';
import { mockStore } from '@/lib/mockStore';
import { connectDB } from '@/lib/db';
import { Transaction } from '@/models/Transaction';
import { Listing } from '@/models/Listing';

export async function POST(req: NextRequest) {
  try {
    const { listingId, buyerWallet, sellerWallet, amount, txnHash } = await req.json();

    // Validation
    if (!listingId || !buyerWallet || !sellerWallet || !amount || !txnHash) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate wallets
    try {
      new PublicKey(buyerWallet);
      new PublicKey(sellerWallet);
    } catch {
      return NextResponse.json(
        { error: 'Invalid wallet address' },
        { status: 400 }
      );
    }

    // ============================================
    // MOCK MODE
    // ============================================
    if (CONFIG.MOCK_MODE) {
      console.log(`🧪 MOCK: Processing purchase for listing ${listingId}`);
      
      // Get listing to verify it exists
      const listing = mockStore.getListing(listingId);
      if (!listing) {
        return NextResponse.json(
          { error: 'Listing not found' },
          { status: 404 }
        );
      }

      // Verify listing is available
      if (listing.state !== 'on_market' || !listing.approved) {
        return NextResponse.json(
          { error: 'Listing is not available for purchase' },
          { status: 400 }
        );
      }

      // Create transaction with mock delivery URL
      const mockDeliveryUrls = [
        'https://github.com/seller/private-repo/releases/download/v1.0.0/software.zip',
        'https://drive.google.com/file/d/1abc123def456/view',
        'https://mega.nz/file/abc123#xyz789',
        'https://dropbox.com/s/abc123/software.tar.gz',
      ];
      
      const deliveryUrl = mockDeliveryUrls[Math.floor(Math.random() * mockDeliveryUrls.length)];

      const transaction = mockStore.createTransaction({
        listingId,
        buyerWallet,
        sellerWallet,
        amount,
        txnHash,
        deliveryUrl, // In real mode this would be encrypted
        status: 'success',
      });

      return NextResponse.json({
        success: true,
        transactionId: transaction._id,
        deliveryUrl, // In real mode this wouldn't be returned here
        _mock: true,
      });
    }

    // ============================================
    // REAL MODE
    // ============================================
    await connectDB();

    // Get listing
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      );
    }

    // Verify listing is available
    if (listing.state !== 'on_market' || !listing.approved) {
      return NextResponse.json(
        { error: 'Listing is not available for purchase' },
        { status: 400 }
      );
    }

    // Verify transaction on-chain (in real implementation)
    // const txVerified = await verifyTransaction(txnHash);
    // if (!txVerified) { return error }

    // Create transaction record
    const transaction = await Transaction.create({
      listingId,
      buyerWallet,
      sellerWallet,
      amount,
      txnHash,
      deliveryUrl: listing.deliveryUrl, // Encrypted in model
      status: 'success',
    });

    return NextResponse.json({
      success: true,
      transactionId: transaction._id.toString(),
    });
  } catch (error: any) {
    console.error('Purchase error:', error);
    return NextResponse.json(
      { error: 'Purchase failed' },
      { status: 500 }
    );
  }
}

