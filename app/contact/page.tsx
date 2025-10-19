import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { WhatsAppBar } from "@/components/marketing/WhatsAppBar";
import { ContactPanel } from "@/components/marketing/ContactPanel";
import { SITE } from "@/lib/config";
import { MessageCircle, Instagram, Mail } from "lucide-react";
import { waDirectLink } from "@/lib/whatsapp";

export const metadata = {
  title: `Contact Us - ${SITE.brand}`,
  description: "Get in touch with us via WhatsApp, Instagram, or email.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <section className="py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Contact Us
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400">
                We're here to help! Reach out to us through any of these channels.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <a
                href={waDirectLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-8 hover:border-green-400 dark:hover:border-green-600 transition-all hover:shadow-lg group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <MessageCircle className="text-white" size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">WhatsApp</h2>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                  Chat with us directly for instant support
                </p>
                <p className="text-green-600 dark:text-green-400 font-semibold text-lg">
                  {SITE.phoneDisplay}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500 mt-2 group-hover:text-green-600 dark:group-hover:text-green-400">
                  Click to start chat →
                </p>
              </a>

              {SITE.instagramUrl && (
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-50 dark:bg-pink-900/20 border-2 border-pink-200 dark:border-pink-800 rounded-xl p-8 hover:border-pink-400 dark:hover:border-pink-600 transition-all hover:shadow-lg group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                      <Instagram className="text-white" size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Instagram</h2>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-2">
                    Follow us for updates and offers
                  </p>
                  <p className="text-pink-600 dark:text-pink-400 font-semibold text-lg">
                    @edugeniushub
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-500 mt-2 group-hover:text-pink-600 dark:group-hover:text-pink-400">
                    Click to follow →
                  </p>
                </a>
              )}
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-8 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Join Our Community
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Connect with thousands of users, get exclusive deals, and stay updated.
              </p>
              <a
                href={SITE.whatsappCommunityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-lg"
              >
                <MessageCircle size={20} />
                <span>Join WhatsApp Community</span>
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <WhatsAppBar />
    </>
  );
}
