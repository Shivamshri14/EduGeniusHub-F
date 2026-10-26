import type { Metadata } from 'next';
import HomePage from './(routes)/home/HomePage';
import { CANONICAL_ORIGIN } from '@/lib/publicCopy';

export const metadata: Metadata = {
  title: 'EduGenius Hub | Services, Reports, Tool Access & Websites',
  description: 'EduGenius Hub offers website making, Google Business Profile setup, social media design, WhatsApp bot setup, plagiarism check, thesis formatting, PPT and resume making, academic help, and subscriptions. Order on WhatsApp.',
  alternates: { canonical: CANONICAL_ORIGIN },
};

export default function Home() {
  return <HomePage />;
}
