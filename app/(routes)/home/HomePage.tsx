'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FileText, ArrowRight, Star, ChevronDown, Shield, Zap, Clock, TrendingUp, Users, Package, Headphones, CircleCheck as CheckCircle, MessageCircle, Phone, Sparkles, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';
import RequestAccessModal from '@/components/RequestAccessModal';
import { getFeaturedProducts, type LocalProduct } from '@/lib/localProducts';
import { TESTIMONIALS, TRUST_STATS } from '@/lib/testimonials';
import { FAQS } from '@/lib/faqs';
import { SITE } from '@/lib/config';
import ReviewsSection from '@/components/reviews/ReviewsSection';
import ServicesSection from '@/components/services/ServicesSection';

// Cast local product to the Product shape ProductCard expects
import type { Product } from '@/lib/types';

const WA_NUMBER = '918766253356';

const categories = [
  { id: 'reports',  label: 'Reports',         emoji: '📑', desc: 'Turnitin, Drillbit',   color: 'from-blue-600 to-blue-800',       href: '/products?category=reports' },
  { id: 'accounts', label: 'Student Accounts', emoji: '🎓', desc: 'Premium Access',      color: 'from-violet-600 to-violet-800',   href: '/products?category=ai_tools' },
  { id: 'ai_tools', label: 'AI Tools',         emoji: '🤖', desc: 'ChatGPT, Perplexity', color: 'from-emerald-600 to-emerald-800', href: '/products?category=ai_tools' },
  { id: 'ott',      label: 'OTT',              emoji: '🎬', desc: 'Netflix, Prime & more',color: 'from-pink-600 to-rose-700',       href: '/products?category=ott' },
  { id: 'best',     label: 'Best Sellers',      emoji: '🔥', desc: 'Most popular picks',  color: 'from-amber-500 to-orange-600',    href: '/products' },
];

const steps = [
  { step: '01', title: 'Choose Product',    desc: 'Browse and pick the tool or report you need.',    Icon: Package },
  { step: '02', title: 'Pay Securely',      desc: 'Multiple payment options, 100% safe and fast.',   Icon: Shield },
  { step: '03', title: 'Get Instant Access',desc: 'Delivered to your WhatsApp within minutes.',       Icon: Zap },
];

const trustItems = [
  { value: TRUST_STATS.reports_delivered, label: 'Reports Delivered',     Icon: FileText },
  { value: TRUST_STATS.students_served,   label: 'Students Served',       Icon: Users },
  { value: TRUST_STATS.satisfaction,      label: 'Customer Satisfaction', Icon: TrendingUp },
  { value: TRUST_STATS.response_time,     label: 'WhatsApp Support',      Icon: Headphones },
];

function AnimatedCounter({ target }: { target: string }) {
  const [display, setDisplay] = useState('0');
  useEffect(() => {
    const num = parseInt(target.replace(/[^0-9]/g, ''));
    if (!num) { setDisplay(target); return; }
    const steps = 40;
    const inc = num / steps;
    let cur = 0;
    const timer = setInterval(() => {
      cur += inc;
      if (cur >= num) { setDisplay(target); clearInterval(timer); }
      else setDisplay(Math.floor(cur).toLocaleString('en-IN') + (target.includes('+') ? '+' : '') + (target.includes('%') ? '%' : ''));
    }, 1400 / steps);
    return () => clearInterval(timer);
  }, [target]);
  return <>{display}</>;
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [requestOpen, setRequestOpen] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const featuredProducts = getFeaturedProducts() as unknown as Product[];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.25 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const waMessage = encodeURIComponent(
    `Hi EduGenius Hub 👋\n\nI'd like to know more about your products.\n\nPlease guide me.`
  );

  return (
    <main className="min-h-screen">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center bg-[#0B1F3A] overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d2448] via-[#0B1F3A] to-[#07121f]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F4B400]/4 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#F4B400]/10 border border-[#F4B400]/20 text-[#F4B400] text-xs font-semibold px-4 py-2 rounded-full mb-7">
              <Zap className="w-3 h-3" />
              Premium Digital Products at Student Prices
            </div>
            <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-black text-white leading-[1.05] tracking-tight mb-5">
              What do you<br />
              <span className="text-[#F4B400]">need today?</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto leading-relaxed">
              Academic Reports, AI Tools, Premium Accounts &amp; OTT Subscriptions — all in one place.
            </p>
          </div>

          {/* Category grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 max-w-5xl mx-auto mb-12">
            {categories.map((cat) => (
              <Link key={cat.id} href={cat.href}>
                <div className={cn(
                  'group relative rounded-2xl p-4 bg-gradient-to-br text-white cursor-pointer transition-all duration-200 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/50 h-full min-h-[110px] flex flex-col',
                  cat.color
                )}>
                  <div className="text-3xl mb-2">{cat.emoji}</div>
                  <h3 className="font-bold text-sm leading-tight mb-0.5">{cat.label}</h3>
                  <p className="text-xs opacity-65 flex-1 leading-tight">{cat.desc}</p>
                  <ArrowRight className="w-3.5 h-3.5 absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => setRequestOpen(true)}
              className="bg-[#F4B400] hover:bg-[#d9a200] text-[#0B1F3A] font-bold px-8 py-4 rounded-xl text-base h-auto shadow-lg shadow-[#F4B400]/30 hover:scale-105 transition-all"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Request a Product
            </Button>
            <a href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full border-white/20 text-white bg-white/5 hover:bg-white/12 px-8 py-4 rounded-xl text-base h-auto hover:scale-105 transition-all">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat on WhatsApp
              </Button>
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {[
              { Icon: Zap,    text: 'Instant Delivery' },
              { Icon: Shield, text: 'Verified & Secure' },
              { Icon: Clock,  text: '24/7 Support' },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-gray-400 text-xs">
                <Icon className="w-3.5 h-3.5 text-[#F4B400]" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST STATS ── */}
      <section ref={statsRef} className="py-16 px-4 bg-[#0B1F3A]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustItems.map((item) => {
              const Icon = item.Icon;
              return (
                <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/8 hover:border-white/15 transition-all">
                  <Icon className="w-5 h-5 text-[#F4B400] mx-auto mb-3" />
                  <div className="text-2xl md:text-3xl font-black text-white mb-1">
                    {statsVisible ? <AnimatedCounter target={item.value} /> : '—'}
                  </div>
                  <div className="text-xs text-gray-400 font-medium leading-tight">{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS ── */}
      {featuredProducts.length > 0 && (
        <section className="py-20 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <h2 className="text-3xl font-black">Best Sellers</h2>
                </div>
                <p className="text-muted-foreground text-sm">Most popular products this month</p>
              </div>
              <Link href="/products" className="hidden md:block">
                <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground text-sm">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredProducts.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-8 text-center md:hidden">
              <Link href="/products">
                <Button variant="outline" className="rounded-xl px-8">View All Products</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-4 bg-muted/40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black mb-2">How It Works</h2>
            <p className="text-muted-foreground">Get your product in 3 simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => {
              const Icon = step.Icon;
              return (
                <div key={step.step} className="relative group">
                  <div className="bg-card border border-border rounded-2xl p-7 text-center hover:-translate-y-1 hover:shadow-xl hover:border-[#F4B400]/30 transition-all duration-300">
                    <div className="w-14 h-14 rounded-2xl bg-[#F4B400]/10 border border-[#F4B400]/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#F4B400]/15 transition-colors">
                      <Icon className="w-6 h-6 text-[#F4B400]" />
                    </div>
                    <div className="text-5xl font-black text-[#F4B400]/15 mb-2 leading-none">{step.step}</div>
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-3.5 z-10">
                      <ArrowRight className="w-5 h-5 text-[#F4B400]/40" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SERVICES SECTION ── */}
      <ServicesSection />

      {/* ── TESTIMONIALS (REAL SCREENSHOTS) ── */}
      <ReviewsSection />

      {/* ── FAQ ── */}
      <section className="py-20 px-4 bg-muted/40">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-2">Frequently Asked</h2>
            <p className="text-muted-foreground text-sm">Everything you need to know</p>
          </div>
          <div className="space-y-2.5">
            {FAQS.map((faq) => (
              <div key={faq.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-[#F4B400]/20 transition-colors">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-sm hover:bg-muted/40 transition-colors"
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={cn('w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ml-4', openFaq === faq.id && 'rotate-180')} />
                </button>
                {openFaq === faq.id && (
                  <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY CTA ── */}
      <section className="py-20 px-4 bg-[#0B1F3A]">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-7 h-7 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-black text-white mb-3">Join Our Community</h2>
          <p className="text-gray-400 mb-8 text-base leading-relaxed max-w-md mx-auto">
            Connect with 5000+ students, get exclusive deals, and stay updated with the latest tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-xs mx-auto">
            <a
              href={SITE.whatsappCommunityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:scale-105 text-sm w-full"
            >
              <MessageCircle className="w-4 h-4" />
              Join WhatsApp Community
            </a>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 px-4 bg-[#F4B400]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black text-[#0B1F3A] mb-3">Ready to get started?</h2>
          <p className="text-[#0B1F3A]/65 mb-8 text-base">
            Join 5000+ students using EduGenius Hub. Get your product delivered in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => setRequestOpen(true)}
              className="bg-[#0B1F3A] hover:bg-[#1a3260] text-white font-bold px-8 py-4 rounded-xl text-base h-auto hover:scale-105 transition-all shadow-xl"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Request a Product
            </Button>
            <a href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full border-[#0B1F3A]/25 text-[#0B1F3A] bg-[#0B1F3A]/5 hover:bg-[#0B1F3A]/12 px-8 py-4 rounded-xl text-base font-bold h-auto">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat First
              </Button>
            </a>
          </div>
        </div>
      </section>

      <RequestAccessModal open={requestOpen} onClose={() => setRequestOpen(false)} />
    </main>
  );
}
