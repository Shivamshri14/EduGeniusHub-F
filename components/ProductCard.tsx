'use client';

import { useState } from 'react';
import { Zap, Clock, TrendingUp, CircleCheck as CheckCircle, CircleAlert as AlertCircle, X, MessageCircle, ExternalLink, Star, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { type Product } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import RequestAccessModal from '@/components/RequestAccessModal';

const WA_NUMBER = '918766253356';

const badgeConfig = {
  best_seller: { label: 'Best Seller', Icon: TrendingUp, cls: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
  instant_delivery: { label: 'Instant', Icon: Zap, cls: 'bg-[#F4B400]/10 text-amber-600 dark:text-[#F4B400] border-[#F4B400]/20' },
  available_now: { label: 'Available', Icon: CheckCircle, cls: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' },
  limited_slots: { label: 'Limited Slots', Icon: Clock, cls: 'bg-red-500/10 text-red-500 border-red-500/20' },
};

const categoryStyle: Record<string, { gradient: string; emoji: string; label: string }> = {
  reports: { gradient: 'from-blue-500/8 to-blue-600/4', emoji: '📑', label: 'Report' },
  accounts: { gradient: 'from-violet-500/8 to-violet-600/4', emoji: '🎓', label: 'Account' },
  ai_tools: { gradient: 'from-emerald-500/8 to-emerald-600/4', emoji: '🤖', label: 'AI Tool' },
  ott: { gradient: 'from-pink-500/8 to-pink-600/4', emoji: '🎬', label: 'OTT' },
};

type Props = { product: Product };

function ProductDetailModal({ product, open, onClose }: Props & { open: boolean; onClose: () => void }) {
  const [requestOpen, setRequestOpen] = useState(false);
  const cat = categoryStyle[product.category] ?? { gradient: '', emoji: '📦', label: product.category };
  const badge = product.badge ? badgeConfig[product.badge] : null;
  const BadgeIcon = badge?.Icon;
  const discount = product.market_price
    ? Math.round(((product.market_price - product.price) / product.market_price) * 100)
    : null;

  const waMsg = encodeURIComponent(
    `Hi EduGenius Hub 👋\n\nI want to order:\n\n*Product:* ${product.name}\n*Price:* ₹${product.price}${product.plan_type ? ' / ' + product.plan_type.toLowerCase() : ''}\n\nPlease guide me.`
  );

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-lg rounded-2xl p-0 overflow-hidden gap-0 border-border">
          {/* Header */}
          <div className={cn('p-6 pb-5 bg-gradient-to-br', cat.gradient, 'relative')}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-background/80 border border-border flex items-center justify-center text-2xl shadow-sm">
                  {cat.emoji}
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-medium mb-0.5 uppercase tracking-wide">{cat.label}</div>
                  <h2 className="font-bold text-lg leading-tight">{product.name}</h2>
                </div>
              </div>
              {badge && BadgeIcon && (
                <span className={cn('flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap', badge.cls)}>
                  <BadgeIcon className="w-3 h-3" />
                  {badge.label}
                </span>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5">
            {/* Price */}
            <div className="flex items-end justify-between p-4 rounded-xl bg-muted/50 border border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Our Price</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black">₹{product.price}</span>
                  {product.plan_type && (
                    <span className="text-xs text-muted-foreground">/{product.plan_type.toLowerCase()}</span>
                  )}
                </div>
                {product.market_price && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground line-through">₹{product.market_price} market price</span>
                    {discount && (
                      <span className="text-xs font-bold text-green-600 dark:text-green-400">{discount}% off</span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>{product.delivery_time}</span>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h4 className="text-sm font-semibold mb-2">About this product</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Features placeholder */}
            <div className="space-y-2">
              {[
                'Fast delivery via WhatsApp',
                product.is_instant ? 'Instant access after payment' : `Delivered in ${product.delivery_time}`,
                'Dedicated customer support',
                'Satisfaction guaranteed',
              ].map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            {/* Warning */}
            {product.account_type === 'shared' && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-400">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>This is a shared account. Do not change the password or personal details.</span>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col gap-2.5 pt-1">
              <Button
                className="w-full bg-[#F4B400] hover:bg-[#d9a200] text-[#0B1F3A] font-bold rounded-xl py-3 text-sm hover:scale-[1.02] transition-all shadow-md shadow-[#F4B400]/20"
                onClick={() => { onClose(); setRequestOpen(true); }}
              >
                Request Access
              </Button>
              <a href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="w-full rounded-xl py-3 text-sm gap-2 hover:border-[#25D366]/40 hover:text-[#25D366] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Order on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <RequestAccessModal open={requestOpen} onClose={() => setRequestOpen(false)} product={product} />
    </>
  );
}

export default function ProductCard({ product }: Props) {
  const [detailOpen, setDetailOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);

  const cat = categoryStyle[product.category] ?? { gradient: 'from-muted/40 to-muted/20', emoji: '📦', label: '' };
  const badge = product.badge ? badgeConfig[product.badge] : null;
  const BadgeIcon = badge?.Icon;
  const discount = product.market_price
    ? Math.round(((product.market_price - product.price) / product.market_price) * 100)
    : null;

  return (
    <>
      <div
        className={cn(
          'group relative flex flex-col rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 hover:border-[#F4B400]/30 cursor-pointer',
          'bg-gradient-to-br',
          cat.gradient
        )}
        onClick={() => setDetailOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setDetailOpen(true)}
      >
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-background/80 border border-border flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform">
            {cat.emoji}
          </div>
          {badge && BadgeIcon && (
            <span className={cn('flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border', badge.cls)}>
              <BadgeIcon className="w-3 h-3" />
              {badge.label}
            </span>
          )}
        </div>

        <h3 className="font-bold text-[15px] mb-1 leading-tight line-clamp-2">{product.name}</h3>
        <p className="text-muted-foreground text-xs mb-4 line-clamp-2 leading-relaxed">{product.description}</p>

        <div className="mt-auto">
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black">₹{product.price}</span>
                {product.plan_type && (
                  <span className="text-xs text-muted-foreground">/{product.plan_type.toLowerCase()}</span>
                )}
              </div>
              {product.market_price && (
                <div className="flex items-center gap-1.5 mt-0.5">
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
            className="w-full bg-[#F4B400] hover:bg-[#d9a200] text-[#0B1F3A] font-bold rounded-xl py-2.5 text-sm hover:scale-[1.02] transition-all"
            onClick={(e) => { e.stopPropagation(); setRequestOpen(true); }}
          >
            Request Access
          </Button>
        </div>
      </div>

      <ProductDetailModal product={product} open={detailOpen} onClose={() => setDetailOpen(false)} />
      <RequestAccessModal open={requestOpen} onClose={() => setRequestOpen(false)} product={product} />
    </>
  );
}
