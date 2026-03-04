import { NextResponse } from 'next/server';
import { getShortenedLinkByCode } from '@/db';

/**
 * GET /r/[shortCode] - Redirect to the original URL
 * Public route - no authentication required
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  try {
    const { shortCode } = await params;
    const link = await getShortenedLinkByCode(shortCode);

    if (!link) {
      return NextResponse.json(
        { error: 'Link not found' },
        { status: 404 }
      );
    }

    // Redirect to the original URL
    return NextResponse.redirect(link.url, { status: 301 });
  } catch (error) {
    console.error('Error redirecting link:', error);
    return NextResponse.json(
      { error: 'Failed to redirect' },
      { status: 500 }
    );
  }
}
