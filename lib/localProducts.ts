import { TOOLS, COMBO_TOOLS, type Tool, type ComboTool } from './tools';

export type LocalProduct = {
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
};

const CATEGORY_MAP: Record<string, LocalProduct['category']> = {
  report: 'reports',
  account: 'ai_tools',
  ott: 'ott',
};

const BADGE_MAP: Record<string, LocalProduct['badge']> = {
  'turnitin-plag': 'best_seller',
  'turnitin-ai': 'best_seller',
  'turnitin-combo': 'instant_delivery',
  'chatgpt-plus': 'best_seller',
  'netflix-premium': 'best_seller',
  'quillbot-premium': 'available_now',
  'grammarly-premium': 'available_now',
  'paperpal': 'available_now',
  'jenni-ai': 'available_now',
  'perplexity-ai': 'available_now',
  'prime-video': 'limited_slots',
  'zee5-premium': 'available_now',
  'sonyliv-premium': 'available_now',
};

const FEATURED = ['turnitin-plag', 'turnitin-combo', 'chatgpt-plus', 'netflix-premium', 'quillbot-premium', 'grammarly-premium'];

const DELIVERY_MAP: Record<string, string> = {
  report: '30–60 min',
  account: '5–15 min',
  ott: '5–15 min',
};

function toolToProduct(tool: Tool, index: number): LocalProduct {
  const cat = CATEGORY_MAP[tool.category] ?? 'ai_tools';
  return {
    id: tool.id,
    name: tool.name,
    slug: tool.id,
    description: tool.description,
    category: cat,
    price: tool.ourPrice,
    market_price: tool.marketPrice,
    image_url: null,
    badge: BADGE_MAP[tool.id] ?? null,
    delivery_time: DELIVERY_MAP[tool.category] ?? '5–30 min',
    is_instant: tool.category !== 'report',
    is_featured: FEATURED.includes(tool.id),
    is_hidden: !(tool.display ?? true),
    plan_type: tool.planType ?? '',
    account_type: tool.accountType ?? null,
    sort_order: index,
  };
}

export function getLocalProducts(): LocalProduct[] {
  return TOOLS
    .filter((t) => t.display !== false)
    .map((t, i) => toolToProduct(t, i));
}

export function getFeaturedProducts(): LocalProduct[] {
  return getLocalProducts().filter((p) => p.is_featured);
}

export function getProductsByCategory(category: string): LocalProduct[] {
  if (category === 'all') return getLocalProducts();
  return getLocalProducts().filter((p) => p.category === category);
}
