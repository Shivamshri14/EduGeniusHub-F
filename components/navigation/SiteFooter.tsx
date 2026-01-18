import Link from "next/link";
import { MessageCircle, Instagram } from "lucide-react";
import { SITE } from "@/lib/catalog";
import { buildWhatsAppLink } from "@/utils/whatsappMessageBuilder";

export default function SiteFooter() {

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">
              {SITE.brand}
            </h3>
            <p className="text-sm text-gray-400">
              Premium tools and reports at the lowest prices. Trusted by
              thousands of students and professionals.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Connect With Us</h3>
            <div className="space-y-3">
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
              >
                <Instagram className="h-4 w-4" />
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-gray-400">
            2024 {SITE.brand}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
