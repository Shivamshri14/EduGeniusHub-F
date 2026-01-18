"use client";

import { AlertCircle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { COMBO_TOOLS } from "@/lib/catalog";
import { buildWhatsAppLink, buildOrderMessage } from "@/utils/whatsappMessageBuilder";

export default function ComboPackagesSection() {
  const displayedCombos = COMBO_TOOLS.slice(0, 4);

  const calculateSavings = (marketPrice: number, ourPrice: number) => {
    const savings = ((marketPrice - ourPrice) / marketPrice) * 100;
    return Math.round(savings);
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Purple Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/40 via-purple-800/30 to-[#1a2332]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-400/30 px-4 py-1.5">
            LIMITED TIME OFFER
          </Badge>
          <h2 className="mb-4 text-3xl font-bold text-white">Combo Packages</h2>
          <p className="text-gray-400">
            Get multiple tools together at one go for less. Bundles hand-selected for maximum savings
          </p>
        </div>

        {/* Pricing Note */}
        <div className="mb-8 rounded-lg border-l-4 border-yellow-500 bg-yellow-500/10 p-4 text-sm text-gray-300">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500" />
            <p>
              <span className="font-semibold text-white">Note:</span> Prices are subject to change and may vary from time to time. Please contact us on WhatsApp for current pricing.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {displayedCombos.map((combo) => {
            const savings = calculateSavings(combo.marketPrice, combo.ourPrice);

            return (
              <Card
                key={combo.id}
                className="relative overflow-hidden border-purple-500/30 bg-[#1a2332] hover:border-purple-500/50 transition-all"
              >
                {/* Save Badge */}
                <div className="absolute right-4 top-4 z-10">
                  <Badge className="bg-red-500 text-white hover:bg-red-600">
                    SAVE {savings}%
                  </Badge>
                </div>

                <CardHeader className="pb-4">
                  {/* Combo Deal Badge */}
                  <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 p-4">
                    <div className="text-center">
                      <div className="text-3xl font-black text-gray-900">COMBO</div>
                      <div className="text-xl font-bold text-gray-900">DEAL</div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white">{combo.name}</h3>
                  <p className="text-sm text-gray-400">{combo.description}</p>
                </CardHeader>

                <CardContent className="pb-4">
                  <div className="mb-4 space-y-2">
                    {combo.tools.map((tool, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span>{tool}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-bold text-emerald-400">
                      ₹{combo.ourPrice}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{combo.marketPrice}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    Per {combo.planType === "Monthly" ? "month" : "year"}
                  </p>
                </CardContent>

                <CardFooter>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    size="lg"
                  >
                    <a
                      href={buildWhatsAppLink(
                        buildOrderMessage(combo.name, combo.ourPrice)
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get This Combo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
