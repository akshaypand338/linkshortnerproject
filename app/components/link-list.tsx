'use client';

import { useState } from 'react';
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

interface LinkListProps {
  links: ShortenedLink[];
  onLinkDeleted: (id: number) => void;
}

export function LinkList({ links, onLinkDeleted }: LinkListProps) {
  const [copyFeedback, setCopyFeedback] = useState<{
    id: number;
    show: boolean;
  } | null>(null);

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

      onLinkDeleted(id);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete link');
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

  if (links.length === 0) {
    return (
      <div className="rounded-lg border border-slate-600 bg-slate-800/50 p-8 text-center">
        <p className="text-slate-400">No shortened links yet.</p>
        <p className="mt-2 text-sm text-slate-500">
          Create your first short link above!
        </p>
      </div>
    );
  }

  return (
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
  );
}
