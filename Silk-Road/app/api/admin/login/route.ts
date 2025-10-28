import { NextRequest, NextResponse } from 'next/server';
import { CONFIG } from '@/config/constants';

export async function POST(req: NextRequest) {
  // Block if admin is disabled
  if (CONFIG.DISABLE_ADMIN) {
    return NextResponse.json(
      { error: 'Not Found' },
      { status: 404 }
    );
  }

  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Admin code is required' },
        { status: 400 }
      );
    }

    // Verify admin code
    if (code !== CONFIG.ADMIN_CODE) {
      return NextResponse.json(
        { error: 'Invalid admin code' },
        { status: 401 }
      );
    }

    // In mock mode, just return success
    // In real mode, you'd generate a JWT token here
    const response = NextResponse.json({
      success: true,
      _mock: CONFIG.MOCK_MODE,
    });

    // Set admin cookie (simple version for mock)
    response.cookies.set('admin_auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error: any) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}

