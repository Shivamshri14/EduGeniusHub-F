'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/ProductCard';
import { getLocalProducts } from '@/lib/localProducts';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';

const categoryFilters = [
  { id: 'all',      label: 'All' },
  { id: 'reports',  label: '📑 Reports' },
  { id: 'ai_tools', label: '🤖 AI Tools' },
  { id: 'ott',      label: '🎬 OTT' },
];

const ALL_PRODUCTS = getLocalProducts();

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') ?? 'all';

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(categoryParam);

  const filtered = ALL_PRODUCTS.filter((p) => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.description ?? '').toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      <div className="flex flex-col gap-4 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-10 rounded-xl h-12 text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categoryFilters.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200',
                activeCategory === cat.id
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-card border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm mt-1">Try a different search or category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product as unknown as Product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen pt-20 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-10">
          <h1 className="text-4xl font-black mb-2">All Products</h1>
          <p className="text-muted-foreground">Find the perfect tool for your needs</p>
        </div>
        <Suspense fallback={<div className="animate-pulse h-12 bg-muted rounded-xl" />}>
          <ProductsContent />
        </Suspense>
      </div>
    </main>
  );
}
