import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SiteNavbar from '@/components/navigation/SiteNavbar';
import SiteFooter from '@/components/navigation/SiteFooter';
import WhatsAppFloatingButton from '@/components/whatsapp/WhatsAppFloatingButton';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EduGenius Hub - Premium Tools & Reports',
  description: 'Premium academic tools and reports at lowest prices. Turnitin, ChatGPT, Grammarly, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SiteNavbar />
          {children}
          <SiteFooter />
          <WhatsAppFloatingButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
