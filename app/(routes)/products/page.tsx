'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, X, Sparkles, Shield, Zap, Headphones } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/ProductCard';
import { getLocalProducts } from '@/lib/localProducts';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';

const categoryFilters = [
  { id: 'all',      label: 'All Tools' },
  { id: 'reports',  label: 'Turnitin Reports' },
  { id: 'ai_tools', label: 'AI Tools & API' },
  { id: 'ott',      label: 'OTT Subscriptions' },
  { id: 'services', label: 'Academic Services' },
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
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search Turnitin, ChatGPT, Netflix, Claude, Cursor..."
            className="pl-12 pr-10 rounded-2xl h-12 sm:h-14 text-sm sm:text-base bg-card border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-hide -mx-4 px-4">
          {categoryFilters.map((cat) => {
            const count = cat.id === 'all'
              ? products.length
              : products.filter((p) => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'flex-shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all duration-200 flex items-center gap-1.5',
                  activeCategory === cat.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
                )}
              >
                <span>{cat.label}</span>
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.2 rounded-full font-black',
                    activeCategory === cat.id ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted text-muted-foreground'
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
        <div className="text-center py-16 sm:py-20 bg-muted/30 rounded-2xl border border-border">
          <Search className="w-10 h-10 mx-auto mb-4 opacity-30 text-primary" />
          <p className="text-lg font-bold text-foreground">No matching products found</p>
          <p className="text-sm text-muted-foreground mt-1">Try another search term or click &apos;All Tools&apos;</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
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
    <main className="min-h-screen pt-20 pb-20 sm:pb-24 bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4">
        {/* Page Title Header */}
        <div className="mb-8 pt-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-bold px-3.5 py-1.5 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Digital Access at Student Prices</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight mb-2">
            Explore All <span className="text-primary">Tools & Subscriptions</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Instant delivery via WhatsApp. 100% verified validity with dedicated support.
          </p>
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-3 gap-3 mb-8 p-3 rounded-2xl bg-muted/30 border border-border text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-2 px-1 sm:px-2">
            <Zap className="w-4 h-4 text-primary shrink-0" />
            <span className="hidden sm:inline">Fulfillment in <strong className="text-foreground">5-15 mins</strong></span>
            <span className="sm:hidden"><strong className="text-foreground">5-15 min</strong></span>
          </div>
          <div className="flex items-center gap-2 px-1 sm:px-2">
            <Shield className="w-4 h-4 text-green-500 shrink-0" />
            <span className="hidden sm:inline"><strong className="text-foreground">100% Replacement</strong> Guarantee</span>
            <span className="sm:hidden"><strong className="text-foreground">100% Warranty</strong></span>
          </div>
          <div className="flex items-center gap-2 px-1 sm:px-2">
            <Headphones className="w-4 h-4 text-primary shrink-0" />
            <span className="hidden sm:inline"><strong className="text-foreground">24/7 WhatsApp</strong> Support</span>
            <span className="sm:hidden"><strong className="text-foreground">24/7</strong> Support</span>
          </div>
        </div>

        <Suspense fallback={<div className="animate-pulse h-14 bg-muted rounded-2xl" />}>
          <ProductsContent />
        </Suspense>
      </div>
    </main>
  );
}
