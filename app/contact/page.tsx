<<<<<<< HEAD
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { WhatsAppBar } from "@/components/marketing/WhatsAppBar";
import { ContactPanel } from "@/components/marketing/ContactPanel";
import { SITE } from "@/lib/config";
import { MessageCircle, Instagram, Mail } from "lucide-react";
import { waDirectLink } from "@/lib/whatsapp-message";
import { fetchSiteConfig } from "@/lib/sheets-api";

export const metadata = {
  title: `Contact Us - ${SITE.brand}`,
  description: "Get in touch with us via WhatsApp, Instagram, or email.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const site = await fetchSiteConfig();
  const phoneDisplay = site.supportPhoneDisplay || SITE.phoneDisplay;
  const phoneE164 = site.supportPhoneE164 || SITE.phoneE164;
  const instagramUrl = site.instagramUrl || SITE.instagramUrl;
  const whatsappCommunityUrl = site.whatsappCommunityUrl || SITE.whatsappCommunityUrl;

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
                href={waDirectLink(undefined, undefined, phoneE164)}
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
                  {phoneDisplay}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-500 mt-2 group-hover:text-green-600 dark:group-hover:text-green-400">
                  Click to start chat →
                </p>
              </a>

              {instagramUrl && (
                <a
                  href={instagramUrl}
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
=======
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/Breadcrumb";
import { siteConfig } from "@/lib/siteConfig";
import { waGenericLink } from "@/utils/whatsapp";
import { Instagram, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: `${siteConfig.brandName} - Contact`,
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <Breadcrumb customItems={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
        </div>

        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h1 className="text-4xl sm:text-5xl font-bold mb-3">Contact Us</h1>
              <p className="text-slate-200">
                We&apos;re here to help! Reach out to us through any of these channels.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* WhatsApp */}
              <a
                href={siteConfig.whatsappChatLink || waGenericLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-green-500/30 bg-green-500/10 p-7 sm:p-8 hover:bg-green-500/15 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
                    <MessageCircle className="text-green-300" size={26} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">WhatsApp</h2>
                    <p className="text-slate-200 mt-1">
                      Chat with us directly for instant support
                    </p>
                    <p className="text-green-300 font-semibold mt-3">
                      {siteConfig.phoneDisplay}
                    </p>
                    <p className="text-slate-300 mt-2 group-hover:underline">
                      Click to start chat →
                    </p>
                  </div>
                </div>
              </a>

              {/* Instagram */}
              {siteConfig.instagramLink && (
                <a
                  href={siteConfig.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-pink-500/30 bg-pink-500/10 p-7 sm:p-8 hover:bg-pink-500/15 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-pink-500/20 flex items-center justify-center">
                      <Instagram className="text-pink-200" size={26} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Instagram</h2>
                      <p className="text-slate-200 mt-1">
                        Follow us for updates and offers
                      </p>
                      <p className="text-pink-200 font-semibold mt-3">Open Instagram</p>
                      <p className="text-slate-300 mt-2 group-hover:underline">
                        Click to follow →
                      </p>
                    </div>
                  </div>
>>>>>>> 0fb77d5 (feat: add Turnitin logos and configure Tailwind CSS)
                </a>
              )}
            </div>

<<<<<<< HEAD
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
                href={whatsappCommunityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-lg"
              >
                <MessageCircle size={20} />
                <span>Join WhatsApp Community</span>
              </a>
            </div>
=======
            {/* Join community */}
            <div className="mt-8 rounded-2xl border border-blue-400/20 bg-blue-500/10 p-8 sm:p-10 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">Join Our Community</h2>
              <p className="text-slate-200 mb-6">
                Connect with thousands of users, get exclusive deals, and stay updated.
              </p>
              <a
                href={siteConfig.whatsappCommunityLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
              >
                <MessageCircle size={18} />
                <span>Join WhatsApp Community</span>
              </a>
            </div>

            {/* Contact form (Client Component) */}
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-7 sm:p-8">
              <h3 className="text-xl font-bold mb-4">Contact Form</h3>
              <ContactForm />
            </div>
>>>>>>> 0fb77d5 (feat: add Turnitin logos and configure Tailwind CSS)
          </div>
        </section>
      </div>
      <Footer />
<<<<<<< HEAD
      <WhatsAppBar />
=======
>>>>>>> 0fb77d5 (feat: add Turnitin logos and configure Tailwind CSS)
    </>
  );
}
