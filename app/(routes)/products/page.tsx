'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, X, Sparkles, Shield, Zap, Headphones, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/ProductCard';
import { getLocalProducts } from '@/lib/localProducts';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';

const categoryFilters = [
  { id: 'all',      label: '⚡ All Tools' },
  { id: 'reports',  label: '📑 Turnitin Reports' },
  { id: 'ai_tools', label: '🤖 AI Tools & API' },
  { id: 'ott',      label: '🎬 OTT Subscriptions' },
  { id: 'services', label: '✍️ Academic Services' },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') ?? 'all';

  const [products, setProducts] = useState<Product[]>(getLocalProducts() as unknown as Product[]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  // Fetch dynamically from MongoDB API with local fallback
  useEffect(() => {
    let isMounted = true;
    async function fetchCatalog() {
      setIsLoading(true);
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (data.products && isMounted) {
            setProducts(data.products);
          }
        }
      } catch (err) {
        console.warn('Failed to load dynamic products, using fallback:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchCatalog();
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.description ?? '').toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      {/* Search Bar & Category Filters */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Search Turnitin, ChatGPT, Netflix, Claude, Cursor, StealthWriter..."
            className="pl-12 pr-10 rounded-2xl h-14 text-sm sm:text-base bg-slate-900/90 border-slate-700/80 text-white placeholder:text-slate-400 focus-visible:ring-[#F4B400] shadow-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-hide">
          {categoryFilters.map((cat) => {
            const count = cat.id === 'all'
              ? products.length
              : products.filter((p) => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'flex-shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all duration-200 flex items-center gap-1.5 shadow-sm',
                  activeCategory === cat.id
                    ? 'bg-[#F4B400] text-[#0B1F3A] border-[#F4B400] shadow-lg shadow-[#F4B400]/20 scale-[1.02]'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                )}
              >
                <span>{cat.label}</span>
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.2 rounded-full font-black',
                    activeCategory === cat.id ? 'bg-[#0B1F3A]/20 text-[#0B1F3A]' : 'bg-slate-800 text-slate-400'
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800/80">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-30 text-[#F4B400]" />
          <p className="text-lg font-bold text-white">No matching products found</p>
          <p className="text-xs text-slate-400 mt-1">Try another search term or click &apos;All Tools&apos;</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id || product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen pt-20 pb-24 bg-[#07121f] text-slate-100 relative overflow-hidden">
      {/* Background glow ambiance */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F4B400]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-80 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Page Title Header */}
        <div className="mb-8 pt-4">
          <div className="inline-flex items-center gap-2 bg-[#F4B400]/15 border border-[#F4B400]/30 text-[#F4B400] text-xs font-bold px-3.5 py-1.5 rounded-full mb-3 shadow-inner">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Digital Access at Student Prices</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-2">
            Explore All <span className="text-[#F4B400]">Tools & Subscriptions</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Instant delivery via WhatsApp. 100% verified validity with dedicated support.
          </p>
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 p-3 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
          <div className="flex items-center gap-2 px-2">
            <Zap className="w-4 h-4 text-[#F4B400] shrink-0" />
            <span>Fulfillment in <strong>5–15 mins</strong></span>
          </div>
          <div className="flex items-center gap-2 px-2">
            <Shield className="w-4 h-4 text-green-400 shrink-0" />
            <span><strong>100% Replacement</strong> Guarantee</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-2">
            <Headphones className="w-4 h-4 text-cyan-400 shrink-0" />
            <span><strong>24/7 WhatsApp</strong> Customer Support</span>
          </div>
        </div>

        <Suspense fallback={<div className="animate-pulse h-14 bg-slate-900 rounded-2xl" />}>
          <ProductsContent />
        </Suspense>
      </div>
    </main>
  );
}
