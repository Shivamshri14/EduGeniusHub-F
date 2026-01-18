"use client";

import { activeDeals, TOOLS, COMBO_TOOLS } from "@/lib/catalog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink, buildToolMessage } from "@/utils/whatsappMessageBuilder";
import { Flame } from "lucide-react";

export default function DealOfDaySection() {
  const deals = activeDeals();

  if (deals.length === 0) return null;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Flame className="h-6 w-6 text-orange-500" />
            <h2 className="text-3xl font-bold text-foreground">Deal of the Day</h2>
            <Flame className="h-6 w-6 text-orange-500" />
          </div>
          <p className="text-muted-foreground">
            Limited time offers on premium tools
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {deals.map((deal) => {
            const tool = deal.toolId
              ? TOOLS.find((t) => t.id === deal.toolId)
              : null;
            const combo = deal.comboId
              ? COMBO_TOOLS.find((c) => c.id === deal.comboId)
              : null;

            const item = tool || combo;
            if (!item) return null;

            const price = "ourPrice" in item ? item.ourPrice : 0;
            const marketPrice = "marketPrice" in item ? item.marketPrice : 0;
            const whatsappLink = buildWhatsAppLink(
              buildToolMessage(deal.title, price)
            );

            return (
              <Card
                key={deal.id}
                className="overflow-hidden border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-red-500/10 dark:from-orange-900/20 dark:to-red-900/20"
              >
                <CardContent className="p-6">
                  {deal.flashText && (
                    <Badge className="mb-4 bg-orange-500 text-white">
                      {deal.flashText}
                    </Badge>
                  )}

                  <h3 className="mb-2 text-xl font-bold text-foreground">
                    {deal.title}
                  </h3>

                  {"tagline" in item && (
                    <p className="mb-4 text-sm text-muted-foreground">
                      {item.tagline}
                    </p>
                  )}

                  <div className="mb-4 flex items-baseline gap-2">
                    {marketPrice > 0 && (
                      <span className="text-lg text-muted-foreground line-through">
                        ₹{marketPrice}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                      ₹{price}
                    </span>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                  >
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Buy on WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
