'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { SITE } from '@/lib/config';

export default function ReplyToast() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  if (!open || pathname?.startsWith('/admin')) return null;

  return (
    <div
      className="fixed left-3 z-40 bottom-[calc(4.6rem+env(safe-area-inset-bottom))] md:bottom-6"
    >
      <div className="flex max-w-[280px] items-center gap-2 rounded-2xl border border-emerald-200 bg-white px-3 py-2.5 shadow-xl shadow-emerald-900/10">
        <span className="relative flex h-3 w-3 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
        </span>
        <a
          href={`https://wa.me/${SITE.phoneE164}`}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 flex-1"
        >
          <p className="text-xs font-bold text-emerald-800">WhatsApp is on</p>
          <p className="text-[11px] font-semibold leading-tight text-slate-600">Replies in under 2 minutes</p>
        </a>
        <MessageCircle className="h-4 w-4 shrink-0 text-emerald-600" />
        <button type="button" aria-label="Dismiss reply notice" onClick={() => setOpen(false)} className="text-slate-400">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
