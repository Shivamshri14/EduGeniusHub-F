import { SITE } from "./config";

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
