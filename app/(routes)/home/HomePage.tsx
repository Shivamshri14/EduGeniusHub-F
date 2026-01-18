import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { heroContent } from "@/lib/homeContent";
import { SITE } from "@/lib/config";
import { Zap, ShieldCheck, Clock, ArrowRight, Users } from "lucide-react";
import TrustFeatures from "@/components/home/TrustFeatures";
import FeaturedToolsCarousel from "@/components/home/FeaturedToolsCarousel";
import DealOfDaySection from "@/components/deals/DealOfDaySection";
import ServicesSection from "@/components/home/ServicesSection";
import ResellerCallout from "@/components/reseller/ResellerCallout";
import ReviewsSection from "@/components/reviews/ReviewsSection";
import CommunitySection from "@/components/home/CommunitySection";
import { buildWhatsAppLink } from "@/utils/whatsappMessageBuilder";

const iconMap = {
  Zap,
  ShieldCheck,
  Clock,
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1525] via-[#0f2a35] to-[#1a2332] dark:from-[#0a1525] dark:via-[#0f2a35] dark:to-[#1a2332] py-20 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent"></div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 bg-gradient-to-r from-cyan-400 via-emerald-400 via-lime-400 to-yellow-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
              {heroContent.headline}
            </h1>
            <p className="mb-8 text-lg text-gray-300 dark:text-gray-300 sm:text-xl">
              {heroContent.subheadline}
            </p>

            <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-cyan-500 via-emerald-500 to-yellow-500 text-lg text-white hover:from-cyan-600 hover:via-emerald-600 hover:to-yellow-600 shadow-lg"
              >
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {heroContent.primaryCta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg shadow-lg"
              >
                <a
                  href={SITE.whatsappCommunityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Join Community
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-cyan-500/50 bg-transparent text-white dark:text-white hover:bg-cyan-500/10"
              >
                <Link href="/tools">{heroContent.secondaryCta}</Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              {heroContent.trustBadges.map((badge) => {
                const Icon = iconMap[badge.icon as keyof typeof iconMap];
                return (
                  <Badge
                    key={badge.text}
                    variant="outline"
                    className="border-cyan-500/50 bg-cyan-500/10 px-4 py-2 text-cyan-400 dark:text-cyan-400"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {badge.text}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Features */}
      <TrustFeatures />

      {/* Featured Tools Carousel */}
      <FeaturedToolsCarousel />

      {/* Deal of the Day */}
      <DealOfDaySection />

      {/* Services */}
      <ServicesSection />

      {/* Reseller */}
      <ResellerCallout />

      {/* Reviews */}
      <ReviewsSection />

      {/* Community */}
      <CommunitySection />
    </main>
  );
}
