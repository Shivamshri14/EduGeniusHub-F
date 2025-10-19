import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SITE } from '@/lib/config';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'] });

export const metadata: Metadata = {
  title: `${SITE.brand} - Premium Subscription Tools`,
  description: 'Access premium subscription tools for students and professionals. Fast delivery, trusted service, simple support.',
  openGraph: {
    title: `${SITE.brand} - Premium Subscription Tools`,
    description: 'Access premium subscription tools for students and professionals.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
