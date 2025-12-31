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
import {
  MessageCircle, CheckCircle, Zap, Users, Package, Star,
  Instagram, Shield, HeartHandshake, Sparkles, Code,
  FileText, AlertCircle
} from "lucide-react";

export const revalidate = 0;

export default async function HomePage() {
  const allTools = await getTools();
  const tools = allTools.slice(0, 8);
  const combos = await getCombos();

  return (
    <>
      <Navbar />
      <Breadcrumbs />

      <div className="min-h-screen bg-white dark:bg-slate-900">

        {/* HERO */}
        <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <Image
              src="/file.jpg"
              alt={SITE.brand}
              width={120}
              height={120}
              className="mx-auto mb-6 rounded-2xl"
            />

            <div className="inline-block mb-4 px-4 py-2 bg-yellow-400 text-black rounded-full font-bold">
              <Sparkles size={16} className="inline mr-1" />
              LIMITED TIME OFFER
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold mb-4">
              {SITE.brand}
            </h1>

            <p className="text-xl text-slate-300 mb-8">
              Premium Tools • Academic Services • Development Projects
            </p>

            <div className="flex justify-center gap-4">
              <a
                href={waDirectLink()}
                target="_blank"
                className="bg-green-600 px-6 py-3 rounded-xl flex items-center gap-2"
              >
                <MessageCircle /> WhatsApp
              </a>

              <a
                href={SITE.whatsappCommunityUrl}
                target="_blank"
                className="bg-white text-black px-6 py-3 rounded-xl flex items-center gap-2"
              >
                <Users /> Community
              </a>
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
