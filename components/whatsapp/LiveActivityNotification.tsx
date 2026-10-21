'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ShoppingBag, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAMES = ['Anjali', 'Amit', 'Rahul', 'Priya', 'Sneha', 'Rohan', 'Neha', 'Ravi', 'Divya', 'Aditya'];
const CITIES = ['Delhi', 'Mumbai', 'Pune', 'Bangalore', 'Jaipur', 'Lucknow', 'Noida', 'Chandigarh'];
const PRODUCTS = [
  'EduGenius Similarity Report',
  'EduGenius AI-Writing Check',
  'EduGenius Combo Report',
  'ChatGPT Plus',
  'QuillBot Premium',
  'Grammarly Premium',
  'Netflix Premium',
  'Prime Video',
];
const TIMES = ['2 mins ago', '5 mins ago', '7 mins ago', '11 mins ago'];

export default function LiveActivityNotification() {
  const pathname = usePathname();
  const [notification, setNotification] = useState<{ name: string; city: string; product: string; time: string } | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname?.startsWith('/admin')) return;

    const triggerNotification = () => {
      setNotification({
        name: NAMES[Math.floor(Math.random() * NAMES.length)],
        city: CITIES[Math.floor(Math.random() * CITIES.length)],
        product: PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)],
        time: TIMES[Math.floor(Math.random() * TIMES.length)],
      });
      setVisible(true);
      window.setTimeout(() => setVisible(false), 7000);
    };

    const initialDelay = window.setTimeout(triggerNotification, 2500);
    const interval = window.setInterval(triggerNotification, 22000);

    return () => {
      window.clearTimeout(initialDelay);
      window.clearInterval(interval);
    };
  }, [pathname]);

  if (!notification || pathname?.startsWith('/admin')) return null;

  return (
    <div
      className={cn(
        'fixed left-3 z-50 w-[min(92vw,340px)] transition-all duration-500 ease-out bottom-[calc(4.75rem+env(safe-area-inset-bottom))] md:bottom-6 md:left-6',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-8 opacity-0'
      )}
    >
      <div className="flex items-start gap-3 rounded-2xl border border-orange-100 bg-white p-4 text-slate-900 shadow-2xl dark:border-slate-700 dark:bg-slate-900 dark:text-white">
        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white">
          <ShoppingBag className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1 pr-2">
          <p className="text-sm font-bold leading-tight">
            {notification.name} <span className="font-medium text-slate-500 dark:text-slate-300">from {notification.city}</span>
          </p>
          <p className="mt-1 text-sm leading-snug">
            bought <span className="font-semibold">{notification.product}</span>
          </p>
          <p className="mt-1 text-xs font-semibold text-emerald-600">{notification.time}</p>
        </div>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="shrink-0 rounded-lg p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white"
          aria-label="Dismiss purchase notice"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
