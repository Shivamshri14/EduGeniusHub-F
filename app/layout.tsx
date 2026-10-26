import { Suspense } from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SiteNavbar from '@/components/navigation/SiteNavbar';
import ConditionalFooter from '@/components/navigation/ConditionalFooter';
import MobileActionBar from '@/components/navigation/MobileActionBar';
import LiveActivityNotification from '@/components/whatsapp/LiveActivityNotification';
import ConditionalWhatsApp from '@/components/whatsapp/ConditionalWhatsApp';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';
import { CANONICAL_ORIGIN } from '@/lib/publicCopy';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_ORIGIN),
  title: {
    default: 'EduGenius Hub',
    template: '%s',
  },
  description: 'EduGenius Hub provides website making, Google Business Profile setup, social media design, WhatsApp bot setup, plagiarism check, thesis formatting, PPT and resume making, tool access, and subscriptions. Order on WhatsApp.',
  alternates: { canonical: CANONICAL_ORIGIN },
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
  openGraph: {
    title: 'EduGenius Hub',
    description: 'EduGenius Hub provides website making, Google Business Profile setup, social media design, WhatsApp bot setup, plagiarism check, thesis formatting, PPT and resume making, tool access, and subscriptions. Order on WhatsApp.',
    url: CANONICAL_ORIGIN,
    siteName: 'EduGenius Hub',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>
            <SiteNavbar />
          </Suspense>
          <div className="pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0">{children}</div>
          <ConditionalFooter />
          <LiveActivityNotification />
          <MobileActionBar />
          <ConditionalWhatsApp />
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
