'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Zap,
  Clock,
  TrendingUp,
  CircleCheck as CheckCircle,
  CircleAlert as AlertCircle,
  MessageCircle,
  Share2,
  Copy,
  Check,
  ArrowLeft,
  Shield,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Headphones
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
      <main className="min-h-screen bg-[#07121f] text-white pt-24 pb-20 px-4 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-[#F4B400] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-400">Loading product details...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-[#07121f] text-white pt-24 pb-20 px-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center bg-slate-900/60 border border-slate-800 p-8 rounded-3xl">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <h1 className="text-2xl font-black">Product Not Found</h1>
          <p className="text-xs text-slate-400 mt-2 mb-6">
            The link you followed may be expired or the product may have been moved.
          </p>
          <Link href="/products">
            <Button className="bg-[#F4B400] hover:bg-[#d9a200] text-[#0B1F3A] font-bold rounded-xl">
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

  // Format WhatsApp Order Message
  const getWhatsAppOrderUrl = () => {
    let planInfo = '';
    if (currentPlan) {
      planInfo = ` - ${currentPlan.name} (₹${currentPlan.price}${currentPlan.limits ? ` • ${currentPlan.limits}` : ''})`;
    }
    const msg = `Hi EduGenius Hub 👋\n\nI want to order *${product.name}*${planInfo}.\n\nPlease share the payment details and access steps.`;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  // Format WhatsApp Status Share Text
  const getWhatsAppShareUrl = () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://www.edugeniushub.com/product/${product.slug}`;
    const text = `🔥 *${product.name}* is now available on EduGenius Hub!\n\n💰 Price: Starting at just ₹${activePrice}\n⚡ Instant WhatsApp Activation • 100% Replacement Warranty\n\n👉 View details & order here:\n${shareUrl}`;
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
    <main className="min-h-screen bg-[#07121f] text-slate-100 pt-20 pb-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background glow accents */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: artwork.brandColor }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-[#F4B400] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Products</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-[#F4B400]" />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>

            <a
              href={getWhatsAppShareUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/25 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Product Hero Card */}
        <div className="bg-[#0B1F3A]/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
          {/* Header Banner */}
          <div className={cn('p-6 sm:p-8 bg-gradient-to-br', artwork.bgGradient, 'relative border-b border-slate-800/80')}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-950/80 border border-slate-700/80 flex items-center justify-center p-3 shadow-xl shrink-0"
                  dangerouslySetInnerHTML={{ __html: artwork.iconSvg }}
                />
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-950/60 text-[#F4B400] border border-slate-800">
                      {product.category}
                    </span>
                    {product.badge && (
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                        {product.badge.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {product.name}
                  </h1>
                </div>
              </div>

              {/* Delivery time pill */}
              <div className="flex items-center gap-2 text-xs bg-slate-950/60 border border-slate-800 px-3.5 py-1.5 rounded-full text-slate-300 shrink-0">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span>Instant WhatsApp Delivery</span>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Description */}
            {product.description && (
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {product.description}
              </p>
            )}

            {/* Multi-Tier Plans Selector */}
            {hasPlans && product.plans && product.plans.length > 1 && (
              <div className="bg-slate-950/60 rounded-2xl p-4 sm:p-5 border border-slate-800/80">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#F4B400]" />
                    <span>Select Your Plan Tier:</span>
                  </span>
                  <span className="text-xs text-[#F4B400] font-bold">
                    {product.plans.length} Options Available
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
                          ? 'border-[#F4B400] bg-[#F4B400]/10 shadow-lg shadow-[#F4B400]/5 text-white'
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-bold text-sm text-white">{plan.name}</span>
                        <span className="text-base font-black text-[#F4B400]">₹{plan.price}</span>
                      </div>
                      {plan.limits && (
                        <div className="text-xs text-slate-400 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-400 shrink-0" />
                          <span>{plan.limits}</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Box */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-950/90 to-[#0B1F3A] border border-slate-800">
              <div>
                <span className="text-xs text-slate-400 block mb-1">
                  {currentPlan ? currentPlan.name : 'Special Price'}
                </span>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-3xl sm:text-4xl font-black text-[#F4B400]">
                    {activePrice > 0 ? `₹${activePrice}` : 'DM for Price'}
                  </span>
                  {product.plan_type && activePrice > 0 && (
                    <span className="text-xs sm:text-sm text-slate-400">
                      /{currentPlan?.duration || product.plan_type.toLowerCase()}
                    </span>
                  )}
                  {activeOriginalPrice && activeOriginalPrice > activePrice && (
                    <span className="text-sm text-slate-500 line-through ml-1">
                      ₹{activeOriginalPrice}
                    </span>
                  )}
                  {discount && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-green-500/20 text-green-400 border border-green-500/30">
                      Save {discount}%
                    </span>
                  )}
                </div>
              </div>

              {/* 1-Click WhatsApp Buy Button */}
              <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                <a href={getWhatsAppOrderUrl()} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto h-13 px-8 bg-[#25D366] hover:bg-[#1ebd5a] text-slate-950 font-black text-base rounded-2xl shadow-xl shadow-[#25D366]/25 hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5">
                    <MessageCircle className="w-5 h-5 fill-slate-950" />
                    <span>⚡ Buy on WhatsApp</span>
                  </Button>
                </a>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                What&apos;s Included with this Product
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(product.features && product.features.length > 0
                  ? product.features
                  : [
                      'Instant WhatsApp Delivery in 5–15 minutes',
                      '100% Replacement Warranty & Validity',
                      'Dedicated customer support',
                      'Verified official account access',
                    ]
                ).map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/60">
                    <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works */}
            {product.how_it_works && product.how_it_works.length > 0 && (
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#F4B400]">
                  How to Receive Access
                </h3>
                <div className="space-y-2">
                  {product.how_it_works.map((step, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <span className="w-5 h-5 rounded-full bg-[#F4B400]/20 text-[#F4B400] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
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
                  <div key={nIdx} className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Trust Footer */}
            <div className="pt-4 border-t border-slate-800 grid grid-cols-3 gap-3 text-center text-[11px] text-slate-400">
              <div className="flex flex-col items-center gap-1">
                <Zap className="w-4 h-4 text-[#F4B400]" />
                <span>5–15 Min Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Shield className="w-4 h-4 text-green-400" />
                <span>100% Guaranteed</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Headphones className="w-4 h-4 text-cyan-400" />
                <span>24/7 WhatsApp Help</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
