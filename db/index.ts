import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { shortenedLinks } from './schema';

const db = drizzle(process.env.DATABASE_URL!);

/**
 * Create a new shortened link
 */
export async function createShortenedLink(
  clerkUserId: string,
  url: string,
  shortCode: string
) {
  return db
    .insert(shortenedLinks)
    .values({
      clerkUserId,
      url,
      shortCode,
    })
    .returning();
}

/**
 * Get a shortened link by short code
 */
export async function getShortenedLinkByCode(shortCode: string) {
  const result = await db
    .select()
    .from(shortenedLinks)
    .where(eq(shortenedLinks.shortCode, shortCode));

  return result[0] || null;
}

/**
 * Get all shortened links for a user
 */
export async function getUserShortenedLinks(clerkUserId: string) {
  return db
    .select()
    .from(shortenedLinks)
    .where(eq(shortenedLinks.clerkUserId, clerkUserId))
    .orderBy(shortenedLinks.createdAt);
}

/**
 * Delete a shortened link by ID
 */
export async function deleteShortenedLink(id: number, clerkUserId: string) {
  const result = await db
    .delete(shortenedLinks)
    .where(
      eq(shortenedLinks.id, id) && eq(shortenedLinks.clerkUserId, clerkUserId)
    )
    .returning();

  return result[0] || null;
}

export { db };