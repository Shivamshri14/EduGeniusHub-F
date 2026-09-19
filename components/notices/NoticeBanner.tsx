'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Sparkles, ArrowRight, Bell, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2, Info } from 'lucide-react';
import { NoticeItem } from '@/lib/types';
import { cn } from '@/lib/utils';

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

  // Variant color styles
  const variantStyles = {
    primary: 'bg-gradient-to-r from-primary/15 to-primary/5 border-b-2 border-primary/30 text-foreground',
    warning: 'bg-gradient-to-r from-amber-500/20 to-amber-500/5 border-b-2 border-amber-500/40 text-amber-950 dark:text-amber-100',
    info: 'bg-gradient-to-r from-blue-500/20 to-blue-500/5 border-b-2 border-blue-500/40 text-blue-950 dark:text-blue-100',
    success: 'bg-gradient-to-r from-emerald-500/20 to-emerald-500/5 border-b-2 border-emerald-500/40 text-emerald-950 dark:text-emerald-100',
    destructive: 'bg-gradient-to-r from-red-500/20 to-red-500/5 border-b-2 border-red-500/40 text-red-950 dark:text-red-100',
  };

  const badgeStyles = {
    primary: 'bg-primary text-primary-foreground',
    warning: 'bg-amber-500 text-white',
    info: 'bg-blue-500 text-white',
    success: 'bg-emerald-500 text-white',
    destructive: 'bg-red-500 text-white',
  };

  const styleClass = variantStyles[activeNotice.variant] || variantStyles.primary;
  const badgeClass = badgeStyles[activeNotice.variant] || badgeStyles.primary;

  const IconComponent =
    activeNotice.variant === 'destructive'
      ? AlertTriangle
      : activeNotice.variant === 'success'
      ? CheckCircle2
      : activeNotice.variant === 'info'
      ? Info
      : Sparkles;

  return (
    <div
      className={cn(
        'relative z-50 backdrop-blur-md transition-all duration-300 px-3 py-3 sm:px-4 sm:py-3 text-sm sm:text-base font-semibold shadow-md',
        styleClass
      )}
    >
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-2 pr-8 sm:flex-row sm:justify-between sm:gap-3 sm:pr-0">
        <div className="flex w-full min-w-0 flex-col items-center gap-1.5 text-center sm:w-auto sm:flex-1 sm:flex-row sm:items-center sm:justify-start sm:gap-2.5 sm:text-left">
          {activeNotice.badge && (
            <span
              className={cn(
                'shrink-0 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm',
                badgeClass
              )}
            >
              <IconComponent className="w-3.5 h-3.5 shrink-0 animate-pulse" />
              <span>{activeNotice.badge}</span>
            </span>
          )}

          <div className="flex min-w-0 flex-col items-center gap-0.5 leading-snug sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2 sm:gap-y-0 sm:text-left">
            <span className="font-bold text-foreground">{activeNotice.title}:</span>
            <span className="text-muted-foreground">{activeNotice.message}</span>
          </div>

          {activeNotice.link && (
            <Link
              href={activeNotice.link}
              className="inline-flex shrink-0 items-center gap-1 text-primary hover:text-primary/80 font-bold underline decoration-primary/50 underline-offset-2 transition-transform hover:scale-105 sm:ml-1"
            >
              <span>{activeNotice.link_text || 'Check Now'}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>

        {activeNotice.is_dismissible && (
          <button
            onClick={() => handleDismiss(activeNotice.id)}
            className="absolute right-0 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:static sm:shrink-0 sm:translate-y-0"
            aria-label="Dismiss notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
