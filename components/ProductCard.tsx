'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  CircleCheck as CheckCircle,
  CircleAlert as AlertCircle,
  MessageCircle,
  Share2,
  Check,
  ExternalLink,
  Layers,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { type Product, type ProductPlan } from '@/lib/types';
import { getProductArtwork } from '@/lib/productImages';
import { categoryLabel, pricePeriod, publicDescription, publicName } from '@/lib/publicCopy';
import { cn } from '@/lib/utils';
import RequestAccessModal from '@/components/RequestAccessModal';
import { toast } from 'sonner';

const WA_NUMBER = '918766253356';

const badgeConfig: Record<string, { label: string; Icon: any; cls: string }> = {
  best_seller: { label: 'Popular', Icon: TrendingUp, cls: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20' },
};

function shownBadge(badge?: string | null) {
  if (!badge || badge === 'instant_delivery' || badge === 'limited_slots' || badge === 'available_now') return null;
  return badgeConfig[badge] || null;
}

type Props = { product: Product };

function ProductDetailModal({ product, open, onClose }: Props & { open: boolean; onClose: () => void }) {
  const [requestOpen, setRequestOpen] = useState(false);
  const artwork = getProductArtwork(product);

  const badge = shownBadge(product.badge);
  const BadgeIcon = badge?.Icon;
  const displayName = publicName(product.name);

  const hasPlans = Boolean(product.plans && product.plans.length > 0);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(0);
  const currentPlan: ProductPlan | undefined = hasPlans ? product.plans?.[selectedPlanIndex] : undefined;

  const activePrice = currentPlan ? currentPlan.price : product.price;

  const getWhatsAppMessage = () => {
    let planText = '';
    if (currentPlan) {
      planText = ` - ${currentPlan.name} (₹${currentPlan.price}${currentPlan.limits ? ` • ${currentPlan.limits}` : ''})`;
    }

    if (product.category === 'reports') {
      return `Hi EduGenius Hub, I want ${displayName}${planText}. I am attaching my document file (.pdf/.docx) to this chat.`;
    }
    return `Hi EduGenius Hub, I want to buy ${displayName}${planText}. Please share the payment details.`;
  };

  const waMsg = encodeURIComponent(getWhatsAppMessage());
  const period = pricePeriod(product.plan_type, currentPlan?.duration);

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
                    alt={displayName}
                    className="h-16 w-16 rounded-2xl border border-border bg-white object-contain p-1 shrink-0 sm:h-20 sm:w-20"
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
                      {categoryLabel(product.category)}
                    </span>
                    {badge && BadgeIcon && (
                      <span className={cn('flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border', badge.cls)}>
                        <BadgeIcon className="w-2.5 h-2.5" />
                        {badge.label}
                      </span>
                    )}
                  </div>
                  <h2 className="font-bold text-base sm:text-lg text-foreground leading-tight">{displayName}</h2>
                </div>
              </div>

              <button
                onClick={handleCopyProductLink}
                className="p-2 rounded-xl bg-card hover:bg-muted border border-border text-muted-foreground hover:text-primary transition-colors shrink-0"
                aria-label="Copy product link"
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
                    {activePrice > 0 ? `₹${activePrice}` : 'Ask on WhatsApp'}
                  </span>
                  {period && <span className="text-xs text-muted-foreground">{period}</span>}
                </div>
                {currentPlan?.limits && (
                  <p className="text-xs text-foreground mt-1 font-medium">
                    Quota: {currentPlan.limits}
                  </p>
                )}
              </div>
              {product.delivery_time && (
                <p className="max-w-[9rem] text-right text-xs text-muted-foreground">{product.delivery_time}</p>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <p className="text-sm text-muted-foreground leading-relaxed">{publicDescription(product.description)}</p>
              </div>
            )}

            {/* Features */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Key Features</h4>
              {(product.features && product.features.length > 0
                ? product.features.filter((feature) => !/official|100%|guaranteed|instant/i.test(feature))
                : [`Delivery: ${product.delivery_time}`]
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
  const [imageFailed, setImageFailed] = useState(false);

  const artwork = getProductArtwork(product);
  const badge = shownBadge(product.badge);
  const BadgeIcon = badge?.Icon;
  const displayName = publicName(product.name);
  const description = publicDescription(product.description);

  const hasPlans = Boolean(product.plans && product.plans.length > 0);
  const planCount = product.plans?.length || 0;
  const startingPrice = hasPlans && product.plans
    ? Math.min(...product.plans.map((p) => p.price))
    : product.price;
  const period = pricePeriod(product.plan_type, product.plans?.[0]?.duration);
  const productHref = `/product/${product.slug || product.id}`;

  const quickOrderMsg = encodeURIComponent(
    `Hi EduGenius Hub, I want to buy ${displayName} (₹${startingPrice}). Please share the payment details.`
  );
  const quickWaUrl = `https://wa.me/${WA_NUMBER}?text=${quickOrderMsg}`;

  const handleCopyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}${productHref}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('Link copied');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white text-slate-900 shadow-md shadow-orange-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-white">
        <div
          className="relative flex h-64 w-full items-center justify-center bg-[#fff7ed] p-3 dark:bg-slate-800"
          style={{ backgroundImage: `linear-gradient(180deg, ${artwork.brandColor}33, transparent 72%)` }}
        >
          {product.image_url && !imageFailed ? (
            <img
              src={product.image_url}
              alt={displayName}
              className="h-full w-auto max-w-full rounded-xl object-contain shadow-md"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 via-amber-300 to-rose-400"
              style={{ backgroundImage: `linear-gradient(135deg, ${artwork.brandColor}, #fb923c 55%, #7c3aed)` }}
            >
              <div
                className="drop-shadow-lg"
                dangerouslySetInnerHTML={{ __html: artwork.iconSvg.replace('w-8 h-8', 'w-20 h-20').replace(/text-[a-z]+-\d+/g, 'text-white') }}
              />
            </div>
          )}
          {badge && BadgeIcon && (
            <span className={cn('absolute left-3 top-3 flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-bold', badge.cls)}>
              <BadgeIcon className="h-2.5 w-2.5" />
              {badge.label}
            </span>
          )}
          <button
            type="button"
            onClick={handleCopyLink}
            aria-label={`Copy link for ${displayName}`}
            className="absolute right-3 top-3 rounded-lg border border-white/20 bg-black/50 p-2 text-white"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
          </button>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <p className="mb-1 text-xs font-semibold text-orange-600">{categoryLabel(product.category)}</p>
          <h3 className="text-lg font-bold leading-snug">
            <Link href={productHref} className="hover:underline">
              {displayName}
            </Link>
          </h3>
          {description && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{description}</p>}

          <div className="mt-3 flex items-center gap-2">
            <div className="flex h-10 min-w-0 flex-1 items-center gap-1.5 rounded-xl bg-orange-50 px-3" title={product.delivery_time || 'Ask on WhatsApp'}>
              <Clock className="h-4 w-4 shrink-0 text-orange-600" />
              <span className="shrink-0 text-xs font-bold text-orange-700">Delivery time</span>
              <span className="truncate text-sm font-bold text-slate-900">
                {(product.delivery_time || 'Ask on WhatsApp').replace(/^usually\s+/i, '')}
              </span>
            </div>
            <div className="flex h-10 shrink-0 items-center gap-1 whitespace-nowrap rounded-xl bg-violet-50 px-3">
              <span className="text-sm font-black text-slate-900">{startingPrice > 0 ? `₹${startingPrice}` : 'Ask'}</span>
              {period && <span className="text-xs font-semibold text-violet-700">{period}</span>}
            </div>
          </div>

          <div className="mt-auto grid grid-cols-2 gap-3 pt-4">
            <a href={quickWaUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-3 text-base font-bold text-white shadow-sm">
              Buy Now
            </a>
            <Link href={productHref} className="inline-flex h-12 items-center justify-center rounded-2xl border-2 border-orange-200 bg-white px-3 text-base font-bold text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-white">
              {planCount > 1 ? 'View plans' : 'Details'}
            </Link>
          </div>
        </div>
      </article>

      <ProductDetailModal product={product} open={detailOpen} onClose={() => setDetailOpen(false)} />
    </>
  );
}
