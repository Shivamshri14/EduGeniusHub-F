import { SITE } from "./config";

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
