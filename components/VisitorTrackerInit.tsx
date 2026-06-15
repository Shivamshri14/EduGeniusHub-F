'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackVisit } from '@/utils/visitorTracker';

export default function VisitorTrackerInit() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname?.startsWith('/admin')) {
      trackVisit(pathname ?? '/');
    }
  }, [pathname]);

  return null;
}
