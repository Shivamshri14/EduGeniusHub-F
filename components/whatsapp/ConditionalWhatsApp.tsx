'use client';

import { usePathname } from 'next/navigation';
import WhatsAppFloatingButton from './WhatsAppFloatingButton';

export default function ConditionalWhatsApp() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return <WhatsAppFloatingButton />;
}
