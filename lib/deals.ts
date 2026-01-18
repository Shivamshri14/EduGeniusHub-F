export type DealItem = {
  id: string;
  title: string;
  flashText?: string;
  validTill: string;
  toolId?: string;
  comboId?: string;
  active: boolean;
  sortOrder?: number;
};

export const deals: DealItem[] = [
  {
    id: "deal-turnitin-combo",
    title: "Turnitin Plagiarism + AI Combo",
    flashText: "Limited time offer",
    validTill: "2026-12-31",
    toolId: "turnitin-combo",
    active: true,
    sortOrder: 10,
  },
  {
    id: "deal-writing-pro",
    title: "Writing Pro Combo",
    flashText: "Limited time offer",
    validTill: "2026-12-31",
    comboId: "combo-writing-pro",
    active: true,
    sortOrder: 20,
  },
];

export function activeDeals() {
  const now = new Date();
  return deals
    .filter((d) => d.active)
    .filter((d) => {
      const till = new Date(d.validTill);
      return !Number.isNaN(till.getTime()) && till.getTime() >= now.getTime();
    })
    .sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999))
    .slice(0, 2);
}
