'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Zap,
  Clock,
  TrendingUp,
  CircleCheck as CheckCircle,
  CircleAlert as AlertCircle,
  MessageCircle,
  Share2,
  Check,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { type Product, type ProductPlan } from '@/lib/types';
import { getProductArtwork } from '@/lib/productImages';
import { cn } from '@/lib/utils';
import RequestAccessModal from '@/components/RequestAccessModal';
import { getSupportStatus } from '@/utils/support';
import { toast } from 'sonner';

const WA_NUMBER = '918766253356';

const badgeConfig: Record<string, { label: string; Icon: any; cls: string }> = {
  best_seller: { label: 'Best Seller', Icon: TrendingUp, cls: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20' },
  instant_delivery: { label: 'Instant', Icon: Zap, cls: 'bg-primary/10 text-primary border-primary/20' },
  available_now: { label: 'Available', Icon: CheckCircle, cls: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' },
  limited_slots: { label: 'Limited Slots', Icon: Clock, cls: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' },
};

type Props = { product: Product };

function ProductDetailModal({ product, open, onClose }: Props & { open: boolean; onClose: () => void }) {
  const [requestOpen, setRequestOpen] = useState(false);
  const artwork = getProductArtwork(product);

  const badge = product.badge ? badgeConfig[product.badge] : null;
  const BadgeIcon = badge?.Icon;

  const hasPlans = Boolean(product.plans && product.plans.length > 0);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(0);
  const currentPlan: ProductPlan | undefined = hasPlans ? product.plans?.[selectedPlanIndex] : undefined;

  const activePrice = currentPlan ? currentPlan.price : product.price;
  const activeOriginalPrice = currentPlan?.original_price ?? product.market_price;

  const discount = activeOriginalPrice && activeOriginalPrice > activePrice
    ? Math.round(((activeOriginalPrice - activePrice) / activeOriginalPrice) * 100)
    : null;

  const getWhatsAppMessage = () => {
    let planText = '';
    if (currentPlan) {
      planText = ` - ${currentPlan.name} (₹${currentPlan.price}${currentPlan.limits ? ` • ${currentPlan.limits}` : ''})`;
    }

    if (product.category === 'reports') {
      return `Hi EduGenius Hub, I want ${product.name}${planText}. I am attaching my document file (.pdf/.docx) to this chat.`;
    }
    if (product.category === 'ott') {
      return `Hi EduGenius Hub, I want ${product.name}${planText}. Please set up a profile for me.`;
    }
    return `Hi EduGenius Hub, I want ${product.name}${planText}. Please share the details and payment link.`;
  };

  const waMsg = encodeURIComponent(getWhatsAppMessage());

  const [support, setSupport] = useState({
    isOnline: true,
    badgeColor: 'bg-green-500',
    timeText: 'Fulfillment in 5-15 mins',
  });

  useEffect(() => {
    setSupport(getSupportStatus());
  }, []);

  const handleCopyProductLink = () => {
    const url = `${window.location.origin}/product/${product.slug || product.id}`;
    navigator.clipboard.writeText(url);
    toast.success('Sharable product link copied!');
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-lg max-h-[88vh] w-[calc(100vw-1rem)] sm:w-full overflow-y-auto overscroll-contain rounded-2xl p-0 gap-0 border-border bg-card text-card-foreground shadow-xl">
          {/* Header Banner */}
          <div className="p-5 sm:p-6 bg-muted/50 border-b border-border">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3.5">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover bg-card border border-border shrink-0"
                  />
                ) : (
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-card border border-border flex items-center justify-center p-2.5 shrink-0"
                    dangerouslySetInnerHTML={{ __html: artwork.iconSvg }}
                  />
                )}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-primary font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                      {product.category}
                    </span>
                    {badge && BadgeIcon && (
                      <span className={cn('flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border', badge.cls)}>
                        <BadgeIcon className="w-2.5 h-2.5" />
                        {badge.label}
                      </span>
                    )}
                  </div>
                  <h2 className="font-bold text-base sm:text-lg text-foreground leading-tight">{product.name}</h2>
                </div>
              </div>

              <button
                onClick={handleCopyProductLink}
                className="p-2 rounded-xl bg-card hover:bg-muted border border-border text-muted-foreground hover:text-primary transition-colors shrink-0"
                title="Copy Product Link"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6 space-y-5">
            {/* Multi-Tier Plans Selector */}
            {hasPlans && product.plans && product.plans.length > 1 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-primary" />
                    <span>Choose Plan:</span>
                  </label>
                  <span className="text-xs text-primary font-bold">
                    {product.plans.length} Plans
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {product.plans.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPlanIndex(idx)}
                      className={cn(
                        'p-3 rounded-xl text-left border transition-all text-xs flex flex-col justify-between gap-1',
                        selectedPlanIndex === idx
                          ? 'border-primary bg-primary/10 text-foreground font-bold'
                          : 'border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground'
                      )}
                    >
                      <div className="font-bold text-foreground text-xs">{p.name}</div>
                      <div className="text-sm font-black text-primary">
                        ₹{p.price}
                        {p.duration && <span className="text-[10px] font-normal text-muted-foreground">/{p.duration}</span>}
                      </div>
                      {p.limits && (
                        <div className="text-[10px] text-muted-foreground truncate">{p.limits}</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Box */}
            <div className="flex items-end justify-between p-4 rounded-2xl bg-muted/50 border border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  {currentPlan ? currentPlan.name : 'Special Price'}
                </p>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-2xl sm:text-3xl font-black text-primary">
                    {activePrice > 0 ? `₹${activePrice}` : 'DM for Pricing'}
                  </span>
                  {product.plan_type && activePrice > 0 && (
                    <span className="text-xs text-muted-foreground">
                      /{currentPlan?.duration || product.plan_type.toLowerCase()}
                    </span>
                  )}
                  {activeOriginalPrice && activeOriginalPrice > activePrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      ₹{activeOriginalPrice}
                    </span>
                  )}
                  {discount && (
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                      Save {discount}%
                    </span>
                  )}
                </div>
                {currentPlan?.limits && (
                  <p className="text-xs text-foreground mt-1 font-medium">
                    Quota: {currentPlan.limits}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
                <span className={`w-2 h-2 rounded-full ${support.badgeColor} animate-pulse`} />
                <span>{support.timeText}</span>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Features */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Key Features</h4>
              {(product.features && product.features.length > 0
                ? product.features
                : [
                    'Fast delivery via WhatsApp',
                    product.is_instant ? 'Instant access after payment' : `Delivered in ${product.delivery_time}`,
                    '100% Replacement Warranty',
                  ]
              ).map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            {/* How it works */}
            {product.how_it_works && product.how_it_works.length > 0 && (
              <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">How it Works</h4>
                <div className="space-y-1.5">
                  {product.how_it_works.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="w-4 h-4 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {sIdx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Important Notes */}
            {product.account_type === 'shared' && (
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-700 dark:text-amber-400">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-500" />
                <span>This is a shared account. Do not change the password or account settings.</span>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col gap-2.5 pt-1">
              <a href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold rounded-xl py-3.5 text-sm gap-2 shadow-sm transition-transform hover:scale-[1.01]">
                  <MessageCircle className="w-4 h-4" />
                  <span>Buy on WhatsApp {currentPlan ? `(${currentPlan.name})` : ''}</span>
                </Button>
              </a>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1 border-border hover:bg-muted text-foreground rounded-xl py-2.5 text-xs font-bold"
                  onClick={() => {
                    onClose();
                    setRequestOpen(true);
                  }}
                >
                  Request Custom Quote
                </Button>

                <Link href={`/product/${product.slug || product.id}`} className="shrink-0" onClick={onClose}>
                  <Button
                    variant="outline"
                    className="border-border hover:bg-muted text-foreground rounded-xl py-2.5 px-3 text-xs"
                    title="Open Full Page"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <RequestAccessModal
        open={requestOpen}
        onClose={() => setRequestOpen(false)}
        product={{
          ...product,
          price: activePrice,
          name: currentPlan ? `${product.name} (${currentPlan.name})` : product.name,
        }}
      />
    </>
  );
}

export default function ProductCard({ product }: Props) {
  const [detailOpen, setDetailOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const artwork = getProductArtwork(product);
  const badge = product.badge ? badgeConfig[product.badge] : null;
  const BadgeIcon = badge?.Icon;

  const [support, setSupport] = useState({
    isOnline: true,
    badgeColor: 'bg-green-500',
    timeText: '5-15 mins',
  });

  useEffect(() => {
    setSupport(getSupportStatus());
  }, []);

  const hasPlans = Boolean(product.plans && product.plans.length > 0);
  const planCount = product.plans?.length || 0;
  const startingPrice = hasPlans && product.plans
    ? Math.min(...product.plans.map((p) => p.price))
    : product.price;

  const discount = product.market_price && product.market_price > startingPrice
    ? Math.round(((product.market_price - startingPrice) / product.market_price) * 100)
    : null;

  const quickOrderMsg = encodeURIComponent(
    `Hi EduGenius Hub, I want to buy ${product.name} (₹${startingPrice}). Please share the payment link and setup instructions.`
  );
  const quickWaUrl = `https://wa.me/${WA_NUMBER}?text=${quickOrderMsg}`;

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/product/${product.slug || product.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success(`Shareable link copied for ${product.name}!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div
        className="group relative flex flex-col rounded-2xl border border-border bg-card p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/30 cursor-pointer overflow-hidden"
        onClick={() => setDetailOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setDetailOpen(true)}
      >
        {/* Top visual row */}
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover bg-muted border border-border group-hover:scale-105 transition-transform"
              />
            ) : (
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-muted border border-border flex items-center justify-center p-2.5 group-hover:scale-105 transition-transform"
                dangerouslySetInnerHTML={{ __html: artwork.iconSvg }}
              />
            )}
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-card border-2 border-border flex items-center justify-center">
              <span className={`w-2 h-2 rounded-full ${support.badgeColor} animate-pulse`} />
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {badge && BadgeIcon && (
              <span className={cn('flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border', badge.cls)}>
                <BadgeIcon className="w-2.5 h-2.5" />
                {badge.label}
              </span>
            )}

            <button
              onClick={handleCopyLink}
              className="p-1.5 rounded-lg bg-card hover:bg-muted border border-border text-muted-foreground hover:text-primary transition-colors"
              title="Copy Shareable Link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Product Title & Category */}
        <div className="mb-2">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary">
              {product.category}
            </span>
            {planCount > 1 && (
              <span className="text-[10px] text-muted-foreground font-semibold">
                • {planCount} Plans
              </span>
            )}
          </div>
          <h3 className="font-bold text-foreground text-base leading-snug line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>

        <p className="text-muted-foreground text-xs mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Pricing & Buying Action */}
        <div className="mt-auto pt-3 border-t border-border">
          <div className="flex items-end justify-between mb-3">
            <div>
              <div className="flex items-baseline gap-1.5 flex-wrap">
                {hasPlans && planCount > 1 && (
                  <span className="text-[11px] text-muted-foreground font-medium">From</span>
                )}
                <span className="text-xl sm:text-2xl font-black text-primary">
                  {startingPrice > 0 ? `₹${startingPrice}` : 'DM'}
                </span>
                {product.plan_type && startingPrice > 0 && (
                  <span className="text-[11px] text-muted-foreground">/{product.plan_type.toLowerCase()}</span>
                )}
              </div>
              {product.market_price && (
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-xs text-muted-foreground line-through">₹{product.market_price}</span>
                  {discount && (
                    <span className="text-[10px] font-bold text-green-600 dark:text-green-400 bg-green-500/10 px-1 rounded">
                      {discount}% OFF
                    </span>
                  )}
                </div>
              )}
            </div>

            <span className="text-[11px] text-muted-foreground font-medium shrink-0 flex items-center gap-1">
              <Zap className="w-3 h-3 text-primary" />
              <span>Instant</span>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={quickWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full"
            >
              <Button
                className="w-full bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold rounded-xl py-2 text-xs sm:text-sm flex items-center justify-center gap-1 shadow-sm transition-transform hover:scale-[1.01]"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Buy Now</span>
              </Button>
            </a>

            <Button
              variant="outline"
              className="w-full border-border bg-card hover:bg-muted text-foreground font-bold rounded-xl py-2 text-xs sm:text-sm transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setDetailOpen(true);
              }}
            >
              <span>{hasPlans && planCount > 1 ? 'View Plans' : 'Details'}</span>
            </Button>
          </div>
        </div>
      </div>

      <ProductDetailModal product={product} open={detailOpen} onClose={() => setDetailOpen(false)} />
    </>
  );
}
