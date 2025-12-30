export interface Profile {
  id: string;
  role: 'admin' | 'customer';
  phone: string;
  email?: string;
  created_at: string;
}

export interface Software {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
}

export interface Plan {
  id: string;
  software_id: string;
  plan_type: 'private' | 'shared';
  display_name: string;
  max_seats?: number;
  created_at: string;
  software?: Software;
}

export interface Customer {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  notes?: string;
  profile_id?: string;
  created_at: string;
  profile?: Profile;
}

export interface Subscription {
  id: string;
  customer_id: string;
  plan_id: string;
  start_date: string;
  end_date: string;
  status: 'active' | 'expired' | 'cancelled';
  created_at: string;
  customer?: Customer;
  plan?: Plan;
}

export interface Credential {
  id: string;
  subscription_id: string;
  login_id: string;
  password: string;
  notes?: string;
  created_at: string;
  subscription?: Subscription;
}

export interface Settings {
  id: string;
  admin_email?: string;
  instagram_url?: string;
  whatsapp_community_url?: string;
  whatsapp_direct_url?: string;
  created_at: string;
}

export interface CustomerSubscriptionWithDetails extends Subscription {
  customer: Customer;
  plan: Plan & { software: Software };
  credentials?: Credential[];
}

export type Tool = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  officialUrl: string;
  image: string;
  marketPrice: number;
  ourPrice: number;
  category: 'report' | 'account' | 'ott';
};

export type ComboTool = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tools: string[];
  image: string;
  marketPrice: number;
  ourPrice: number;
};
