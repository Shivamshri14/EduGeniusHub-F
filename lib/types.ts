export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: 'reports' | 'accounts' | 'ai_tools' | 'ott';
  price: number;
  market_price: number | null;
  image_url: string | null;
  badge: 'best_seller' | 'instant_delivery' | 'available_now' | 'limited_slots' | null;
  delivery_time: string;
  is_instant: boolean;
  is_featured: boolean;
  is_hidden: boolean;
  plan_type: string;
  account_type: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  product_id: string | null;
  product_name: string | null;
  duration: string | null;
  notes: string | null;
  status: 'new' | 'pending' | 'paid' | 'delivered' | 'closed';
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Customer = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  tags: string[];
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Order = {
  id: string;
  lead_id: string | null;
  customer_id: string | null;
  product_id: string | null;
  product_name: string;
  amount: number;
  status: 'pending' | 'paid' | 'delivered' | 'cancelled';
  delivery_message: string | null;
  created_at: string;
  updated_at: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  avatar_url: string | null;
  rating: number;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
};
