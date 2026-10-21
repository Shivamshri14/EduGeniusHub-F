'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Clapperboard, FileText, Home, Mail, Menu, Package, Search, ShoppingBag, Sparkles, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import NoticeBanner from '@/components/notices/NoticeBanner';

const navLinks = [
  { label: 'Home', href: '/', Icon: Home },
  { label: 'Products', href: '/products', Icon: ShoppingBag },
  { label: 'Reports', href: '/products?category=reports', Icon: FileText },
  { label: 'AI Tools', href: '/products?category=ai_tools', Icon: Sparkles },
  { label: 'OTT', href: '/products?category=ott', Icon: Clapperboard },
  { label: 'Contact', href: '/contact', Icon: Mail },
];

const WA_ICON = (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-current" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371.074-.57.074-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c0 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const category = useSearchParams().get('category');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname, category]);

  if (pathname?.startsWith('/admin')) return null;

  return (
    <header className="pointer-events-none sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="pointer-events-auto relative mx-auto max-w-6xl">
      <div className={cn('overflow-hidden rounded-2xl border border-orange-200 bg-white text-slate-900 shadow-lg shadow-orange-900/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white', scrolled && 'shadow-xl')}>
        <NoticeBanner />
        <div className="relative flex h-16 items-center justify-between gap-3 px-3 sm:px-4">
          <Link href="/" className="group flex min-w-0 shrink items-center gap-2.5">
            <img src="/logo.jpg" alt="" className="h-10 w-10 shrink-0 rounded-xl object-cover ring-2 ring-orange-100 dark:ring-slate-700" />
            <span className="truncate text-base font-black tracking-tight text-slate-900 dark:text-white">EduGenius Hub</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const [path, query] = link.href.split('?');
              const want = query ? new URLSearchParams(query).get('category') : null;
              const active = want
                ? pathname === '/products' && category === want
                : pathname === path && !category;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold transition-all',
                    active
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-orange-50 hover:text-orange-600 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
                  )}
                >
                  <link.Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />
            <Link href="/products" className="hidden lg:flex" aria-label="Search products">
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-foreground/5">
                <Search className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/products" className="lg:hidden">
              <Button variant="outline" size="sm" className="h-9 rounded-xl border-border/70 bg-background/35 px-3 text-xs font-semibold">
                <Package className="mr-1.5 h-3.5 w-3.5" />
                <span className="hidden xs:inline sm:inline">Browse</span>
              </Button>
            </Link>
            <a
              href="https://wa.me/918766253356"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-[#25D366] px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:scale-[1.03] hover:bg-[#1ebe5d] sm:px-4"
            >
              {WA_ICON}
              <span className="hidden sm:inline">Chat</span>
            </a>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl hover:bg-foreground/5 lg:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

        </div>
      </div>
      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-2xl border border-orange-100 bg-white p-2.5 shadow-2xl dark:border-slate-700 dark:bg-slate-950 lg:hidden">
          {navLinks.map((link) => {
            const [path, query] = link.href.split('?');
            const want = query ? new URLSearchParams(query).get('category') : null;
            const active = want ? pathname === '/products' && category === want : pathname === path;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors',
                  active ? 'bg-orange-500 text-white' : 'text-slate-700 hover:bg-orange-50 dark:text-slate-200 dark:hover:bg-white/10'
                )}
              >
                <link.Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
          <a
            href="https://wa.me/918766253356"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#1ebe5d]"
          >
            {WA_ICON}
            Chat on WhatsApp
          </a>
        </div>
      )}
      </div>
    </header>
  );
}
