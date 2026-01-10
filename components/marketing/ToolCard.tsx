"use client";

import Image from "next/image";
import { useState } from "react";
import { waDirectLink } from "@/lib/whatsapp-message";
import { ExternalLink, CheckCircle, X } from "lucide-react";
import type { Tool } from "@/lib/tools";
import { useSiteConfig } from "@/components/site/SiteConfigProvider";
import { AccountBadge } from "./AccountBadge";
import { PriceDisplay } from "./PriceDisplay";
import { WhatsAppButton } from "./WhatsAppButton";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const site = useSiteConfig();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const discount = Math.round(((tool.marketPrice - tool.ourPrice) / tool.marketPrice) * 100);

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow group relative">
        <div className="absolute top-3 right-3 z-10 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
          {discount}% OFF
        </div>

        <button onClick={() => setIsModalOpen(true)} className="block w-full">
          <div className="relative h-48 bg-slate-100 dark:bg-slate-700">
            <Image
              src={tool.image}
              alt={tool.name}
              fill
              className="object-contain p-6 group-hover:scale-105 transition-transform"
            />
          </div>
        </button>

        <div className="p-6">
          <button onClick={() => setIsModalOpen(true)} className="text-left w-full">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {tool.name}
            </h3>
          </button>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{tool.tagline}</p>
          <AccountBadge accountType={tool.accountType} className="mb-4" />

          <PriceDisplay
            current={tool.ourPrice}
            original={tool.marketPrice}
            planType={tool.planType}
            size="md"
          />

          <div className="flex flex-col sm:flex-row gap-2">
            <WhatsAppButton
              href={waDirectLink(tool.name, tool.ourPrice, site.supportPhoneE164)}
              label="Enquire on WhatsApp"
              fullWidth
              className="text-sm py-2.5"
            />
            <a
              href={tool.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-medium text-sm"
            >
              <ExternalLink size={16} />
              <span className="hidden sm:inline">Official Site</span>
              <span className="sm:hidden">Visit</span>
            </a>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{tool.name}</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X size={24} className="text-slate-600 dark:text-slate-400" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="relative h-64 sm:h-80 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-700 dark:to-blue-900 rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={tool.image}
                    alt={tool.name}
                    fill
                    className="object-contain p-8"
                  />
                </div>

                <div>
                  <AccountBadge accountType={tool.accountType} className="mb-4" />
                  <p className="text-xl text-blue-600 dark:text-blue-400 mb-2 font-semibold">
                    {tool.tagline}
                  </p>
                  <p className="text-base text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="mb-6 space-y-3">
                    <PriceDisplay
                      current={tool.ourPrice}
                      original={tool.marketPrice}
                      planType={tool.planType}
                      size="lg"
                    />
                    <span className="inline-flex w-fit items-center rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                      {discount}% OFF
                    </span>
                  </div>

                  <div className="flex flex-col gap-3 mb-6">
                    <WhatsAppButton
                      href={waDirectLink(tool.name, tool.ourPrice, site.supportPhoneE164)}
                      label="Enquire on WhatsApp"
                      className="py-3 text-base rounded-xl"
                      fullWidth
                      iconSize={20}
                    />
                    <a
                      href={tool.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-semibold"
                    >
                      <ExternalLink size={20} />
                      <span>Visit Official Site</span>
                    </a>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white mb-3">Why Choose Us?</h3>
                    <ul className="space-y-2.5">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-sm text-slate-700 dark:text-slate-300">Instant delivery via WhatsApp</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-sm text-slate-700 dark:text-slate-300">Verified and working credentials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-sm text-slate-700 dark:text-slate-300">24/7 customer support</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" size={18} />
                        <span className="text-sm text-slate-700 dark:text-slate-300">Affordable pricing for students</span>
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
