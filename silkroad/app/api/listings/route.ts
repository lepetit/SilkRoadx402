import { NextRequest, NextResponse } from 'next/server';
import { PublicKey } from '@solana/web3.js';
import { CONFIG } from '@/config/constants';
import { mockStore } from '@/lib/mockStore';
import { connectDB } from '@/lib/db';
import { Listing } from '@/models/Listing';
import { sanitizeString } from '@/lib/validation/sanitization';

// GET - Fetch all approved listings or user's listings
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const wallet = searchParams.get('wallet'); // If provided, get user's listings

    // ============================================
    // MOCK MODE
    // ============================================
    console.log('🧪 MOCK_MODE:', CONFIG.MOCK_MODE);
    console.log('🧪 Environment check:', {
      NEXT_PUBLIC_MOCK_MODE: process.env.NEXT_PUBLIC_MOCK_MODE,
      NODE_ENV: process.env.NODE_ENV
    });
    
    if (CONFIG.MOCK_MODE) {
      console.log('🧪 Using MOCK MODE for listings');
      
      if (wallet) {
        console.log(`🧪 MOCK: Fetching listings for wallet ${wallet.slice(0, 8)}...`);
        const listings = mockStore.getListingsByWallet(wallet);
        return NextResponse.json({
          success: true,
          listings,
          _mock: true,
        });
      }

      console.log('🧪 MOCK: Fetching approved listings');
      
      try {
        // Always seed data on serverless to ensure listings exist
        console.log('🧪 MOCK: Seeding listings...');
        mockStore.seedListings();
        const seededListings = mockStore.getApprovedListings();
        console.log(`🧪 MOCK: Found ${seededListings.length} listings`);
        
        return NextResponse.json({
          success: true,
          listings: seededListings,
          _mock: true,
        });
      } catch (seedError: any) {
        console.error('🧪 MOCK: Seed error:', seedError);
        throw seedError;
      }
    }

    // ============================================
    // REAL MODE
    // ============================================
    await connectDB();

    if (wallet) {
      const listings = await Listing.find({ wallet })
        .sort({ createdAt: -1 });
      
      return NextResponse.json({
        success: true,
        listings,
      });
    }

    const listings = await Listing.find({
      approved: true,
      state: 'on_market',
    })
      .sort({ createdAt: -1 })
      .select('-deliveryUrl'); // Never expose delivery URL in list

    return NextResponse.json({
      success: true,
      listings,
    });
  } catch (error: any) {
    console.error('Get listings error:', error);
    console.error('Error stack:', error.stack);
    console.error('Error details:', JSON.stringify(error, null, 2));
    
    // FALLBACK: Return hardcoded listings if everything fails
    console.log('🧪 FALLBACK: Returning hardcoded listings');
    return NextResponse.json({
      success: true,
      listings: [
        {
          _id: 'fallback_1',
          wallet: 'demo',
          title: 'Advanced Trading Bot - MEV Arbitrage',
          description: 'High-frequency trading bot optimized for Solana DEX arbitrage. Includes advanced MEV strategies, customizable parameters, and detailed profit tracking. Built with Rust for maximum performance.',
          imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
          price: 49.99,
          category: 'Trading Bot',
          riskLevel: 'standard',
          state: 'on_market',
          approved: true,
          reportsCount: 0,
          failedPurchaseCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: 'fallback_2',
          wallet: 'demo',
          title: 'NFT Sniper Bot - Multi-Marketplace',
          description: 'Lightning-fast NFT minting and sniping bot supporting Magic Eden, Tensor, and other major Solana marketplaces. Real-time floor tracking and automated bidding.',
          imageUrl: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&h=600&fit=crop',
          price: 29.99,
          category: 'Trading Bot',
          riskLevel: 'standard',
          state: 'on_market',
          approved: true,
          reportsCount: 0,
          failedPurchaseCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      _mock: true,
      _fallback: true
    });
  }
}

// POST - Create new listing
export async function POST(req: NextRequest) {
  try {
    const { wallet, title, description, price, category, imageUrl } = await req.json();

    // Validation
    if (!wallet || !title || !description || !price || !category || !imageUrl) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate wallet
    try {
      new PublicKey(wallet);
    } catch {
      return NextResponse.json(
        { error: 'Invalid wallet address' },
        { status: 400 }
      );
    }

    // Validate title
    if (title.length < 5 || title.length > 100) {
      return NextResponse.json(
        { error: 'Title must be 5-100 characters' },
        { status: 400 }
      );
    }

    // Validate description
    if (description.length < 50 || description.length > 2000) {
      return NextResponse.json(
        { error: 'Description must be 50-2000 characters' },
        { status: 400 }
      );
    }

    // Validate price
    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0.10) {
      return NextResponse.json(
        { error: 'Price must be at least $0.10 USDC' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedTitle = sanitizeString(title);
    const sanitizedDescription = sanitizeString(description);

    // ============================================
    // MOCK MODE
    // ============================================
    if (CONFIG.MOCK_MODE) {
      console.log('🧪 MOCK: Creating listing');

      const listing = mockStore.createListing({
        wallet,
        title: sanitizedTitle,
        description: sanitizedDescription,
        price: priceNum,
        category,
        imageUrl,
      });

      return NextResponse.json({
        success: true,
        listing,
        _mock: true,
      });
    }

    // ============================================
    // REAL MODE
    // ============================================
    await connectDB();

    const listing = await Listing.create({
      wallet,
      title: sanitizedTitle,
      description: sanitizedDescription,
      price: priceNum,
      category,
      imageUrl,
      riskLevel: 'standard',
      state: 'in_review',
      approved: false,
    });

    return NextResponse.json({
      success: true,
      listing,
    });
  } catch (error: any) {
    console.error('Create listing error:', error);
    return NextResponse.json(
      { error: 'Failed to create listing' },
      { status: 500 }
    );
  }
}

