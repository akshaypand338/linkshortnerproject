'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';

interface ShortenedLink {
  id: number;
  clerkUserId: string;
  url: string;
  shortCode: string;
  createdAt: string;
  updatedAt: string;
}

interface NewLinkFormProps {
  onLinkCreated: (link: ShortenedLink) => void;
}

export function NewLinkForm({ onLinkCreated }: NewLinkFormProps) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      onLinkCreated(newLink);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
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
  );
}
