import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { deleteShortenedLink } from '@/db';

/**
 * DELETE /api/links/[id] - Delete a shortened link
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const linkId = parseInt(id, 10);

    if (isNaN(linkId)) {
      return NextResponse.json(
        { error: 'Invalid link ID' },
        { status: 400 }
      );
    }

    // Delete the link (authorization check is built into the function)
    await deleteShortenedLink(linkId, userId);

    return NextResponse.json(
      { message: 'Link deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting link:', error);
    return NextResponse.json(
      { error: 'Failed to delete link' },
      { status: 500 }
    );
  }
}
