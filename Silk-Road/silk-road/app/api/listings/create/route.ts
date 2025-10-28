import { NextRequest, NextResponse } from 'next/server';
import { PublicKey } from '@solana/web3.js';
import { CONFIG } from '@/config/constants';
import { mockStore } from '@/lib/mockStore';
import { connectDB } from '@/lib/db';
import { Listing } from '@/models/Listing';
import { sanitizeString } from '@/lib/validation/sanitization';

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

