'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FileText, ArrowRight, Shield, Zap, Clock, TrendingUp, Users, Headphones, Package, MessageCircle, Sparkles, Flame, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';
import RequestAccessModal from '@/components/RequestAccessModal';
import { getFeaturedProducts } from '@/lib/localProducts';
import { TESTIMONIALS, TRUST_STATS } from '@/lib/testimonials';
import { FAQS } from '@/lib/faqs';
import { SITE } from '@/lib/config';
import ReviewsSection from '@/components/reviews/ReviewsSection';
import ServicesSection from '@/components/services/ServicesSection';

import type { Product } from '@/lib/types';

const WA_NUMBER = '918766253356';

const categories = [
  { id: 'reports',  label: 'Reports',          desc: 'Turnitin, Drillbit',     href: '/products?category=reports' },
  { id: 'accounts', label: 'Student Accounts', desc: 'Premium Access',        href: '/products?category=ai_tools' },
  { id: 'ai_tools', label: 'AI Tools',          desc: 'ChatGPT, Perplexity',    href: '/products?category=ai_tools' },
  { id: 'ott',      label: 'OTT',              desc: 'Netflix, Prime & more',  href: '/products?category=ott' },
  { id: 'best',     label: 'Best Sellers',      desc: 'Most popular picks',    href: '/products' },
];

const steps = [
  { step: '01', title: 'Choose Product',     desc: 'Browse and pick the tool or report you need.',    Icon: Package },
  { step: '02', title: 'Pay Securely',       desc: 'Multiple payment options, 100% safe and fast.',   Icon: Shield },
  { step: '03', title: 'Get Instant Access', desc: 'Delivered to your WhatsApp within minutes.',      Icon: Zap },
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

  const [featuredProducts, setFeaturedProducts] = useState<Product[]>(
    () => getFeaturedProducts() as unknown as Product[]
  );

  const [faqsList, setFaqsList] = useState<any[]>(() => FAQS);
  const [siteSettings, setSiteSettings] = useState<{
    phone_e164: string;
    whatsapp_community_url: string;
    reports_delivered: string;
    students_served: string;
    satisfaction: string;
    response_time: string;
  }>({
    phone_e164: WA_NUMBER,
    whatsapp_community_url: SITE.whatsappCommunityUrl,
    reports_delivered: TRUST_STATS.reports_delivered,
    students_served: TRUST_STATS.students_served,
    satisfaction: TRUST_STATS.satisfaction,
    response_time: TRUST_STATS.response_time,
  });

  useEffect(() => {
    fetch('/api/products?featured=true')
      .then((r) => r.json())
      .then((data) => {
        if (data.products && data.products.length > 0) {
          setFeaturedProducts(data.products);
        }
      })
      .catch(() => {});

    fetch('/api/faqs')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.faqs) && data.faqs.length > 0) {
          setFaqsList(data.faqs);
        }
      })
      .catch(() => {});

    fetch('/api/settings')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSiteSettings({
            phone_e164: data.settings.phone_e164 || WA_NUMBER,
            whatsapp_community_url: data.settings.whatsapp_community_url || SITE.whatsappCommunityUrl,
            reports_delivered: data.settings.reports_delivered || TRUST_STATS.reports_delivered,
            students_served: data.settings.students_served || TRUST_STATS.students_served,
            satisfaction: data.settings.satisfaction || TRUST_STATS.satisfaction,
            response_time: data.settings.response_time || TRUST_STATS.response_time,
          });
        }
      })
      .catch(() => {});
  }, []);

  const dynamicTrustItems = [
    { value: siteSettings.reports_delivered, label: 'Reports Delivered',     Icon: FileText },
    { value: siteSettings.students_served,   label: 'Students Served',       Icon: Users },
    { value: siteSettings.satisfaction,      label: 'Customer Satisfaction', Icon: TrendingUp },
    { value: siteSettings.response_time,     label: 'WhatsApp Support',      Icon: Headphones },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.25 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const waMessage = encodeURIComponent(
    `Hi EduGenius Hub, I'd like to know more about your products. Please guide me.`
  );

  return (
    <main className="min-h-screen pb-16 md:pb-0">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#0b1428] text-white pt-28 pb-8 sm:pt-32 sm:pb-10 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(14,165,233,0.18),transparent_42%),linear-gradient(135deg,#0b1428_0%,#101d3a_48%,#0b1428_100%)] pointer-events-none" />
        <div className="absolute -left-20 top-24 h-[26rem] w-[55%] rotate-[24deg] bg-sky-400/[0.045] [clip-path:polygon(0_0,100%_36%,75%_100%,0_62%)] pointer-events-none" />
        <div className="absolute -right-24 top-32 h-[30rem] w-[58%] -rotate-[22deg] bg-blue-500/[0.08] [clip-path:polygon(28%_0,100%_24%,82%_100%,0_66%)] pointer-events-none" />
        <div className="absolute left-1/2 top-[28rem] h-[20rem] w-[70%] -translate-x-1/2 rotate-[-8deg] bg-sky-300/[0.035] [clip-path:polygon(20%_0,100%_30%,70%_100%,0_68%)] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-300/25 bg-sky-300/10 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-sky-200 sm:text-xs">
              <Sparkles className="h-3.5 w-3.5" />
              Trusted by 5000+ students
            </div>
            <h1 className="mx-auto max-w-5xl text-[2.45rem] font-black leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-[5.2rem]">
              Premium tools and reports
              <span className="block text-sky-400">for your best work.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base lg:text-lg">
              Get Turnitin, Drillbit, ChatGPT Plus, QuillBot, Grammarly, OTT combos and more at student-friendly prices — delivered fast with real WhatsApp support.
            </p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <a
                href={`https://wa.me/${siteSettings.phone_e164}?text=${encodeURIComponent('Hi EduGenius Hub, I want to know more about your products. Please guide me.')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="h-12 w-full rounded-xl bg-sky-500 px-7 text-sm font-black text-white shadow-lg shadow-sky-950/30 transition-all hover:-translate-y-0.5 hover:bg-sky-400 sm:w-auto">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat on WhatsApp
                </Button>
              </a>
              <Link href="/products">
                <Button variant="outline" className="h-12 w-full rounded-xl border-white/20 bg-white/[0.04] px-7 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10 sm:w-auto">
                  <Package className="mr-2 h-4 w-4" />
                  Explore Products
                </Button>
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/50">
              <span className="inline-flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-sky-400" /> Verified service</span>
              <span className="inline-flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-sky-400" /> Instant delivery</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-sky-400" /> Support in minutes</span>
            </div>
          </div>

          <div className="relative mx-auto mt-12 max-w-5xl border-t border-white/10 pt-6 sm:mt-16">
            <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">Popular with students and researchers</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
              {categories.slice(0, 4).map((category) => (
                <Link
                  key={category.id}
                  href={category.href}
                  className="group flex min-h-16 items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-3.5 py-3 text-left transition-all hover:-translate-y-0.5 hover:border-sky-300/30 hover:bg-sky-400/[0.08]"
                >
                  <span>
                    <span className="block text-xs font-bold text-white/80 group-hover:text-white">{category.label}</span>
                    <span className="mt-0.5 block text-[10px] text-white/40">{category.desc}</span>
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-sky-400 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* TRUST STATS */}
      <section ref={statsRef} className="py-12 sm:py-16 px-4 border-y border-border bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dynamicTrustItems.map((item) => {
              const Icon = item.Icon;
              return (
                <div key={item.label} className="bg-card border border-border rounded-2xl p-5 text-center hover:border-primary/30 transition-colors">
                  <Icon className="w-5 h-5 text-primary mx-auto mb-3" />
                  <div className="text-2xl md:text-3xl font-black text-foreground mb-1">
                    {statsVisible ? <AnimatedCounter target={item.value} /> : '—'}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium leading-tight">{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      {featuredProducts.length > 0 && (
        <section className="py-16 sm:py-20 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8 sm:mb-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <h2 className="text-2xl sm:text-3xl font-black">Best Sellers</h2>
                </div>
                <p className="text-muted-foreground text-sm">Most popular products this month</p>
              </div>
              <Link href="/products">
                <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-xs sm:text-sm px-4 sm:px-5">
                  Browse Products <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
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

      {/* HOW IT WORKS */}
      <section className="py-16 sm:py-20 px-4 bg-muted/30 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-black mb-2">How It Works</h2>
            <p className="text-muted-foreground text-sm">Get your product in 3 simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {steps.map((step, i) => {
              const Icon = step.Icon;
              return (
                <div key={step.step} className="relative group">
                  <div className="bg-card border border-border rounded-2xl p-6 sm:p-7 text-center hover:-translate-y-1 hover:shadow-md hover:border-primary/30 transition-all duration-300">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/15 transition-colors">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <div className="text-4xl sm:text-5xl font-black text-primary/15 mb-2 leading-none">{step.step}</div>
                    <h3 className="font-bold text-base sm:text-lg mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-3.5 z-10">
                      <ArrowRight className="w-5 h-5 text-primary/40" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <ServicesSection />

      {/* TESTIMONIALS */}
      <ReviewsSection />

      {/* FAQ */}
      <section className="py-16 sm:py-20 px-4 bg-muted/30 border-y border-border">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-black mb-2">Frequently Asked</h2>
            <p className="text-muted-foreground text-sm">Everything you need to know</p>
          </div>
          <div className="space-y-2.5">
            {faqsList.map((faq) => (
              <div key={faq.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 transition-colors">
                <button
                  className="w-full flex items-center justify-between px-5 sm:px-6 py-4 text-left font-semibold text-sm hover:bg-muted/40 transition-colors"
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={cn('w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ml-4', openFaq === faq.id && 'rotate-180')} />
                </button>
                {openFaq === faq.id && (
                  <div className="px-5 sm:px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY CTA */}
      <section className="py-16 sm:py-20 px-4 bg-background">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="w-7 h-7 text-[#25D366]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black mb-3">Join Our Community</h2>
          <p className="text-muted-foreground mb-8 text-base leading-relaxed max-w-md mx-auto">
            Connect with 5000+ students, get exclusive deals, and stay updated with the latest tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-xs mx-auto">
            <a
              href={siteSettings.whatsapp_community_url}
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

      {/* FINAL CTA */}
      <section className="py-16 sm:py-20 px-4 bg-primary">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">Ready to get started?</h2>
          <p className="text-white/80 mb-8 text-base">
            Join 5000+ students using EduGenius Hub. Get your product delivered in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`https://wa.me/${siteSettings.phone_e164}?text=${encodeURIComponent('Hi EduGenius Hub, I want to know more about your products. Please guide me.')}`} target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-white hover:bg-white/90 text-primary font-bold px-8 py-3.5 rounded-xl text-base h-auto shadow-lg">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat About Your Project
              </Button>
            </a>
            <Link href="/products">
              <Button variant="outline" className="w-full border-white/30 text-white bg-white/10 hover:bg-white/20 px-8 py-3.5 rounded-xl text-base font-bold h-auto">
                <Package className="w-4 h-4 mr-2" />
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Always-available mobile actions */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-2.5 bg-background/95 backdrop-blur-md border-t border-border shadow-[0_-8px_24px_rgba(15,23,42,0.12)]">
        <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
          <Link href="/products">
            <Button className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs">
              <Package className="w-4 h-4 mr-1.5" />
              Browse Products
            </Button>
          </Link>
          <a href={`https://wa.me/${siteSettings.phone_e164}?text=${waMessage}`} target="_blank" rel="noopener noreferrer">
            <Button className="w-full h-11 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-xs">
              <MessageCircle className="w-4 h-4 mr-1.5" />
              Chat on WhatsApp
            </Button>
          </a>
        </div>
      </div>

      <RequestAccessModal open={requestOpen} onClose={() => setRequestOpen(false)} />
    </main>
  );
}
