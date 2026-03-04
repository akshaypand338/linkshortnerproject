'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { NewLinkForm } from '@/app/components/new-link-form';
import { LinkList } from '@/app/components/link-list';
import { Loader } from 'lucide-react';

interface ShortenedLink {
  id: number;
  clerkUserId: string;
  url: string;
  shortCode: string;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const { userId, isLoaded } = useAuth();
  const [links, setLinks] = useState<ShortenedLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    if (!userId) {
      return;
    }

    fetchLinks();
  }, [isLoaded, userId]);

  async function fetchLinks() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/links');

      if (!response.ok) {
        throw new Error('Failed to fetch links');
      }

      const data = await response.json();
      setLinks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="rounded-lg border border-slate-600 bg-slate-800/50 p-8 text-center">
        <p className="text-slate-400">Please sign in to access the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400">Create and manage your shortened links</p>
        </div>

        <div className="rounded-lg border border-slate-600 bg-slate-800/50 p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">
            Create New Link
          </h2>
          <NewLinkForm onLinkCreated={(newLink) => setLinks([newLink, ...links])} />
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold text-white">
            Your Links ({links.length})
          </h2>
          {error && (
            <div className="rounded-lg bg-red-500/10 p-4 text-red-400 mb-4">
              {error}
            </div>
          )}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="h-8 w-8 animate-spin text-blue-400" />
            </div>
          ) : (
            <LinkList
              links={links}
              onLinkDeleted={(id) =>
                setLinks(links.filter((link) => link.id !== id))
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
