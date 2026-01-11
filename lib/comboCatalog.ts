import type { ComboItem } from "./catalogTypes";

export const comboCatalog: ComboItem[] = [
  {
    id: "combo-turnitin-quillbot",
    title: "Turnitin + QuillBot Combo",
    description:
      "Turnitin account + QuillBot premium — best pack for writing and checking.",
    includes: ["Turnitin Student Account", "QuillBot Premium"],
    pricingText: "Inquire Now",
    billingPlanMonths: [1],
    accountType:
      "Mail Access Account",
    imageUrl: "/tools/plagai.png",
    active: true,
    sortOrder: 10,
  },
  {
    id: "combo-writing-pro",
    title: "Writing Pro Combo",
    description:
      "Grammarly + QuillBot — ideal for rewriting, grammar, and polishing content.",
    includes: ["Grammarly Premium", "QuillBot Premium"],
    price: 399,
    billingPlanMonths: [1],
    accountType:
      "Mail Access Account",
    imageUrl: "/tools/ai.png",
    active: true,
    sortOrder: 20,
  },
];

export function comboCatalogActive() {
  return comboCatalog
    .filter((c) => c.active)
    .sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999));
}
