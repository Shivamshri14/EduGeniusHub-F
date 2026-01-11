"use client";

import Image from "next/image";
import { useState } from "react";
import { MessageCircle, CheckCircle } from "lucide-react";
import type { ComboItem } from "@/lib/catalogTypes";
import { waEnquireLink } from "@/utils/whatsapp";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MetaStrip } from "@/components/common/MetaStrip";



function isExternal(src: string) {
  return /^https?:\/\//.test(src);
}

const MetaLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
    {children}
  </div>
);


export function ComboCard({ combo }: { combo: ComboItem }) {
  const [months, setMonths] = useState<number>(combo.billingPlanMonths[0] ?? 1);

  const priceLabel =
    typeof combo.price === "number" && combo.price > 0
      ? `₹${combo.price}`
      : combo.pricingText?.trim()
        ? combo.pricingText.trim()
        : "Inquire Now";

  const enquireHref = waEnquireLink({
    title: combo.title,
    price: combo.price,
    pricingText: combo.pricingText,
    accountType: combo.accountType,
    billingPlanMonths: months,
  });

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl shadow-md border-2 border-purple-200 dark:border-purple-800 overflow-hidden hover:shadow-xl transition-all group relative">
      <div className="relative h-56 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
        {/* ✅ Account Type Badge */}
        {/* {combo.accountType && (
          <div className="absolute top-3 left-3 z-10">
            <span className="
        inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold
        bg-black/70 text-white backdrop-blur border border-white/10
      ">
              {combo.accountType}
            </span>
          </div>
        )} */}
        {isExternal(combo.imageUrl) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={combo.imageUrl}
            alt={combo.title}
            className="h-full w-full object-contain p-8 group-hover:scale-110 transition-transform"
          />
        ) : (
          <Image
            src={combo.imageUrl}
            alt={combo.title}
            fill
            className="object-contain p-8 group-hover:scale-110 transition-transform"
          />
        )}
        <div className="absolute bottom-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
          COMBO PACK
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2">
          {combo.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 whitespace-pre-line">
          {combo.description}
        </p>

        <div className="mb-4 space-y-2">
          {combo.includes.map((tool, index) => (
            <div
              key={`${combo.id}-${index}`}
              className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
            >
              <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
              <span>{tool}</span>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">
              {combo.price ? `₹${combo.price}` : combo.pricingText ?? "Inquire Now"}
            </span>

            {/* ✅ Months next to price */}
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              — {combo.billingPlanMonths + " month(s)"}
            </span>
          </div>
        </div>


        <a
          href={enquireHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-semibold shadow-md hover:shadow-lg"
        >
          <MessageCircle size={18} />
          <span>Enquire on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
