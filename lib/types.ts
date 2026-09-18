export type ProductCategory = 'reports' | 'accounts' | 'ai_tools' | 'ott' | 'services';

export type ProductPlan = {
  name: string;
  price: number;
  original_price?: number | null;
  duration?: string | null;
  limits?: string | null;
  details?: string | null;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: ProductCategory;
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
  features?: string[];
  plans?: ProductPlan[];
  how_it_works?: string[];
  important_notes?: string[];
  stock_status?: 'in_stock' | 'limited' | 'out_of_stock';
  created_at?: string;
  updated_at?: string;
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
  category?: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
};

export type NoticeVariant = 'primary' | 'warning' | 'info' | 'success' | 'destructive';
export type NoticeType = 'banner' | 'alert' | 'popup';

export type NoticeItem = {
  id: string;
  title: string;
  message: string;
  badge?: string | null;
  type: NoticeType;
  variant: NoticeVariant;
  link?: string | null;
  link_text?: string | null;
  is_active: boolean;
  is_dismissible: boolean;
  sort_order: number;
  start_date?: string | null;
  end_date?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type ServiceItem = {
  id: string;
  slug?: string;
  title: string;
  description: string;
  items: string[];
  cta_text: string;
  cta_type: string;
  is_active: boolean;
  sort_order: number;
  created_at?: string;
};

export type ReviewItemData = {
  id: string;
  name: string;
  role?: string | null;
  quote: string;
  image_url?: string | null;
  rating: number;
  is_active: boolean;
  sort_order: number;
  created_at?: string;
};

export type SiteConfigData = {
  id?: string;
  brand: string;
  phone_display: string;
  phone_e164: string;
  whatsapp_community_url: string;
  instagram_url: string;
  reports_delivered: string;
  students_served: string;
  satisfaction: string;
  response_time: string;
  hero_headline?: string;
  hero_subheadline?: string;
  reseller_title?: string;
  reseller_description?: string;
  created_at?: string;
  updated_at?: string;
};

