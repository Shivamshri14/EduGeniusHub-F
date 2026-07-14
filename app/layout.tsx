import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SiteNavbar from '@/components/navigation/SiteNavbar';
import ConditionalFooter from '@/components/navigation/ConditionalFooter';
import ConditionalWhatsApp from '@/components/whatsapp/ConditionalWhatsApp';
import LiveActivityNotification from '@/components/whatsapp/LiveActivityNotification';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EduGenius Hub - Premium Digital Products at Student Prices',
  description: 'Get Turnitin reports, ChatGPT, Netflix and more at the lowest prices. Trusted by 5000+ students. Instant delivery via WhatsApp.',
  keywords: 'Turnitin report, ChatGPT, Netflix, QuillBot, student tools, premium accounts, EduGenius Hub',
  icons: {
    icon: '/logo.jpg',
    apple: '/logo.jpg',
  },
  openGraph: {
    title: 'EduGenius Hub - Premium Digital Products at Student Prices',
    description: 'Get Turnitin reports, AI tools, OTT subscriptions at student prices. Trusted by 5000+ students.',
    url: 'https://www.edugeniushub.com',
    siteName: 'EduGenius Hub',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SiteNavbar />
          {children}
          <ConditionalFooter />
          <ConditionalWhatsApp />
          <LiveActivityNotification />
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
