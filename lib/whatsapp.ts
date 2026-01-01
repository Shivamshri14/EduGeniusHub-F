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

export function waDirectLink(toolName?: string, price?: number) {
  const msg = toolName ? waOrderMessage(toolName, price) : encodeURIComponent("Hello EduGeniusHub, I have a query.");
  return `https://wa.me/${SITE.phoneE164}?text=${msg}`;
}

export function waComboInquiryLink(combo: ComboTool) {
  const message = `
Hey, I'm interested in the Combo Offer!

Combo Name: ${combo.name}
Tools Included: ${combo.tools.join(', ')}
Actual Price: ₹${combo.marketPrice}
Discounted Price: ₹${combo.ourPrice}
  `.trim();

  return `https://wa.me/${SITE.phoneE164}?text=${encodeURIComponent(message)}`;
}
