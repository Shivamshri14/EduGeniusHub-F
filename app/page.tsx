import type { Metadata } from 'next';
import HomePage from './(routes)/home/HomePage';
import { CANONICAL_ORIGIN } from '@/lib/publicCopy';

export const metadata: Metadata = {
  title: 'EduGenius Hub',
  description: 'Reports, tool access, subscriptions, academic help, and websites. Message on WhatsApp to order.',
  alternates: { canonical: CANONICAL_ORIGIN },
};

export default function Home() {
  return <HomePage />;
}
