export type Category = {
  id: string;
  label: string;
  value: "report" | "account" | "ott";
};

export const categories: Category[] = [
  { id: "all", label: "All Tools", value: "report" },
  { id: "reports", label: "Reports", value: "report" },
  { id: "accounts", label: "Accounts", value: "account" },
  { id: "ott", label: "OTT Platforms", value: "ott" },
];
