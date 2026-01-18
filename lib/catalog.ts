// Re-export all catalog data from organized files for backward compatibility

export { SITE } from "./config";
export type { ReviewItem } from "./reviews";
export { reviews, activeReviews } from "./reviews";
export type { Service, CustomRequirement } from "./services";
export { services, customRequirement, activeServices } from "./services";
export type { Tool, ComboTool, PlanType, AccountType } from "./tools";
export { TOOLS, COMBO_TOOLS, getTools, getToolById } from "./tools";
export type { DealItem } from "./deals";
export { deals, activeDeals } from "./deals";

import { SITE as SiteConfig } from "./config";
import type { ComboTool as ComboToolType } from "./tools";

// WhatsApp message helpers
export function waOrderMessage(toolName: string, price?: number) {
  let base = "Hello EduGeniusHub, I want " + toolName;
  if (price !== undefined && price > 0) {
    base += " (Price: ₹" + price + ")";
  }
  base += ". Please share details.";
  return encodeURIComponent(base);
}

export function waDirectLink(
  toolName?: string,
  price?: number,
  phoneE164?: string
) {
  const to = phoneE164 || SiteConfig.phoneE164;
  const msg = toolName
    ? waOrderMessage(toolName, price)
    : encodeURIComponent("Hello EduGeniusHub, I have a query.");
  return `https://wa.me/${to}?text=${msg}`;
}

export function waComboInquiryLink(combo: ComboToolType, phoneE164?: string) {
  return waDirectLink(`Combo: ${combo.name}`, combo.ourPrice, phoneE164);
}
