'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, GraduationCap, Bot, Tv, Flame, ArrowRight, Star, ChevronDown, CircleCheck as CheckCircle2, MessageCircle, Shield, Zap, Clock, TrendingUp, Users, Package, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase, type Product, type Testimonial, type Faq } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import RequestAccessModal from '@/components/RequestAccessModal';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'reports', label: 'Reports', emoji: '📑', desc: 'Turnitin, Drillbit', color: 'from-blue-500 to-blue-700', href: '/products?category=reports' },
  { id: 'accounts', label: 'Student Accounts', emoji: '🎓', desc: 'Turnitin Access', color: 'from-violet-500 to-violet-700', href: '/products?category=accounts' },
  { id: 'ai_tools', label: 'AI Tools', emoji: '🤖', desc: 'ChatGPT, Claude & more', color: 'from-emerald-500 to-emerald-700', href: '/products?category=ai_tools' },
  { id: 'ott', label: 'OTT Subscriptions', emoji: '🎬', desc: 'Netflix, Prime & more', color: 'from-pink-500 to-rose-600', href: '/products?category=ott' },
  { id: 'deals', label: 'Best Deals', emoji: '🔥', desc: 'Limited time offers', color: 'from-orange-500 to-red-600', href: '/products' },
];

const steps = [
  { step: '01', title: 'Choose Product', desc: 'Browse our catalog and pick what you need.', Icon: Package },
  { step: '02', title: 'Pay Securely', desc: 'Multiple payment options, 100% secure.', Icon: Shield },
  { step: '03', title: 'Receive Access', desc: 'Get your product delivered via WhatsApp.', Icon: CheckCircle2 },
];

type TrustStats = {
  students_served: string;
  reports_delivered: string;
  active_customers: string;
  avg_response_time: string;
};

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [trustStats, setTrustStats] = useState<TrustStats>({
    students_served: '5000+',
    reports_delivered: '12000+',
    active_customers: '800+',
    avg_response_time: '< 5 mins',
  });
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [requestOpen, setRequestOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      const [productsRes, testimonialsRes, faqsRes, settingsRes] = await Promise.all([
        supabase.from('products').select('*').eq('is_hidden', false).order('sort_order'),
        supabase.from('testimonials').select('*').eq('is_active', true).order('sort_order'),
        supabase.from('faqs').select('*').eq('is_active', true).order('sort_order'),
        supabase.from('site_settings').select('*').eq('key', 'trust_stats').single(),
      ]);
      if (productsRes.data) {
        setAllProducts(productsRes.data);
        setFeaturedProducts(productsRes.data.filter((p: Product) => p.is_featured));
      }
      if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
      if (faqsRes.data) setFaqs(faqsRes.data);
      if (settingsRes.data?.value) setTrustStats(settingsRes.data.value as TrustStats);
    };
    load();
  }, []);

  const trustItems = [
    { value: trustStats.students_served, label: 'Students Served', Icon: Users },
    { value: trustStats.reports_delivered, label: 'Reports Delivered', Icon: FileText },
    { value: trustStats.active_customers, label: 'Active Customers', Icon: TrendingUp },
    { value: trustStats.avg_response_time, label: 'Avg Response Time', Icon: Headphones },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-[#0B1220] overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#14213D] via-[#0B1220] to-[#0B1220]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#FFD60A]/4 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 w-full">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#FFD60A]/10 border border-[#FFD60A]/20 text-[#FFD60A] text-xs font-semibold px-4 py-2 rounded-full mb-6">
              <Zap className="w-3.5 h-3.5" />
              Premium Digital Products at Student Prices
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight mb-5">
              What do you<br />
              <span className="text-[#FFD60A]">need today?</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Premium Reports, AI Tools, Student Accounts &amp; OTT Subscriptions at affordable prices.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-4xl mx-auto mb-10">
            {categories.map((cat) => (
              <Link key={cat.id} href={cat.href}>
                <div className={cn(
                  'group relative rounded-2xl p-4 bg-gradient-to-br text-white cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 h-full min-h-[110px] flex flex-col',
                  cat.color
                )}>
                  <div className="text-3xl mb-2">{cat.emoji}</div>
                  <h3 className="font-bold text-sm leading-tight mb-0.5">{cat.label}</h3>
                  <p className="text-xs opacity-70 flex-1">{cat.desc}</p>
                  <ArrowRight className="w-4 h-4 absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => setRequestOpen(true)}
              className="bg-[#FFD60A] hover:bg-[#e6c000] text-[#0B1220] font-bold px-8 py-4 rounded-xl text-base h-auto"
            >
              Request a Product
            </Button>
            <a href="https://wa.me/918766253356" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-xl text-base h-auto">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      {featuredProducts.length > 0 && (
        <section className="py-20 px-4 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-black mb-1">Best Sellers</h2>
                <p className="text-muted-foreground">Most popular products this month</p>
              </div>
              <Link href="/products" className="hidden md:block">
                <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
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

      {/* How it Works */}
      <section className="py-20 px-4 bg-muted/40">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-2">How It Works</h2>
            <p className="text-muted-foreground">Get your product in 3 simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => {
              const Icon = step.Icon;
              return (
                <div key={step.step} className="relative">
                  <div className="bg-card border border-border rounded-2xl p-6 text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
                    <div className="w-14 h-14 rounded-2xl bg-[#FFD60A]/10 border border-[#FFD60A]/20 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-[#FFD60A]" />
                    </div>
                    <div className="text-4xl font-black text-[#FFD60A]/20 mb-2">{step.step}</div>
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-3 z-10 items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-muted-foreground/40" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-20 px-4 bg-[#0B1220]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-2">Trusted by Thousands</h2>
            <p className="text-gray-400">Numbers that speak for themselves</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustItems.map((item) => {
              const Icon = item.Icon;
              return (
                <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/8 transition-colors">
                  <Icon className="w-6 h-6 text-[#FFD60A] mx-auto mb-3" />
                  <div className="text-2xl md:text-3xl font-black text-white mb-1">{item.value}</div>
                  <div className="text-xs text-gray-400 font-medium">{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 px-4 bg-background">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black mb-2">What Our Students Say</h2>
              <p className="text-muted-foreground">Real reviews from real customers</p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {testimonials.slice(0, 6).map((t) => (
                <div key={t.id} className="bg-card border border-border rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                  <div className="flex items-center gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FFD60A] text-[#FFD60A]" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#FFD60A]/20 border border-[#FFD60A]/30 flex items-center justify-center font-bold text-sm text-[#FFD60A]">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      {t.role && <div className="text-xs text-muted-foreground">{t.role}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-20 px-4 bg-muted/40">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black mb-2">Frequently Asked</h2>
              <p className="text-muted-foreground">Everything you need to know</p>
            </div>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-card border border-border rounded-2xl overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-sm hover:bg-muted/50 transition-colors"
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
      )}

      {/* CTA */}
      <section className="py-20 px-4 bg-[#FFD60A]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-black text-[#0B1220] mb-3">Ready to get started?</h2>
          <p className="text-[#0B1220]/70 mb-8 text-base">
            Join 5000+ students already using EduGenius Hub. Get your product within hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => setRequestOpen(true)}
              className="bg-[#0B1220] hover:bg-[#14213D] text-white font-bold px-8 py-4 rounded-xl text-base h-auto"
            >
              Request a Product
            </Button>
            <a href="https://wa.me/918766253356" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full border-[#0B1220]/30 text-[#0B1220] hover:bg-[#0B1220]/10 px-8 py-4 rounded-xl text-base font-bold h-auto">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat First
              </Button>
            </a>
          </div>
        </div>
      </section>

      <RequestAccessModal
        open={requestOpen}
        onClose={() => setRequestOpen(false)}
        products={allProducts}
      />
    </main>
  );
}
