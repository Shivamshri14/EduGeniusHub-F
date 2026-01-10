import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { WhatsAppBar } from "@/components/marketing/WhatsAppBar";
import { ComboCard } from "@/components/marketing/ComboCard";
import { FeaturedTools } from "@/components/marketing/FeaturedTools";
import { WhatsAppButton } from "@/components/marketing/WhatsAppButton";

import Link from "next/link";
import Image from "next/image";

import { SITE } from "@/lib/config";
import { waDirectLink } from "@/lib/whatsapp-message";
import { fetchSiteConfig, fetchSheetTab } from "@/lib/sheets-api";
import {
  combosFromSheet,
  dealsFromSheet,
  featuredToolsFromSheet,
  reviewsFromSheet,
} from "@/lib/sheet-catalog";
import { DealsSection } from "@/components/marketing/DealsSection";
import { ReviewsSection } from "@/components/marketing/ReviewsSection";

import {
  MessageCircle,
  Users,
  Package,
  Instagram,
  Sparkles,
} from "lucide-react";

export const metadata = {
  icons: {
    icon: "/file.ico",
  },
  title: `${SITE.brand} - Premium Tools. Managed by Professionals.`,
  description:
    "Access premium subscription tools for students and professionals. Fast delivery, trusted service, simple support.",
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [siteMap, toolsRows, combosRows, dealsRows, reviewsRows] = await Promise.all([
    fetchSiteConfig(),
    fetchSheetTab("TOOLS"),
    fetchSheetTab("COMBOS"),
    fetchSheetTab("DEALS"),
    fetchSheetTab("REVIEWS"),
  ]);

  const phoneE164 = siteMap.supportPhoneE164 || SITE.phoneE164;
  const featuredTools = featuredToolsFromSheet(toolsRows, 5);
  const comboTools = combosFromSheet(combosRows);
  const deals = dealsFromSheet(dealsRows, toolsRows, combosRows);
  const reviews = reviewsFromSheet(reviewsRows);
  const heroTagline = siteMap.heroTagline || "Complete Solution for Assignments & Tools";
  const heroSubline = siteMap.heroSubline || "Premium Tools. Academic Services. Development Projects.";

  return (
    <>
      <Navbar />
      <Breadcrumbs />

      <div className="min-h-screen bg-white dark:bg-slate-900">
        {/* HERO SECTION */}
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
            <div className="mb-8 flex justify-center">
              <Image
                src="/file.jpg"
                alt={siteMap.brandName || SITE.brand}
                width={120}
                height={120}
                className="rounded-2xl shadow-2xl"
              />
            </div>

            <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 rounded-full text-sm font-bold">
              <Sparkles className="inline mr-1" size={16} />
              LIMITED TIME OFFER
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold mb-6">
              <span className="text-blue-400">{siteMap.brandName || SITE.brand}</span>
              <br />
              <span className="text-2xl sm:text-3xl text-slate-300">
                {heroTagline}
              </span>
            </h1>

            <p className="text-lg text-slate-300 mb-8">{heroSubline}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a
                href={waDirectLink(undefined, undefined, phoneE164)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-xl font-semibold"
              >
                <MessageCircle size={22} />
                Chat on WhatsApp
              </a>

              <a
                href={siteMap.whatsappCommunityUrl || SITE.whatsappCommunityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold"
              >
                <Users size={22} />
                Join Community
              </a>
            </div>

            {(siteMap.instagramUrl || SITE.instagramUrl) && (
              <a
                href={siteMap.instagramUrl || SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-300"
              >
                <Instagram size={18} />
                Follow us on Instagram
              </a>
            )}
          </div>
        </section>

        {/* DEALS OF THE DAY (from Google Sheet) */}
        <DealsSection deals={deals} phoneE164={phoneE164} />

        {/* FEATURED TOOLS */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">
              Featured Tools
            </h2>

            {featuredTools.length > 0 && (
              <FeaturedTools tools={featuredTools} />
            )}

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

        {/* COMBO TOOLS */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">
              Combo Packages
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {comboTools.map((combo) => (
                <ComboCard key={combo.id} combo={combo} phoneE164={phoneE164} />
              ))}
            </div>
          </div>
        </section>

        {/* REVIEWS (from Google Sheet) */}
        <ReviewsSection reviews={reviews} />
      </div>

      <ReviewsSection reviews={reviews} />
      <Footer />
      <WhatsAppBar />
    </>
  );
}
