import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import {
  createShortenedLink,
  getUserShortenedLinks,
} from '@/db';
import { nanoid } from 'nanoid';

/**
 * POST /api/links - Create a new shortened link
 */
export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { url } = body;

    // Validate URL
    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL is required and must be a string' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Generate a unique short code
    const shortCode = nanoid(8);

    // Create the shortened link
    const result = await createShortenedLink(userId, url, shortCode);

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating shortened link:', error);
    return NextResponse.json(
      { error: 'Failed to create shortened link' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/links - Get all links for the authenticated user
 */
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const links = await getUserShortenedLinks(userId);

    return NextResponse.json(links);
  } catch (error) {
    console.error('Error fetching links:', error);
    return NextResponse.json(
      { error: 'Failed to fetch links' },
      { status: 500 }
    );
  }
}
