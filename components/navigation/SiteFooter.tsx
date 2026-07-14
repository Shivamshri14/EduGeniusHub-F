import Link from 'next/link';
import { Zap, MessageCircle, Instagram, Phone, Mail, ExternalLink } from 'lucide-react';

const WA_URL = 'https://wa.me/918766253356';
const IG_URL = 'https://www.instagram.com/turnitin__plagiarism';
const WA_COMMUNITY = 'https://chat.whatsapp.com/FtMZUM8Ql41IkUXSmw3pBU';
const PHONE = '+91 87662 53356';

export default function SiteFooter() {
  return (
    <footer className="bg-[#0B1F3A] text-white">
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-10">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <img src="/logo.jpg" alt="EduGenius Hub" className="h-9 w-auto rounded-xl object-contain shadow" />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Premium digital products at student prices. Turnitin reports, AI tools, OTT subscriptions and more.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#25D366]/15 border border-[#25D366]/25 flex items-center justify-center hover:bg-[#25D366]/25 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
              </a>
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-pink-500/15 border border-pink-500/25 flex items-center justify-center hover:bg-pink-500/25 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-xs mb-4 text-gray-400 uppercase tracking-widest">Products</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Turnitin Reports', href: '/products?category=reports' },
                { label: 'AI Tools', href: '/products?category=ai_tools' },
                { label: 'Student Accounts', href: '/products?category=accounts' },
                { label: 'OTT Subscriptions', href: '/products?category=ott' },
                { label: 'Best Sellers', href: '/products' },
              ].map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-xs mb-4 text-gray-400 uppercase tracking-widest">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '/home' },
                { label: 'All Products', href: '/products' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Community', href: WA_COMMUNITY, external: true },
              ].map((link) => (
                <li key={link.label}>
                  {'external' in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    </a>
                  ) : (
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <h4 className="font-semibold text-xs mt-6 mb-4 text-gray-400 uppercase tracking-widest">Legal</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Terms of Service', href: '/home' },
                { label: 'Privacy Policy', href: '/home' },
                { label: 'Disclaimer', href: '/home' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-xs mb-4 text-gray-400 uppercase tracking-widest">Contact</h4>
            <div className="space-y-3">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group"
              >
                <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                </span>
                WhatsApp Support
              </a>
              <a
                href={`mailto:support@edugeniushub.com`}
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors group"
              >
                <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Mail className="w-4 h-4 text-white" />
                </span>
                support@edugeniushub.com
              </a>
            </div>

            <div className="mt-5 p-4 rounded-xl bg-white/4 border border-white/8">
              <p className="text-xs text-gray-500 mb-1">Average reply time</p>
              <p className="text-sm font-bold text-white">Under 2 minutes</p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-gray-400">Support online now</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} EduGenius Hub. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            www.edugeniushub.com
          </p>
        </div>
      </div>
    </footer>
  );
}
