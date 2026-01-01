import { SITE } from "./config";
import type { ComboTool } from "./tools";

export function waOrderMessage(toolName: string) {
  const base = "Hello EduGeniusHub, I want " + toolName + " tool. Please share details.";
  return encodeURIComponent(base);
}

// export function waOrderMessageComboTool(ComboTool: string) {
//   const base = "Hello EduGeniusHub, I want " + ComboTool + ". Please share details.";
//   return encodeURIComponent(base);
// }

export function waDirectLink(toolName?: string) {
  const msg = toolName ? waOrderMessage(toolName) : encodeURIComponent("Hello EduGeniusHub, I have a query.");
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
