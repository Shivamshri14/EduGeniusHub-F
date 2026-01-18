"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TOOLS } from "@/lib/catalog";
import { buildWhatsAppLink, buildOrderMessage } from "@/utils/whatsappMessageBuilder";
import Link from "next/link";

export default function FeaturedToolsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredTools = TOOLS.filter(
    (tool) => tool.display !== false && tool.id !== "request-new-tool"
  ).slice(0, 6);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredTools.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredTools.length) % featuredTools.length);
  };

  const currentTool = featuredTools[currentIndex];

  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Featured Tools</h2>
          <p className="text-muted-foreground">Popular tools our customers love</p>
        </div>

        {/* Pricing Note */}
        <div className="mb-8 rounded-lg border-l-4 border-yellow-500 bg-yellow-500/10 p-4 text-sm text-foreground">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500" />
            <p>
              <span className="font-semibold">Note:</span> Prices are subject to change and may vary from time to time. Please contact us on WhatsApp for current pricing.
            </p>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 z-10 -translate-x-4 -translate-y-1/2 rounded-full bg-white/10 p-2 backdrop-blur-sm transition-all hover:bg-white/20 lg:-translate-x-12"
            aria-label="Previous tool"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>

          <Card className="mx-auto max-w-3xl overflow-hidden border-white/10 bg-white">
            <CardContent className="p-8">
              <div className="mb-6 flex items-center justify-between">
                <Badge className="bg-primary/15 text-primary">
                  {currentTool.category.toUpperCase()}
                </Badge>
                <div className="flex gap-2">
                  {currentTool.marketPrice > currentTool.ourPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{currentTool.marketPrice}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-gray-900">
                    ₹{currentTool.ourPrice}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <div className="relative mx-auto flex h-48 w-full max-w-md items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-cyan-400 via-emerald-400 to-yellow-400 p-4">
                  <div className="text-center">
                    <div className="mb-2 text-4xl font-black text-gray-900">
                      {currentTool.name.split(' ')[0]}
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      {currentTool.name.split(' ').slice(1).join(' ')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6 text-center">
                <h3 className="mb-2 text-2xl font-bold text-gray-900">
                  {currentTool.name}
                </h3>
                <p className="mb-4 text-gray-600">{currentTool.description}</p>

                <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                  <Badge variant="outline" className="border-gray-300 text-gray-700">
                    {currentTool.accountType === "private" ? "Private Account" :
                     currentTool.accountType === "shared" ? "Shared Account" :
                     "Mail Access"}
                  </Badge>
                  <Badge variant="outline" className="border-gray-300 text-gray-700">
                    {currentTool.durationValue && currentTool.durationType
                      ? `${currentTool.durationValue} ${currentTool.durationType}`
                      : currentTool.planType}
                  </Badge>
                </div>
              </div>

              <Button
                asChild
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <a
                  href={buildWhatsAppLink(
                    buildOrderMessage(currentTool.name, currentTool.ourPrice)
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Enquire on WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-4 rounded-full bg-white/10 p-2 backdrop-blur-sm transition-all hover:bg-white/20 lg:translate-x-12"
            aria-label="Next tool"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {featuredTools.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/tools">View All 18 Tools</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
