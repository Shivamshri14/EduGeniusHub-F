export type ToolCategory = "Reports" | "Accounts" | "OTT" | "Services";

export type AccountType =
  | "Private Account"
  | "Shared Account"
  | "Mail Access Account";

export type ToolItem = {
  id: string;
  title: string;
  category: "Reports" | "Accounts" | "OTT" | "Services";
  description: string;
  imageUrl: string;
  active: boolean;
  featured?: boolean;
  sortOrder?: number;
  accountTypes?: AccountType[];   // ✅ new
  plans?: ToolPlan[];             // ✅ new
  price?: number;
  mrp?: number;
  pricingText?: string;

  billingPlanMonths: number[];

  // ✅ ADD THIS LINE
  accountType?: AccountType;
};

export type ToolPlan = {
  months: number;
  price?: number;     // optional
  mrp?: number;       // optional
  pricingText?: string; // optional fallback like "Inquire Now"
};


export type ComboItem = {
  id: string;
  title: string;
  description: string;
  includes: string[]; // tool titles

  // Pricing
  price?: number;
  pricingText?: string;

  // Plans
  billingPlanMonths: number[];
  accountType: AccountType;

  // Media
  imageUrl: string;

  // Visibility & ordering
  active: boolean;
  sortOrder: number;
};

export type DealItem = {
  id: string;
  title: string;
  flashText: string;
  validTill: string; // ISO date string, e.g. 2026-01-31

  // Exactly one of these should be set
  toolId?: string;
  comboId?: string;

  active: boolean;
  sortOrder: number;
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  price?: number;
  pricingText?: string;
  imageUrl?: string;
  active: boolean;
  sortOrder: number;
};

export type ReviewItem = {
  id: string;
  imageUrl: string;
  active: boolean;
  sortOrder: number;
};
