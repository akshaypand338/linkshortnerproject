'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Trash2 } from 'lucide-react';

interface ShortenedLink {
  id: number;
  clerkUserId: string;
  url: string;
  shortCode: string;
  createdAt: string;
  updatedAt: string;
}

interface DashboardContentProps {
  initialLinks: ShortenedLink[];
}

export function DashboardContent({ initialLinks }: DashboardContentProps) {
  const [links, setLinks] = useState<ShortenedLink[]>(initialLinks);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<{
    id: number;
    show: boolean;
  } | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create shortened link');
      }

      const newLink = await response.json();
      setUrl('');
      setLinks([newLink, ...links]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Are you sure you want to delete this link?')) {
      return;
    }

    try {
      const response = await fetch(`/api/links/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete link');
      }

      setLinks(links.filter((link) => link.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete link');
    }
  }

  function handleCopy(shortCode: string) {
    const baseUrl =
      typeof window !== 'undefined' ? window.location.origin : '';
    const shortUrl = `${baseUrl}/r/${shortCode}`;
    navigator.clipboard.writeText(shortUrl);

    setCopyFeedback({ id: Date.now(), show: true });
    setTimeout(() => {
      setCopyFeedback(null);
    }, 2000);
  }

  return (
    <>
      {/* Create New Link Form */}
      <div className="rounded-lg border border-slate-600 bg-slate-800/50 p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">
          Create New Link
        </h2>
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="url"
              className="block text-sm font-medium text-slate-200"
            >
              Long URL
            </label>
            <input
              id="url"
              type="url"
              placeholder="https://example.com/very/long/url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading || !url.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Short Link'}
          </Button>
        </form>
      </div>

      {/* Links List */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-white">
          Your Links ({links.length})
        </h2>
        {links.length === 0 ? (
          <div className="rounded-lg border border-slate-600 bg-slate-800/50 p-8 text-center">
            <p className="text-slate-400">No shortened links yet.</p>
            <p className="mt-2 text-sm text-slate-500">
              Create your first short link above!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {links.map((link) => (
              <div
                key={link.id}
                className="flex flex-col gap-3 rounded-lg border border-slate-600 bg-slate-800/50 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <code className="inline-block rounded bg-slate-900 px-2 py-1 text-sm font-mono text-blue-400">
                      /r/{link.shortCode}
                    </code>
                  </div>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block truncate text-sm text-slate-400 hover:text-slate-300"
                    title={link.url}
                  >
                    {link.url}
                  </a>
                  <p className="text-xs text-slate-500">
                    Created {new Date(link.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(link.shortCode)}
                    className="gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    <span className="hidden sm:inline">Copy</span>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(link.id)}
                    className="gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Delete</span>
                  </Button>
                </div>
              </div>
            ))}

            {copyFeedback?.show && (
              <div className="fixed bottom-4 right-4 rounded-lg bg-green-500/20 px-4 py-2 text-sm text-green-400">
                Copied to clipboard!
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
