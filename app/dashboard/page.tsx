import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserShortenedLinks } from '@/db';
import { DashboardContent } from '@/app/components/dashboard-content';

interface ShortenedLink {
  id: number;
  clerkUserId: string;
  url: string;
  shortCode: string;
  createdAt: string;
  updatedAt: string;
}

export default async function DashboardPage() {
  const { userId } = await auth();

  // Protect route - redirect unauthenticated users
  if (!userId) {
    redirect('/');
  }

  // Fetch user's links server-side
  let links: ShortenedLink[] = [];
  let error: string | null = null;

  try {
    const fetchedLinks = await getUserShortenedLinks(userId);
    links = fetchedLinks.map((link) => ({
      ...link,
      createdAt: link.createdAt instanceof Date ? link.createdAt.toISOString() : link.createdAt,
      updatedAt: link.updatedAt instanceof Date ? link.updatedAt.toISOString() : link.updatedAt,
    }));
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch links';
    console.error('Error fetching links:', err);
  }

  return (
    <div className="mx-auto max-w-4xl py-12 px-4">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400">Create and manage your shortened links</p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-500/10 p-4 text-red-400">
            {error}
          </div>
        )}

        <DashboardContent initialLinks={links} />
      </div>
    </div>
  );
}
