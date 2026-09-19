'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Zap,
  CircleCheck as CheckCircle,
  CircleAlert as AlertCircle,
  MessageCircle,
  Share2,
  Copy,
  Check,
  ArrowLeft,
  Shield,
  Layers,
  Headphones,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Product, type ProductPlan } from '@/lib/types';
import { getProductArtwork } from '@/lib/productImages';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const WA_NUMBER = '918766253356';

export default function ProductSharePage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;
    async function fetchProduct() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        if (data.product) {
          setProduct(data.product);
        } else {
          setError('Product not found');
        }
      } catch (err: any) {
        setError(err?.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background text-foreground pt-24 pb-20 px-4 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Loading product details...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-background text-foreground pt-24 pb-20 px-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center bg-card border border-border p-8 rounded-2xl">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-3" />
          <h1 className="text-2xl font-black">Product Not Found</h1>
          <p className="text-sm text-muted-foreground mt-2 mb-6">
            The link you followed may be expired or the product may have been moved.
          </p>
          <Link href="/products">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl">
              Browse All Products
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const artwork = getProductArtwork(product);
  const hasPlans = Boolean(product.plans && product.plans.length > 0);
  const currentPlan: ProductPlan | undefined = hasPlans ? product.plans?.[selectedPlanIndex] : undefined;

  const activePrice = currentPlan ? currentPlan.price : product.price;
  const activeOriginalPrice = currentPlan?.original_price ?? product.market_price;

  const discount = activeOriginalPrice && activeOriginalPrice > activePrice
    ? Math.round(((activeOriginalPrice - activePrice) / activeOriginalPrice) * 100)
    : null;

  const getWhatsAppOrderUrl = () => {
    let planInfo = '';
    if (currentPlan) {
      planInfo = ` - ${currentPlan.name} (₹${currentPlan.price}${currentPlan.limits ? ` • ${currentPlan.limits}` : ''})`;
    }
    const msg = `Hi EduGenius Hub, I want to order ${product.name}${planInfo}. Please share the payment details and access steps.`;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const getWhatsAppShareUrl = () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://www.edugeniushub.com/product/${product.slug}`;
    const text = `${product.name} is now available on EduGenius Hub!\n\nPrice: Starting at just ₹${activePrice}\nInstant WhatsApp Activation • 100% Replacement Warranty\n\nView details & order here:\n${shareUrl}`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success('Product link copied! Share it on WhatsApp or social media.');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground pt-20 pb-20 sm:pb-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Products</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-primary" />}
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>

            <a
              href={getWhatsAppShareUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Product Hero Card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          {/* Header Banner */}
          <div className="p-5 sm:p-8 bg-muted/40 border-b border-border">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-card border border-border flex items-center justify-center p-3 shrink-0"
                  dangerouslySetInnerHTML={{ __html: artwork.iconSvg }}
                />
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {product.category}
                    </span>
                    {product.badge && (
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                        {product.badge.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-foreground leading-tight">
                    {product.name}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs bg-card border border-border px-3.5 py-1.5 rounded-full text-muted-foreground shrink-0 self-start sm:self-center">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Instant WhatsApp Delivery</span>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-5 sm:p-8 space-y-6">
            {/* Description */}
            {product.description && (
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Multi-Tier Plans Selector */}
            {hasPlans && product.plans && product.plans.length > 1 && (
              <div className="bg-muted/30 rounded-2xl p-4 sm:p-5 border border-border">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-primary" />
                    <span>Select Your Plan:</span>
                  </span>
                  <span className="text-xs text-primary font-bold">
                    {product.plans.length} Options
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.plans.map((plan, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPlanIndex(idx)}
                      className={cn(
                        'p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between gap-1.5',
                        selectedPlanIndex === idx
                          ? 'border-primary bg-primary/10 text-foreground'
                          : 'border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground'
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-bold text-sm text-foreground">{plan.name}</span>
                        <span className="text-base font-black text-primary">₹{plan.price}</span>
                      </div>
                      {plan.limits && (
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-500 shrink-0" />
                          <span>{plan.limits}</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Box */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-muted/30 border border-border">
              <div>
                <span className="text-xs text-muted-foreground block mb-1">
                  {currentPlan ? currentPlan.name : 'Special Price'}
                </span>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-primary">
                    {activePrice > 0 ? `₹${activePrice}` : 'DM for Price'}
                  </span>
                  {product.plan_type && activePrice > 0 && (
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      /{currentPlan?.duration || product.plan_type.toLowerCase()}
                    </span>
                  )}
                  {activeOriginalPrice && activeOriginalPrice > activePrice && (
                    <span className="text-sm text-muted-foreground line-through ml-1">
                      ₹{activeOriginalPrice}
                    </span>
                  )}
                  {discount && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                      Save {discount}%
                    </span>
                  )}
                </div>
              </div>

              {/* 1-Click WhatsApp Buy Button */}
              <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                <a href={getWhatsAppOrderUrl()} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto h-12 sm:h-13 px-6 sm:px-8 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-bold text-base rounded-xl shadow-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5">
                    <MessageCircle className="w-5 h-5" />
                    <span>Buy on WhatsApp</span>
                  </Button>
                </a>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                What&apos;s Included
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(product.features && product.features.length > 0
                  ? product.features
                  : [
                      'Instant WhatsApp Delivery in 5-15 minutes',
                      '100% Replacement Warranty & Validity',
                      'Dedicated customer support',
                      'Verified official account access',
                    ]
                ).map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground bg-muted/30 p-2.5 rounded-xl border border-border">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works */}
            {product.how_it_works && product.how_it_works.length > 0 && (
              <div className="p-5 rounded-2xl bg-muted/30 border border-border space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
                  How to Receive Access
                </h3>
                <div className="space-y-2">
                  {product.how_it_works.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2.5 text-sm text-foreground">
                      <span className="w-5 h-5 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {sIdx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Important Notes */}
            {product.important_notes && product.important_notes.length > 0 && (
              <div className="space-y-2">
                {product.important_notes.map((note, nIdx) => (
                  <div key={nIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-700 dark:text-amber-400">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Trust Footer */}
            <div className="pt-4 border-t border-border grid grid-cols-3 gap-3 text-center text-[11px] sm:text-xs text-muted-foreground">
              <div className="flex flex-col items-center gap-1">
                <Zap className="w-4 h-4 text-primary" />
                <span>5-15 Min Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Shield className="w-4 h-4 text-green-500" />
                <span>100% Guaranteed</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Headphones className="w-4 h-4 text-primary" />
                <span>24/7 WhatsApp Help</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
