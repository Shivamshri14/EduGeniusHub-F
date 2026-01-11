"use client";

import { Flame, MessageCircle } from "lucide-react";
import { activeDeals } from "@/lib/deals";
import { toolsCatalog } from "@/lib/toolsCatalog";
import { comboCatalog } from "@/lib/comboCatalog";
import { waEnquireLink } from "@/utils/whatsapp";

export function DealBanner() {
  const deals = activeDeals();
  if (!deals.length) return null;

  return (
    <section className="py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 dark:from-orange-500/20 dark:to-pink-500/20 border border-orange-200/60 dark:border-orange-800/60 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow">
              <Flame size={20} />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                🔥 Deal of the Day
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                (Limited-time offers)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {deals.map((d) => {
              const tool = d.toolId
                ? toolsCatalog.find((t) => t.id === d.toolId)
                : undefined;
              const combo = d.comboId
                ? comboCatalog.find((c) => c.id === d.comboId)
                : undefined;
              const title = tool?.title || combo?.title || d.title;
              const price = tool?.price ?? combo?.price;
              const pricingText = tool?.pricingText ?? combo?.pricingText;
              const months = tool?.billingPlanMonths?.[0] ?? combo?.billingPlanMonths?.[0] ?? 1;

              const href = waEnquireLink({
                title,
                price,
                pricingText,
                accountType:
                  combo?.accountType || "Private Account",
                billingPlanMonths: months,
              });

              const priceLabel =
                typeof price === "number" && price > 0
                  ? `₹${price}`
                  : pricingText?.trim()
                    ? pricingText.trim()
                    : "Inquire Now";

              return (
                <div
                  key={d.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5 sm:p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide mb-2">
                        {d.flashText}
                      </p>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                        {title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Valid till: {d.validTill}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {priceLabel}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow"
                    >
                      <MessageCircle size={18} />
                      <span>Enquire on WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
