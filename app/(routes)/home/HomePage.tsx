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
      <section className="relative overflow-hidden bg-[#101a38] text-white pt-28 pb-14 sm:pt-32 sm:pb-20 px-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.25),transparent_32%),radial-gradient(circle_at_85%_80%,rgba(14,165,233,0.16),transparent_30%)] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3.5 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-emerald-200 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Websites &amp; apps built for growth
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.02] tracking-[-0.045em] mb-6">
              More growth,
              <span className="text-emerald-300"> less busywork.</span>
              <span className="block">Your business deserves better.</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white/65 max-w-2xl mx-auto mb-8">
              We create fast, modern websites and mobile apps that make your brand look trusted, bring in enquiries, and help you grow with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
              <a
                href={`https://wa.me/${siteSettings.phone_e164}?text=${encodeURIComponent('Hi EduGenius Hub, I want to build a website or app for my business. Please guide me.')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full sm:w-auto h-12 px-7 rounded-full bg-emerald-300 hover:bg-emerald-200 text-[#101a38] font-black text-sm shadow-lg shadow-emerald-950/20">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Your Project
                </Button>
              </a>
              <Link href="/products">
                <Button variant="outline" className="w-full sm:w-auto h-12 px-7 rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm">
                  <Package className="w-4 h-4 mr-2" />
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-14 sm:mt-20 overflow-hidden">
            <div className="flex items-end justify-center gap-3 sm:gap-5 min-w-max px-4 sm:px-8">
              {[
                { src: '/assets/reviews/review1.jpg', alt: 'Website project preview', tilt: '-rotate-6', size: 'w-28 sm:w-44 h-40 sm:h-64' },
                { src: '/assets/file.jpg', alt: 'Mobile app project preview', tilt: '-rotate-3', size: 'w-36 sm:w-52 h-52 sm:h-80' },
                { src: '/assets/reviews/review2.jpg', alt: 'Digital product project preview', tilt: 'rotate-0', size: 'w-40 sm:w-60 h-60 sm:h-[22rem]' },
                { src: '/assets/file copy.jpg', alt: 'Business website project preview', tilt: 'rotate-3', size: 'w-36 sm:w-52 h-52 sm:h-80' },
                { src: '/assets/reviews/review3.jpg', alt: 'App design project preview', tilt: 'rotate-6', size: 'w-28 sm:w-44 h-40 sm:h-64' },
              ].map((image) => (
                <div key={image.src} className={`${image.size} ${image.tilt} shrink-0 overflow-hidden rounded-[1.35rem] sm:rounded-[1.75rem] border-[3px] border-white/15 bg-white/10 shadow-2xl shadow-black/30 transition-transform duration-500 hover:-translate-y-3 hover:rotate-0`}>
                  <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-white/55">
            <span className="inline-flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-emerald-300" /> Clear pricing</span>
            <span className="inline-flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-emerald-300" /> Fast delivery</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-emerald-300" /> Human support</span>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto mt-14 sm:mt-20 pt-5 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white/55 text-xs">
            <span className="font-semibold text-white/75">Need a ready-to-use tool today?</span>
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 4).map((cat) => (
                <Link key={cat.id} href={cat.href} className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 hover:bg-white/10 hover:text-white transition-colors">
                  {cat.label} <ArrowRight className="w-3 h-3" />
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
            <a href={`https://wa.me/${siteSettings.phone_e164}?text=${encodeURIComponent('Hi EduGenius Hub, I want to discuss a website or app for my business.')}`} target="_blank" rel="noopener noreferrer">
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
