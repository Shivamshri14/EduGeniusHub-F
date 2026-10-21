'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import { categoryLabel } from '@/lib/publicCopy';
import { cn } from '@/lib/utils';
import type { Product } from '@/lib/types';

const categoryFilters = [
  { id: 'all', label: 'All' },
  { id: 'reports', label: 'Reports' },
  { id: 'ai_tools', label: 'AI tools' },
  { id: 'ott', label: 'OTT' },
  { id: 'accounts', label: 'Accounts' },
  { id: 'services', label: 'Academic help' },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') ?? 'all';

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [isLoading, setIsLoading] = useState(true);

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
          if (data.products && isMounted) setProducts(data.products);
        }
      } catch (err) {
        console.warn('Failed to load products:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchCatalog();
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = products.filter((product) => {
    const matchCat = activeCategory === 'all' || product.category === activeCategory;
    const matchSearch =
      !search ||
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      (product.description ?? '').toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const visibleFilters = categoryFilters.filter((cat) => {
    if (cat.id === 'all') return true;
    return products.some((product) => product.category === cat.id);
  });

  const heading = activeCategory === 'all' ? 'Products' : categoryLabel(activeCategory);

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h1>
      <p className="mb-8 max-w-2xl text-base text-muted-foreground">
        Each card shows the price and the delivery time for that item. Order on WhatsApp.
      </p>
      <div className="mb-8 flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products"
            aria-label="Search products"
            className="h-12 rounded-xl border-border bg-card pl-12 pr-10 text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {visibleFilters.map((cat) => {
            const href = cat.id === 'all' ? '/products' : `/products?category=${cat.id}`;
            const active = activeCategory === cat.id;
            return (
              <Link
                key={cat.id}
                href={href}
                className={cn(
                  'min-h-11 shrink-0 rounded-xl border px-4 py-2.5 text-sm font-semibold',
                  active ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-foreground'
                )}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-border py-16 text-center">
          <p className="text-lg font-semibold">No matching products</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id || product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductsCatalog() {
  return (
    <main className="min-h-screen bg-background px-4 pb-8 pt-8 text-foreground">
      <div className="mx-auto max-w-6xl">
        <Suspense fallback={<div className="h-14 animate-pulse rounded-xl bg-muted" />}>
          <ProductsContent />
        </Suspense>
      </div>
    </main>
  );
}
