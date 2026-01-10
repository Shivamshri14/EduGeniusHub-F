"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { SITE as FALLBACK } from "@/lib/config";

export type SiteConfig = {
  brandName: string;
  supportPhoneDisplay: string;
  supportPhoneE164: string;
  whatsappCommunityUrl: string;
  whatsappChannelUrl?: string;
  instagramUrl?: string;
  heroTagline?: string;
  heroSubline?: string;
};

const defaultConfig: SiteConfig = {
  brandName: FALLBACK.brand,
  supportPhoneDisplay: FALLBACK.phoneDisplay,
  supportPhoneE164: FALLBACK.phoneE164,
  whatsappCommunityUrl: FALLBACK.whatsappCommunityUrl,
  instagramUrl: FALLBACK.instagramUrl,
};

const Ctx = createContext<SiteConfig>(defaultConfig);

export function SiteConfigProvider({ children }: { children: React.ReactNode }) {
  const [cfg, setCfg] = useState<SiteConfig>(defaultConfig);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/sheet/SITE_CONFIG", { cache: "no-store" });
        const json = await res.json();
        if (!json?.ok || !Array.isArray(json.data)) return;
        const map: Record<string, string> = {};
        for (const r of json.data) {
          if (!r?.key) continue;
          map[String(r.key)] = r?.value !== undefined ? String(r.value) : "";
        }
        const next: SiteConfig = {
          brandName: map.brandName || defaultConfig.brandName,
          supportPhoneDisplay: map.supportPhoneDisplay || defaultConfig.supportPhoneDisplay,
          supportPhoneE164: map.supportPhoneE164 || defaultConfig.supportPhoneE164,
          whatsappCommunityUrl: map.whatsappCommunityUrl || defaultConfig.whatsappCommunityUrl,
          whatsappChannelUrl: map.whatsappChannelUrl || undefined,
          instagramUrl: map.instagramUrl || undefined,
          heroTagline: map.heroTagline || undefined,
          heroSubline: map.heroSubline || undefined,
        };
        if (!cancelled) setCfg(next);
      } catch {
        // keep fallback
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => cfg, [cfg]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSiteConfig() {
  return useContext(Ctx);
}
