'use client';

import { useState } from 'react';
import { Zap, Clock, Star, TrendingUp, CircleCheck as CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Product } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import RequestAccessModal from '@/components/RequestAccessModal';

const badgeConfig = {
  best_seller: { label: 'Best Seller', icon: TrendingUp, className: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
  instant_delivery: { label: 'Instant', icon: Zap, className: 'bg-[#FFD60A]/10 text-yellow-600 dark:text-[#FFD60A] border-[#FFD60A]/20' },
  available_now: { label: 'Available', icon: CheckCircle, className: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' },
  limited_slots: { label: 'Limited Slots', icon: Clock, className: 'bg-red-500/10 text-red-500 border-red-500/20' },
};

const categoryColors: Record<string, string> = {
  reports: 'from-blue-500/10 to-blue-600/5',
  accounts: 'from-purple-500/10 to-purple-600/5',
  ai_tools: 'from-emerald-500/10 to-emerald-600/5',
  ott: 'from-pink-500/10 to-pink-600/5',
};

const categoryEmoji: Record<string, string> = {
  reports: '📑',
  accounts: '🎓',
  ai_tools: '🤖',
  ott: '🎬',
};

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const badge = product.badge ? badgeConfig[product.badge] : null;
  const BadgeIcon = badge?.icon;
  const discount = product.market_price
    ? Math.round(((product.market_price - product.price) / product.market_price) * 100)
    : null;

  return (
    <>
      <div
        className={cn(
          'group relative flex flex-col rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-accent/50 cursor-pointer',
          'bg-gradient-to-br',
          categoryColors[product.category] || 'from-muted/50 to-muted/20'
        )}
        onClick={() => setModalOpen(true)}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-background/80 border border-border flex items-center justify-center text-2xl shadow-sm">
            {categoryEmoji[product.category]}
          </div>
          {badge && BadgeIcon && (
            <span className={cn('flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border', badge.className)}>
              <BadgeIcon className="w-3 h-3" />
              {badge.label}
            </span>
          )}
        </div>

        <h3 className="font-bold text-base mb-1 leading-tight line-clamp-2">{product.name}</h3>
        <p className="text-muted-foreground text-xs mb-4 line-clamp-2 leading-relaxed">{product.description}</p>

        <div className="mt-auto">
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-foreground">₹{product.price}</span>
                {product.plan_type && (
                  <span className="text-xs text-muted-foreground">/{product.plan_type.toLowerCase()}</span>
                )}
              </div>
              {product.market_price && (
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground line-through">₹{product.market_price}</span>
                  {discount && (
                    <span className="text-xs font-bold text-green-600 dark:text-green-400">{discount}% off</span>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{product.delivery_time}</span>
            </div>
          </div>

          <Button
            className="w-full bg-[#FFD60A] hover:bg-[#e6c000] text-[#0B1220] font-bold rounded-xl py-2.5 text-sm"
            onClick={(e) => { e.stopPropagation(); setModalOpen(true); }}
          >
            Request Access
          </Button>
        </div>
      </div>

      <RequestAccessModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={product}
      />
    </>
  );
}
