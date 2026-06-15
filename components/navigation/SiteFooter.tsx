import Link from 'next/link';
import { Zap, Instagram, MessageCircle } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="bg-[#0B1220] text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#FFD60A] flex items-center justify-center">
                <Zap className="w-4 h-4 text-[#0B1220]" fill="currentColor" />
              </div>
              <span className="font-bold text-base">
                EduGenius <span className="text-[#FFD60A]">Hub</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premium digital products at student prices. Turnitin reports, AI tools, OTT subscriptions and more.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-300 uppercase tracking-wider">Products</h4>
            <ul className="space-y-2">
              {[
                { label: 'Turnitin Reports', href: '/products?category=reports' },
                { label: 'AI Tools', href: '/products?category=ai_tools' },
                { label: 'OTT Subscriptions', href: '/products?category=ott' },
                { label: 'Student Accounts', href: '/products?category=accounts' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-300 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/home' },
                { label: 'All Products', href: '/products' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-gray-300 uppercase tracking-wider">Contact</h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/918766253356"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                WhatsApp Support
              </a>
              <a
                href="https://instagram.com/edugeniushub"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                @edugeniushub
              </a>
            </div>
            <div className="mt-6 p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-gray-400">Average reply time</p>
              <p className="text-sm font-semibold text-[#FFD60A]">Under 5 minutes</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
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
