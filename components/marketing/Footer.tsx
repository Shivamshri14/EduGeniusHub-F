import Link from "next/link";
import { SITE } from "@/lib/config";
import { MessageCircle, Instagram } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">{SITE.brand}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Premium subscription tools for students and professionals. Fast delivery, trusted service, simple support.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">
                Home
              </Link>
              <Link href="/tools" className="text-slate-400 hover:text-white transition-colors text-sm">
                Browse Tools
              </Link>
              <Link href="/contact" className="text-slate-400 hover:text-white transition-colors text-sm">
                Contact Us
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex flex-col gap-3">
              <a
                href={SITE.whatsappCommunityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
              >
                <MessageCircle size={18} />
                <span>WhatsApp Community</span>
              </a>
              {SITE.instagramUrl && (
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
                >
                  <Instagram size={18} />
                  <span>Instagram</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 dark:border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            &copy; {currentYear} {SITE.brand}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
