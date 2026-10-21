'use client';

import { usePathname } from 'next/navigation';
import { SITE } from '@/lib/config';

const COMMUNITY = SITE.whatsappCommunityUrl;
const WHATSAPP = `https://wa.me/${SITE.phoneE164}?text=${encodeURIComponent('Hi EduGenius Hub, I want to know more about your products. Please guide me.')}`;

export default function MobileActionBar() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;

  return (
    <nav
      aria-label="Contact EduGenius Hub"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-2">
        <a
          href={COMMUNITY}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-3 text-center text-sm font-semibold leading-tight text-foreground"
          style={{ minHeight: 48 }}
        >
          <span aria-hidden className="text-lg leading-none">👥</span>
          Join Community
        </a>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#128C7E] px-3 text-center text-sm font-semibold leading-tight text-white"
          style={{ minHeight: 48 }}
        >
          <span aria-hidden className="text-lg leading-none">💬</span>
          WhatsApp Now
        </a>
      </div>
    </nav>
  );
}
