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
    primary: 'bg-primary/10 border-b border-primary/20 text-foreground',
    warning: 'bg-amber-500/10 border-b border-amber-500/20 text-amber-900 dark:text-amber-200',
    info: 'bg-blue-500/10 border-b border-blue-500/20 text-blue-900 dark:text-blue-200',
    success: 'bg-emerald-500/10 border-b border-emerald-500/20 text-emerald-900 dark:text-emerald-200',
    destructive: 'bg-red-500/10 border-b border-red-500/20 text-red-900 dark:text-red-200',
  };

  const badgeStyles = {
    primary: 'bg-primary text-primary-foreground',
    warning: 'bg-amber-500 text-amber-950',
    info: 'bg-blue-500 text-blue-950',
    success: 'bg-emerald-500 text-emerald-950',
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
        'relative z-50 backdrop-blur-md transition-all duration-300 px-4 py-2.5 sm:py-2 text-xs sm:text-sm font-medium',
        styleClass
      )}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-1 min-w-0 justify-center sm:justify-start">
          {activeNotice.badge && (
            <span
              className={cn(
                'px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1 shrink-0 shadow-sm',
                badgeClass
              )}
            >
              <IconComponent className="w-3 h-3 shrink-0" />
              <span>{activeNotice.badge}</span>
            </span>
          )}

          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-center sm:text-left">
            <span className="font-semibold text-foreground">{activeNotice.title}:</span>
            <span className="text-muted-foreground">{activeNotice.message}</span>
          </div>

          {activeNotice.link && (
            <Link
              href={activeNotice.link}
              className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-bold shrink-0 underline decoration-primary/50 underline-offset-2 hover:scale-105 transition-transform ml-1"
            >
              <span>{activeNotice.link_text || 'Check Now'}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>

        {activeNotice.is_dismissible && (
          <button
            onClick={() => handleDismiss(activeNotice.id)}
            className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted transition-colors shrink-0"
            aria-label="Dismiss notice"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
