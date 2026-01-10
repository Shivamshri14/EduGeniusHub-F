import { SITE } from "./config";
import type { ComboTool } from "./tools";

export function waOrderMessage(toolName: string, price?: number) {
  let base = "Hello EduGeniusHub, I want " + toolName;
  if (price !== undefined && price > 0) {
    base += " (Price: ₹" + price + ")";
  }
  base += ". Please share details.";
  return encodeURIComponent(base);
}

export function waDirectLink(toolName?: string, price?: number, phoneE164?: string) {
  const to = phoneE164 || SITE.phoneE164;
  const msg = toolName
    ? waOrderMessage(toolName, price)
    : encodeURIComponent("Hello EduGeniusHub, I have a query.");
  return `https://wa.me/${to}?text=${msg}`;
}

export function waComboInquiryLink(combo: ComboTool, phoneE164?: string) {
  // Keep message short and professional (your site already formats the ask).
  return waDirectLink(`Combo: ${combo.name}`, combo.ourPrice, phoneE164);
}
