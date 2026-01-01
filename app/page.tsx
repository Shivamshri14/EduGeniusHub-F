import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { WhatsAppBar } from "@/components/marketing/WhatsAppBar";
import { ComboCard } from "@/components/marketing/ComboCard";
import { FeaturedTools } from "@/components/marketing/FeaturedTools";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/config";
import { getTools, getCombos } from "@/lib/sanity";
import { waDirectLink } from "@/lib/whatsapp";
import { FeaturedTools } from "@/components/marketing/FeaturedTools";
import { WhatsAppButton } from "@/components/marketing/WhatsAppButton";
import { MessageCircle, CheckCircle, Zap, Users, Package, Star, Instagram, Shield, HeartHandshake, Sparkles, Code, FileText, Pencil, AlertCircle, icons } from "lucide-react";

export const metadata = {
  icons: {
    icon: '/file.ico', // use root path for files in public/ (public/file.ico)
  },
  title: `${SITE.brand} - Premium Tools. Managed by Professionals.`,
  description: "Access premium subscription tools for students and professionals. Fast delivery, trusted service, simple support.",
};

export default function HomePage() {
  const featuredTools = TOOLS.slice(0, 5);
  const offerText = "Flat 40% OFF – Today Only!";
  const stockLeft = 7;

  return (
    <>
      <Navbar />
      <Breadcrumbs />

      <div className="min-h-screen bg-white dark:bg-slate-900">
        {/* <section className="border-b border-orange-200 bg-gradient-to-r from-orange-50 via-amber-50 to-red-50 dark:from-orange-900/20 dark:via-amber-900/10 dark:to-red-900/20">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-orange-600 animate-flash">
                🔥 Limited-Time Offer!
              </p>
              <h2 className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                {offerText}
              </h2>
              <p className="mt-2 text-base text-slate-700 dark:text-slate-300">
                Grab the best-selling combo today and save more on premium tools. Offer refreshes daily—change the text in code to update instantly.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-semibold">
                <span className="rounded-full bg-red-600 px-3 py-1 text-white shadow-md">
                  Few Stocks Left
                </span>
                <span className="text-red-700 dark:text-red-300">
                  Only {stockLeft} spot{stockLeft === 1 ? '' : 's'} remaining
                </span>
              </div>
            </div>
            <WhatsAppButton
              href={waDirectLink("Limited-Time Offer Inquiry")}
              label="Grab Offer Now"
              variant="gradient"
              className="w-full py-3 text-base sm:w-auto sm:px-8"
              iconSize={22}
            />
          </div>
        </section> */}

        <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 text-white overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-8 flex justify-center">
                <Image
                  src="/file.jpg"
                  alt={SITE.brand}
                  width={120}
                  height={120}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 rounded-full text-sm font-bold animate-pulse shadow-lg">
                <Sparkles className="inline mr-1" size={16} /> LIMITED TIME OFFER - UP TO 80% OFF!
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="text-blue-400">{SITE.brand}</span><br />
                <span className="text-2xl sm:text-3xl lg:text-4xl text-slate-300">Complete Solution for Assignments & Tools</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-4 leading-relaxed px-4">
                Premium Tools. Academic Services. Development Projects.
              </p>
              <p className="text-base sm:text-lg text-blue-200 mb-8 px-4">
                Get instant access to premium subscription tools. Trusted by thousands of students and professionals across India.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 mb-8">
                <a
                  href={waDirectLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-green-700 transition-all font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-105 transform"
                >
                  <MessageCircle size={24} />
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href={SITE.whatsappCommunityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-slate-100 transition-all font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl hover:scale-105 transform"
                >
                  <Users size={24} />
                  <span>Join Community</span>
                </a>
              </div>

              {SITE.instagramUrl && (
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors text-sm sm:text-base"
                >
                  <Instagram size={20} />
                  <span>Follow us on Instagram</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* FEATURED TOOLS */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">
              Featured Tools
            </h2>

            {tools.length > 0 && <FeaturedTools tools={tools} />}

            <div className="text-center mt-10">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl"
              >
                <Package />
                View All Tools
              </Link>
            </div>
          </div>
        </section>

        {/* COMBOS */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">
              Combo Packages
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {combos.map((combo: any) => (
                <ComboCard key={combo._id} combo={combo} />
              ))}
            </div>
          </div>
        </section>

      </div>

      <Footer />
      <WhatsAppBar />
    </>
  );
}
