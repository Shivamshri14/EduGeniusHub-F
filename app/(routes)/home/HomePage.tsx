'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, ChevronDown, Clapperboard, Code2, FileText, KeyRound, MessageCircle, PackageCheck, Smartphone, Sparkles, Star, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import ServicesSection from '@/components/home/ServicesSection';
import { FAQS } from '@/lib/faqs';
import { SITE } from '@/lib/config';
import type { Product } from '@/lib/types';

const categories = [
  { id: 'reports', label: 'Reports', desc: 'Similarity and AI-writing checks', href: '/products?category=reports', color: 'from-orange-500 to-amber-400', Icon: FileText },
  { id: 'ai_tools', label: 'AI tools', desc: 'Shared tool access', href: '/products?category=ai_tools', color: 'from-emerald-500 to-teal-400', Icon: Sparkles },
  { id: 'accounts', label: 'Accounts', desc: 'Logins we set up for you', href: '/products?category=accounts', color: 'from-violet-500 to-fuchsia-400', Icon: KeyRound },
  { id: 'ott', label: 'OTT', desc: 'Video subscriptions', href: '/products?category=ott', color: 'from-rose-500 to-orange-400', Icon: Clapperboard },
];

const steps = [
  { step: '01', title: 'Message on WhatsApp', desc: 'Tell us the product. For a report, send the file in the same chat.', iconBg: 'bg-orange-500 shadow-orange-500/30', wash: 'from-orange-50', num: 'text-orange-200', Icon: MessageCircle },
  { step: '02', title: 'Pay by UPI', desc: 'We confirm the price on WhatsApp, then share the UPI details.', iconBg: 'bg-amber-500 shadow-amber-500/30', wash: 'from-amber-50', num: 'text-amber-200', Icon: Wallet },
  { step: '03', title: 'We deliver', desc: 'You get the report or the access in the time shown on that product.', iconBg: 'bg-emerald-500 shadow-emerald-500/30', wash: 'from-emerald-50', num: 'text-emerald-200', Icon: PackageCheck },
];

const websiteWork = ['College and institute sites', 'Coaching class pages', 'Shop and catalogue sites', 'Portfolio sites', 'Booking and enquiry pages', 'Small business homepages'];
const appWork = ['Student helper apps', 'Shop order apps', 'Appointment booking apps', 'Business catalogue apps', 'Custom college project apps'];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<string | null>(FAQS[0]?.id ?? null);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [faqsList, setFaqsList] = useState<any[]>(() => FAQS);
  const [reviews, setReviews] = useState<any[]>([]);
  const [phone, setPhone] = useState(SITE.phoneE164);
  const [communityUrl, setCommunityUrl] = useState(SITE.whatsappCommunityUrl);

  useEffect(() => {
    fetch('/api/products?featured=true')
      .then((r) => r.json())
      .then((data) => {
        if (data.products?.length) setFeaturedProducts(data.products);
        else return fetch('/api/products').then((res) => res.json()).then((all) => setFeaturedProducts(all.products || []));
      })
      .catch(() => {})
      .finally(() => setFeaturedLoading(false));

    fetch('/api/faqs')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.faqs) && data.faqs.length > 0) {
          setFaqsList(data.faqs);
          setOpenFaq(data.faqs[0].id);
        }
      })
      .catch(() => {});

    fetch('/api/reviews')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.reviews)) setReviews(data.reviews.slice(0, 6));
      })
      .catch(() => {});

    fetch('/api/settings')
      .then((r) => r.json())
      .then((data) => {
        if (!data.success || !data.settings) return;
        setPhone(data.settings.phone_e164 || SITE.phoneE164);
        setCommunityUrl(data.settings.whatsapp_community_url || SITE.whatsappCommunityUrl);
      })
      .catch(() => {});
  }, []);

  const waHref = `https://wa.me/${phone}?text=${encodeURIComponent('Hi EduGenius Hub, I want to know more about your products. Please guide me.')}`;
  const buildHref = `https://wa.me/${phone}?text=${encodeURIComponent('Hi EduGenius Hub, I want a website or an app. Please share a starting price and a demo of similar work.')}`;

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fff7ed] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <section className="relative px-4 pb-8 pt-6 sm:pt-10">
        <div className="pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full bg-orange-300/50 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-24 h-64 w-64 rounded-full bg-violet-300/40 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-pop-in">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-orange-700 shadow-sm dark:bg-slate-900 dark:text-orange-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              WhatsApp replies in under 2 minutes
            </p>
            <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:text-6xl">
              Reports, tools, and apps.
              <span className="mt-1 block bg-gradient-to-r from-orange-500 via-rose-500 to-violet-600 bg-clip-text text-transparent">
                Order on WhatsApp.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
              Send the file or tell us the plan, pay by UPI, and we deliver. We also build websites and apps for your business.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-6 text-sm font-bold text-white shadow-lg shadow-orange-500/30">
                <MessageCircle className="mr-2 h-4 w-4" />
                Message on WhatsApp
              </a>
              <Link href="/products" className="inline-flex h-12 items-center justify-center rounded-2xl border border-orange-200 bg-white px-6 text-sm font-bold text-slate-800 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                See products
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-orange-300 to-violet-300 opacity-70 blur-3xl" />
            <img
              src="/mascot.jpg"
              alt="EduGenius mascot holding a report and a phone"
              className="animate-float relative w-full object-contain drop-shadow-2xl"
              style={{ WebkitMaskImage: 'radial-gradient(ellipse at center, #000 72%, transparent 100%)', maskImage: 'radial-gradient(ellipse at center, #000 72%, transparent 100%)' }}
            />
            <span className="absolute left-2 top-16 inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-xs font-bold text-slate-800 shadow-lg dark:bg-slate-900 dark:text-slate-100">
              <FileText className="h-4 w-4 text-orange-500" /> Reports
            </span>
            <span className="absolute bottom-16 right-2 inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-xs font-bold text-slate-800 shadow-lg dark:bg-slate-900 dark:text-slate-100">
              <Smartphone className="h-4 w-4 text-violet-500" /> Apps
            </span>
          </div>
        </div>
        <div className="relative mx-auto mt-8 grid max-w-6xl grid-cols-2 gap-3 lg:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.id} href={category.href} className="group flex items-center gap-3 overflow-hidden rounded-2xl bg-white p-4 shadow-md shadow-orange-900/5 transition hover:-translate-y-1 hover:shadow-lg dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">
              <span className={cn('inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm', category.color)}>
                <category.Icon className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-sm font-black">{category.label}</span>
                <span className="mt-0.5 block text-xs leading-snug text-slate-500 dark:text-slate-400">{category.desc}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <ServicesSection />

      <section className="px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-orange-600">Shop</p>
              <h2 className="text-3xl font-black">Products</h2>
            </div>
            <Link href="/products" className="inline-flex items-center gap-1 text-sm font-bold text-orange-600">
              All products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {featuredLoading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-white p-5 shadow-lg shadow-orange-900/5 dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-600">Websites and apps</p>
          <h2 className="mt-1 max-w-2xl text-3xl font-black">We also build websites and apps for your business</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            A small team designs, builds, and hands over custom websites and apps. Share what you need on WhatsApp and we send a starting price, plus a demo of similar work.
          </p>

          <div className="mt-6 grid items-start gap-4 lg:grid-cols-[0.85fr_1.15fr]">
            <img src="/build.jpg" alt="Illustration of a website on a monitor and a mobile app" className="w-full rounded-3xl object-cover shadow-md" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-100 bg-gradient-to-b from-orange-50 to-white p-5 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30">
                    <Code2 className="h-6 w-6" />
                  </span>
                  <span className="text-4xl font-black leading-none text-orange-200 dark:text-orange-400/40">14</span>
                </div>
                <h3 className="mt-5 text-lg font-black">Websites completed</h3>
                <ul className="mt-3 space-y-2">
                  {websiteWork.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <Check className="h-4 w-4 shrink-0 text-orange-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-gradient-to-b from-violet-50 to-white p-5 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500 text-white shadow-lg shadow-violet-500/30">
                    <Smartphone className="h-6 w-6" />
                  </span>
                  <span className="text-4xl font-black leading-none text-violet-200 dark:text-violet-400/40">05</span>
                </div>
                <h3 className="mt-5 text-lg font-black">Apps completed</h3>
                <ul className="mt-3 space-y-2">
                  {appWork.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <Check className="h-4 w-4 shrink-0 text-violet-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <a href={buildHref} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-rose-500 px-5 text-sm font-bold text-white shadow-lg shadow-orange-500/30">
            <MessageCircle className="mr-2 h-4 w-4" />
            Ask for a demo on WhatsApp
          </a>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="px-4 py-10">
          <div className="mx-auto max-w-6xl">
            <div className="mb-5 flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
              <h2 className="ml-1 text-2xl font-black">What buyers wrote</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {reviews.map((review) => (
                <article key={review.id} className="rounded-3xl border border-orange-100 bg-white p-5 shadow-md dark:border-slate-700 dark:bg-slate-900 dark:shadow-none">
                  <div className="mb-3 flex gap-1">
                    {Array.from({ length: review.rating || 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">&ldquo;{review.quote}&rdquo;</p>
                  <p className="mt-4 text-sm font-black text-orange-600">{review.name}</p>
                  {review.role && <p className="text-xs text-slate-500 dark:text-slate-400">{review.role}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-4 py-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-white p-5 shadow-lg shadow-orange-900/5 dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-600">3 easy steps</p>
          <h2 className="mt-1 text-3xl font-black">How ordering works</h2>
          <div className="relative mt-6 grid gap-4 md:grid-cols-3">
            <div className="pointer-events-none absolute left-[18%] right-[18%] top-7 hidden h-1 rounded-full bg-gradient-to-r from-orange-300 via-amber-300 to-emerald-300 md:block" />
            {steps.map((step) => (
              <div key={step.step} className={cn('relative rounded-3xl border border-slate-100 bg-gradient-to-b to-white p-5 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900', step.wash)}>
                <div className="flex items-center justify-between">
                  <span className={cn('relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg', step.iconBg)}>
                    <step.Icon className="h-6 w-6" />
                  </span>
                  <span className={cn('text-4xl font-black leading-none', step.num)}>{step.step}</span>
                </div>
                <h3 className="mt-5 text-lg font-black">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-[2rem] bg-white p-5 shadow-lg shadow-orange-900/5 dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800 sm:p-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-violet-300 via-fuchsia-200 to-orange-200 opacity-80 blur-3xl" />
            <img
              src="/faq-question.jpg"
              alt="A friendly question mark"
              className="animate-float relative mx-auto w-full object-contain drop-shadow-2xl"
              style={{ WebkitMaskImage: 'radial-gradient(ellipse at 50% 46%, #000 68%, transparent 86%)', maskImage: 'radial-gradient(ellipse at 50% 46%, #000 68%, transparent 86%)' }}
            />
            <span className="absolute left-0 top-4 max-w-[10.5rem] rounded-2xl rounded-bl-md bg-slate-900 px-3 py-2 text-xs font-bold leading-snug text-white shadow-lg">
              Ask me. I reply on WhatsApp.
            </span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-violet-600">Before you order</p>
            <h2 className="mt-1 text-3xl font-black">Questions</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Tap a question. The answer is the same one we send on WhatsApp.</p>
            <div className="mt-5 space-y-2">
              {faqsList.map((faq, index) => {
                const open = openFaq === faq.id;
                return (
                  <div key={faq.id} className={cn('overflow-hidden rounded-2xl border transition', open ? 'border-orange-200 bg-orange-50/70 shadow-sm dark:border-orange-500/40 dark:bg-slate-800' : 'border-slate-100 bg-slate-50/60 hover:border-orange-100 hover:bg-white dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-slate-600 dark:hover:bg-slate-800')}>
                    <button type="button" className="flex w-full items-center gap-3 px-3 py-3 text-left" onClick={() => setOpenFaq(open ? null : faq.id)} aria-expanded={open}>
                      <span className={cn('inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black', open ? 'bg-orange-500 text-white' : 'bg-white text-orange-600 ring-1 ring-orange-100 dark:bg-slate-900 dark:text-orange-300 dark:ring-slate-700')}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="min-w-0 flex-1 text-sm font-bold sm:text-base">{faq.question}</span>
                      <span className={cn('inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-slate-500 ring-1 ring-slate-100 transition dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700', open && 'rotate-180 text-orange-600')}>
                        <ChevronDown className="h-4 w-4" />
                      </span>
                    </button>
                    {open && <p className="animate-pop-in px-3 pb-4 pl-[3.75rem] pr-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{faq.answer}</p>}
                  </div>
                );
              })}
            </div>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 text-sm font-bold text-white dark:bg-white dark:text-slate-900">
              <MessageCircle className="h-4 w-4" />
              Still unsure? Message us
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 pt-4">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-8 text-white shadow-xl">
          <h2 className="text-2xl font-black">WhatsApp community</h2>
          <p className="mt-2 max-w-xl text-sm text-white/90">Join the group for new offers. Ordering still happens in a direct chat.</p>
          <a href={communityUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex h-12 items-center justify-center rounded-2xl bg-white px-5 text-sm font-black text-emerald-700">
            Join the Community
          </a>
        </div>
      </section>
    </main>
  );
}
