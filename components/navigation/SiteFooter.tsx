import type { ReactNode } from 'react';
import Link from 'next/link';
import { Clapperboard, FileText, Home, Instagram, KeyRound, Mail, MessageCircle, Shield, Sparkles } from 'lucide-react';
import { SITE } from '@/lib/config';
import { TRADEMARK_DISCLAIMER } from '@/lib/publicCopy';

const WA_URL = `https://wa.me/${SITE.phoneE164}`;
const IG_URL = SITE.instagramUrl;
const WA_COMMUNITY = SITE.whatsappCommunityUrl;

const productLinks = [
  { label: 'Reports', href: '/products?category=reports', Icon: FileText },
  { label: 'AI tools', href: '/products?category=ai_tools', Icon: Sparkles },
  { label: 'Accounts', href: '/products?category=accounts', Icon: KeyRound },
  { label: 'OTT', href: '/products?category=ott', Icon: Clapperboard },
];

const companyLinks = [
  { label: 'Home', href: '/', Icon: Home },
  { label: 'All products', href: '/products', Icon: Sparkles },
  { label: 'Contact', href: '/contact', Icon: Mail },
];

const legalLinks = [
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Refund and cancellation', href: '/refund-policy' },
  { label: 'Disclaimer', href: '/disclaimer' },
];

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-sky-300">{title}</h2>
      {children}
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer className="border-t border-blue-800 bg-blue-950 text-white">
      <div className="mx-auto max-w-6xl px-4 pb-28 pt-12 md:pb-10">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="inline-flex items-center gap-3">
            <img src="/logo.jpg" alt="" className="h-12 w-12 rounded-xl object-cover" />
            <span>
              <span className="block text-lg font-black tracking-tight">EduGenius Hub</span>
              <span className="text-sm text-white/60">Reports, tools, and custom websites</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center gap-2 rounded-xl bg-[#25D366] px-4 text-sm font-bold text-white">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="Products">
            <ul className="space-y-2 text-sm">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex items-center gap-2 text-white/75 hover:text-white">
                    <link.Icon className="h-4 w-4 text-sky-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Company">
            <ul className="space-y-2 text-sm">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="inline-flex items-center gap-2 text-white/75 hover:text-white">
                    <link.Icon className="h-4 w-4 text-sky-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={WA_COMMUNITY} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/75 hover:text-white">
                  <MessageCircle className="h-4 w-4 text-sky-300" />
                  Community
                </a>
              </li>
            </ul>
          </FooterColumn>

          <FooterColumn title="Legal">
            <ul className="space-y-2 text-sm">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="inline-flex items-center gap-2 text-white/75 hover:text-white">
                    <Shield className="h-4 w-4 text-sky-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Contact">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="mb-3 flex items-center gap-2 text-sm text-white/75 hover:text-white">
              <MessageCircle className="h-4 w-4 shrink-0 text-sky-300" />
              +91 87662 53356
            </a>
            <a href="mailto:support@edugeniushub.com" className="flex items-center gap-2 text-sm text-white/75 hover:text-white">
              <Mail className="h-4 w-4 shrink-0 text-sky-300" />
              support@edugeniushub.com
            </a>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              Grievance: same email or WhatsApp.
            </p>
          </FooterColumn>
        </div>

        <p className="border-t border-white/10 pt-6 text-xs leading-relaxed text-white/50">{TRADEMARK_DISCLAIMER}</p>
        <p className="mt-3 text-sm text-white/60">© {new Date().getFullYear()} EduGenius Hub · edugeniushub.in</p>
      </div>
    </footer>
  );
}
