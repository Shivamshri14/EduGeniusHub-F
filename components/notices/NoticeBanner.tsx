'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Sparkles, ArrowRight, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2, Info } from 'lucide-react';
import { NoticeItem } from '@/lib/types';

export default function NoticeBanner() {
  const pathname = usePathname();
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = sessionStorage.getItem('egh_dismissed_notices');
      if (stored) {
        setDismissedIds(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }

    // Fetch active notices
    fetch('/api/notices')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.notices)) {
          setNotices(data.notices);
        }
      })
      .catch((err) => {
        console.warn('Failed to fetch notice banners:', err);
      });
  }, []);

  const handleDismiss = (id: string) => {
    const updated = [...dismissedIds, id];
    setDismissedIds(updated);
    try {
      sessionStorage.setItem('egh_dismissed_notices', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  // Don't render on admin page or if not mounted
  if (!mounted || pathname?.startsWith('/admin')) {
    return null;
  }

  // Find active notice not dismissed
  const activeNotice = notices.find((n) => !dismissedIds.includes(n.id));

  if (!activeNotice) {
    return null;
  }

  const IconComponent =
    activeNotice.variant === 'destructive'
      ? AlertTriangle
      : activeNotice.variant === 'success'
      ? CheckCircle2
      : activeNotice.variant === 'info'
      ? Info
      : Sparkles;

  return (
    <div className="bg-gradient-to-r from-orange-500 via-rose-500 to-violet-600 text-white">
      <div className="flex items-center gap-2 px-3 py-2 sm:gap-3 sm:px-5">
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide">
          <IconComponent className="h-3.5 w-3.5" />
          {activeNotice.badge || activeNotice.title}
        </span>
        <p className="min-w-0 flex-1 text-sm font-semibold leading-snug">{activeNotice.message}</p>
        {activeNotice.link && (
          <Link
            href={activeNotice.link}
            className="hidden shrink-0 items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-orange-600 sm:inline-flex"
          >
            {activeNotice.link_text || 'See products'}
            <ArrowRight className="h-3 w-3" />
          </Link>
        )}
        {activeNotice.is_dismissible && (
          <button
            onClick={() => handleDismiss(activeNotice.id)}
            className="shrink-0 rounded-full p-1 text-white/90 hover:bg-white/15"
            aria-label="Dismiss notice"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {activeNotice.link && (
        <Link href={activeNotice.link} className="block border-t border-white/20 px-3 py-1.5 text-center text-xs font-bold sm:hidden">
          {activeNotice.link_text || 'See products'}
        </Link>
      )}
    </div>
  );
}
