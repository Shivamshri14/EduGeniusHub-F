import { Product } from './types';

export interface ProductArtwork {
  imageUrl?: string;
  bgGradient: string;
  brandColor: string;
  accentGlow: string;
  iconSvg: string; // inline SVG string or clean visual
  badgeText: string;
}

export const PRESET_PRODUCT_IMAGES: Array<{
  id: string;
  name: string;
  keywords: string[];
  bgGradient: string;
  brandColor: string;
  accentGlow: string;
  iconSvg: string;
  defaultBadge: string;
}> = [
  {
    id: 'turnitin-plag',
    name: 'Turnitin Plagiarism Report',
    keywords: ['turnitin', 'plagiarism', 'similarity', 'plag report'],
    bgGradient: 'from-blue-600/20 via-sky-600/10 to-indigo-950/40',
    brandColor: '#2563EB',
    accentGlow: 'rgba(37, 99, 235, 0.3)',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 text-blue-400"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    defaultBadge: 'Best Seller',
  },
  {
    id: 'turnitin-ai',
    name: 'Turnitin AI Detection',
    keywords: ['turnitin ai', 'ai detection', 'ai report', 'ai detector'],
    bgGradient: 'from-cyan-600/20 via-blue-600/10 to-slate-950/40',
    brandColor: '#06B6D4',
    accentGlow: 'rgba(6, 182, 212, 0.3)',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 text-cyan-400"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="8.5" r="1.5"/><path d="M9 15c.83 1 2 1.5 3 1.5s2.17-.5 3-1.5"/></svg>`,
    defaultBadge: 'High Accuracy',
  },
  {
    id: 'chatgpt-plus',
    name: 'ChatGPT Plus (GPT-4o)',
    keywords: ['chatgpt', 'gpt-4', 'openai', 'chat gpt'],
    bgGradient: 'from-emerald-600/20 via-teal-700/10 to-slate-950/40',
    brandColor: '#10B981',
    accentGlow: 'rgba(16, 185, 129, 0.3)',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 text-emerald-400"><path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>`,
    defaultBadge: 'Best Seller',
  },
  {
    id: 'netflix-premium',
    name: 'Netflix Premium 4K UHD',
    keywords: ['netflix', 'ott', '4k uhd', 'streaming'],
    bgGradient: 'from-red-600/20 via-rose-800/10 to-slate-950/40',
    brandColor: '#E50914',
    accentGlow: 'rgba(229, 9, 20, 0.3)',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 text-red-500"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>`,
    defaultBadge: '4K Ultra HD',
  },
  {
    id: 'claude-api',
    name: 'Claude API / Pro (Opus & Sonnet)',
    keywords: ['claude', 'anthropic', 'sonnet', 'opus', 'claude api'],
    bgGradient: 'from-amber-600/20 via-orange-700/10 to-purple-950/40',
    brandColor: '#D97706',
    accentGlow: 'rgba(217, 119, 6, 0.3)',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 text-amber-400"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    defaultBadge: 'Private Access',
  },
  {
    id: 'cursor-ai',
    name: 'Cursor AI Usage Credits',
    keywords: ['cursor', 'cursor ai', 'agent credit'],
    bgGradient: 'from-sky-500/20 via-blue-600/10 to-slate-950/40',
    brandColor: '#0EA5E9',
    accentGlow: 'rgba(14, 165, 233, 0.3)',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 text-sky-400"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
    defaultBadge: 'Fast Activation',
  },
  {
    id: 'stealthwriter',
    name: 'StealthWriter Premium',
    keywords: ['stealthwriter', 'stealth writer', 'humanizer', 'humanize'],
    bgGradient: 'from-amber-500/20 via-orange-600/10 to-slate-950/40',
    brandColor: '#F59E0B',
    accentGlow: 'rgba(245, 158, 11, 0.3)',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 text-[#F4B400]"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/></svg>`,
    defaultBadge: 'Undetectable AI',
  },
  {
    id: 'quillbot',
    name: 'QuillBot Premium',
    keywords: ['quillbot', 'paraphrase', 'quill'],
    bgGradient: 'from-green-600/20 via-emerald-700/10 to-slate-950/40',
    brandColor: '#16A34A',
    accentGlow: 'rgba(22, 163, 74, 0.3)',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 text-green-400"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>`,
    defaultBadge: 'Instant Login',
  },
  {
    id: 'grammarly',
    name: 'Grammarly Premium',
    keywords: ['grammarly', 'grammar'],
    bgGradient: 'from-teal-600/20 via-emerald-700/10 to-slate-950/40',
    brandColor: '#0D9488',
    accentGlow: 'rgba(13, 148, 136, 0.3)',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 text-teal-400"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`,
    defaultBadge: 'Official Access',
  },
  {
    id: 'canva-pro',
    name: 'Canva Pro Invite',
    keywords: ['canva', 'canva pro', 'design'],
    bgGradient: 'from-fuchsia-600/20 via-cyan-600/10 to-slate-950/40',
    brandColor: '#06B6D4',
    accentGlow: 'rgba(6, 182, 212, 0.3)',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 text-cyan-400"><circle cx="12" cy="12" r="10"/><path d="M8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0z"/></svg>`,
    defaultBadge: '1 Year Access',
  },
  {
    id: 'prime-video',
    name: 'Amazon Prime Video',
    keywords: ['prime video', 'amazon prime', 'prime'],
    bgGradient: 'from-sky-600/20 via-blue-700/10 to-slate-950/40',
    brandColor: '#0284C7',
    accentGlow: 'rgba(2, 132, 199, 0.3)',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 text-sky-400"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
    defaultBadge: 'Private Profile',
  },
  {
    id: 'academic-writing',
    name: 'Thesis & Dissertation Writing',
    keywords: ['thesis', 'dissertation', 'writing', 'academic', 'research paper'],
    bgGradient: 'from-amber-600/20 via-yellow-700/10 to-slate-950/40',
    brandColor: '#D97706',
    accentGlow: 'rgba(217, 119, 6, 0.3)',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 text-amber-400"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
    defaultBadge: 'Expert Writers',
  },
];

/**
 * Returns matching artwork and visual styling for any product
 */
export function getProductArtwork(product: Partial<Product>): ProductArtwork {
  const text = `${product.name || ''} ${product.slug || ''} ${product.description || ''}`.toLowerCase();

  // Try finding a matching preset
  const matched = PRESET_PRODUCT_IMAGES.find((preset) =>
    preset.keywords.some((k) => text.includes(k))
  );

  if (matched) {
    return {
      imageUrl: product.image_url || undefined,
      bgGradient: matched.bgGradient,
      brandColor: matched.brandColor,
      accentGlow: matched.accentGlow,
      iconSvg: matched.iconSvg,
      badgeText: matched.defaultBadge,
    };
  }

  // Category fallback styling
  const cat = product.category;
  if (cat === 'reports') {
    return {
      imageUrl: product.image_url || undefined,
      bgGradient: 'from-blue-600/20 via-indigo-700/10 to-slate-950/40',
      brandColor: '#2563EB',
      accentGlow: 'rgba(37, 99, 235, 0.3)',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 text-blue-400"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
      badgeText: 'Instant Report',
    };
  }

  if (cat === 'ott') {
    return {
      imageUrl: product.image_url || undefined,
      bgGradient: 'from-rose-600/20 via-pink-700/10 to-slate-950/40',
      brandColor: '#E11D48',
      accentGlow: 'rgba(225, 29, 72, 0.3)',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 text-rose-400"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg>`,
      badgeText: 'HD Streaming',
    };
  }

  if (cat === 'services') {
    return {
      imageUrl: product.image_url || undefined,
      bgGradient: 'from-amber-600/20 via-orange-700/10 to-slate-950/40',
      brandColor: '#F59E0B',
      accentGlow: 'rgba(245, 158, 11, 0.3)',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 text-amber-400"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
      badgeText: 'Premium Service',
    };
  }

  // Default AI Tools styling
  return {
    imageUrl: product.image_url || undefined,
    bgGradient: 'from-emerald-600/20 via-teal-700/10 to-slate-950/40',
    brandColor: '#10B981',
    accentGlow: 'rgba(16, 185, 129, 0.3)',
    iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8 text-emerald-400"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>`,
    badgeText: 'AI Premium',
  };
}
