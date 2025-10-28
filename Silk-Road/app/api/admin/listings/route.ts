import { NextRequest, NextResponse } from 'next/server';
import { CONFIG } from '@/config/constants';
import { mockStore } from '@/lib/mockStore';
import { connectDB } from '@/lib/db';
import { Listing } from '@/models/Listing';

// Middleware to check admin auth
function checkAdminAuth(req: NextRequest): boolean {
  const adminAuth = req.cookies.get('admin_auth');
  return adminAuth?.value === 'true';
}

export async function GET(req: NextRequest) {
  // Block if admin is disabled
  if (CONFIG.DISABLE_ADMIN) {
    return NextResponse.json(
      { error: 'Not Found' },
      { status: 404 }
    );
  }

  try {
    // Check admin auth
    if (!checkAdminAuth(req)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // ============================================
    // MOCK MODE
    // ============================================
    if (CONFIG.MOCK_MODE) {
      console.log('🧪 MOCK: Admin fetching all listings');
      
      // Get all listings (not just approved)
      const allListings = Array.from((mockStore as any).getAllListings?.() || []);
      
      return NextResponse.json({
        success: true,
        listings: allListings,
        _mock: true,
      });
    }

    // ============================================
    // REAL MODE
    // ============================================
    await connectDB();

    const listings = await Listing.find({})
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      listings,
    });
  } catch (error: any) {
    console.error('Admin get listings error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    );
  }
}

