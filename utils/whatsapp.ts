import { siteConfig } from "@/lib/siteConfig";
import type { AccountType } from "@/lib/catalogTypes";

export function buildWhatsAppMessage(args: {
  title: string;
  price?: number;
  pricingText?: string;
  accountType: AccountType;
  billingPlanMonths: number;
}) {
  const priceText =
    typeof args.price === "number" && args.price > 0
      ? `₹${args.price}`
      : args.pricingText?.trim()
        ? args.pricingText.trim()
        : "Inquire Now";

  return `Hi, I want ${args.title} at ${priceText} (${args.accountType}, ${args.billingPlanMonths} month).`;
}

export function waLink(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.phoneE164}?text=${text}`;
}

export function waEnquireLink(args: {
  title: string;
  price?: number;
  pricingText?: string;
  accountType: AccountType;
  billingPlanMonths: number;
}) {
  return waLink(buildWhatsAppMessage(args));
}

export function waGenericLink() {
  return waLink(`Hi, I have a query about ${siteConfig.brandName}.`);
}

export function waGenericLinksamewebsite() {
  return waLink(`Hi, We also want Website like yours.`);
}

export function waGenericLinkacademicwriting() {
  return waLink(`Hi, we want to discuss About Custom writing and development.`);
}
