"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { MessageCircle, ExternalLink, CheckCircle, X } from "lucide-react";
import { waEnquireLink } from "@/utils/whatsapp";
import type { AccountType, ToolItem } from "@/lib/catalogTypes";
import { Badge } from "@/components/ui/badge";
import { MetaStrip } from "@/components/common/MetaStrip";

function pickAccountType(tool: ToolItem) {
  // If multiple types exist, show first one OR make a priority
  // Private > Shared > Mail
  const types = tool.accountTypes ?? [];
  if (types.includes("Private Account")) return "Private Account";
  if (types.includes("Shared Account")) return "Shared Account";
  if (types.includes("Mail Access Account")) return "Mail Access Account";
  return null;
}


const ACCOUNT_TYPES: AccountType[] = [
  "Private Account",
  "Shared Account",
  "Mail Access Account",
];

const MetaLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
    {children}
  </div>
);


function isExternal(src: string) {
  return /^https?:\/\//.test(src);
}

export function ToolCard({ tool }: { tool: ToolItem }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showDiscount =
    typeof tool.price === "number" &&
    typeof tool.mrp === "number" &&
    tool.mrp > tool.price;

  const discount = useMemo(() => {
    if (!showDiscount) return 0;
    return Math.round(((tool.mrp! - tool.price!) / tool.mrp!) * 100);
  }, [showDiscount, tool.mrp, tool.price]);

  const enquireHref = waEnquireLink({
    title: tool.title,
    price: tool.price,
    pricingText: tool.pricingText,
    accountType: tool.accountTypes?.[0] ?? "Private Account",

    billingPlanMonths: tool.billingPlanMonths?.[0] ?? 1,
  });


  const priceLabel =
    typeof tool.price === "number" && tool.price > 0
      ? `₹${tool.price}`
      : tool.pricingText?.trim()
        ? tool.pricingText.trim()
        : "Inquire Now";

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow group relative">
        {showDiscount && (
          <div className="absolute top-3 right-3 z-10 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
            {discount}% OFF
          </div>
        )}

        <button onClick={() => setIsModalOpen(true)} className="block w-full">
          <div className="relative h-48 bg-slate-100 dark:bg-slate-700">

            {/* ✅ Account badge ABOVE image */}
            {pickAccountType(tool) && (
              <div className="absolute top-3 left-3 z-10">
                <span className="
        inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold
        bg-black/70 text-white backdrop-blur border border-white/10
      ">
                  {pickAccountType(tool)}
                </span>
              </div>
            )}
            {isExternal(tool.imageUrl) ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={tool.imageUrl}
                alt={tool.title}
                className="h-full w-full object-contain p-6 group-hover:scale-105 transition-transform"
              />
            ) : (
              <Image
                src={tool.imageUrl}
                alt={tool.title}
                fill
                className="object-contain p-6 group-hover:scale-105 transition-transform"
              />
            )}
          </div>
        </button>

        <div className="p-6">
          <button onClick={() => setIsModalOpen(true)} className="text-left w-full">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {tool.title}
            </h3>
          </button>

          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 whitespace-pre-line">
            {tool.description}
          </p>

          <div className="mb-4">
            <div className="flex items-end justify-between gap-3">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {priceLabel}
                </span>

                {/* ✅ Months inline */}
                <span className="text-m font-semibold ">
                  — {tool.billingPlanMonths+" month(s)"}
                </span>

                {showDiscount && (
                  <span className="text-lg text-slate-400 dark:text-slate-500 line-through ml-2">
                    ₹{tool.mrp}
                  </span>
                )}
              </div>
            </div>

            {showDiscount && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                You save ₹{tool.mrp! - tool.price!}!
              </p>
            )}
          </div>



          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href={enquireHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm"
            >
              <MessageCircle size={16} />
              <span>Enquire on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {tool.title}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X size={24} className="text-slate-600 dark:text-slate-400" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Left Image */}
                <div className="relative h-64 sm:h-80 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-700 dark:to-blue-900 rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
                  {isExternal(tool.imageUrl) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={tool.imageUrl}
                      alt={tool.title}
                      className="h-full w-full object-contain p-8"
                    />
                  ) : (
                    <Image
                      src={tool.imageUrl}
                      alt={tool.title}
                      fill
                      className="object-contain p-8"
                    />
                  )}
                </div>

                {/* Right Content */}
                <div>
                  <p className="text-base text-slate-700 dark:text-slate-300 mb-6 leading-relaxed whitespace-pre-line">
                    {tool.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {priceLabel}
                      </span>

                      {showDiscount && (
                        <>
                          <span className="text-xl text-slate-400 dark:text-slate-500 line-through">
                            ₹{tool.mrp}
                          </span>
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            {discount}% OFF
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Account Types */}
                  {tool.accountTypes?.length ? (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tool.accountTypes.map((type) => (
                        <span
                          key={type}
                          className="text-xs font-semibold px-3 py-1 rounded-full 
                    bg-slate-100 text-slate-900 border border-slate-200
                    dark:bg-slate-900 dark:text-white dark:border-slate-700"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {/* Billing Months */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tool.billingPlanMonths?.length ? (
                      tool.billingPlanMonths.map((m) => (
                        <span
                          key={m}
                          className="text-xs font-semibold px-3 py-1 rounded-full 
                    bg-slate-100 text-slate-900 border border-slate-200
                    dark:bg-slate-900 dark:text-white dark:border-slate-700"
                        >
                          {m} month
                        </span>
                      ))
                    ) : (
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full 
                  bg-slate-100 text-slate-900 border border-slate-200
                  dark:bg-slate-900 dark:text-white dark:border-slate-700"
                      >
                        1 month
                      </span>
                    )}
                  </div>

                  {/* WhatsApp Button */}
                  <div className="flex flex-col gap-3 mb-6">
                    <a
                      href={enquireHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-lg"
                    >
                      <MessageCircle size={20} />
                      <span>Enquire on WhatsApp</span>
                    </a>
                  </div>

                  {/* Why Choose Us */}
                  <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">
                      Why Choose Us?
                    </h3>
                    <ul className="space-y-2.5">
                      <li className="flex items-start gap-2">
                        <CheckCircle
                          className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5"
                          size={18}
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          Instant delivery via WhatsApp
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle
                          className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5"
                          size={18}
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          Verified and working credentials
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle
                          className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5"
                          size={18}
                        />
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          24/7 customer support
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
