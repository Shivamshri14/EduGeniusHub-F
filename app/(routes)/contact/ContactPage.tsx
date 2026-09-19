'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/catalog";
import { MessageCircle, Instagram, Users, Chrome as HomeIcon, ChevronRight, Clock, RefreshCw, ShoppingCart, Briefcase } from "lucide-react";

export default function ContactPage() {
  const [siteConfig, setSiteConfig] = useState({
    phone_display: SITE.phoneDisplay,
    phone_e164: SITE.phoneE164,
    instagram_url: SITE.instagramUrl,
    whatsapp_community_url: SITE.whatsappCommunityUrl,
  });

  const [faqs, setFaqs] = useState<any[]>([
    {
      icon: Clock,
      question: "How long does delivery take?",
      answer:
        "Most tools are delivered within 5-30 minutes after payment confirmation. Some tools may take up to 24 hours.",
    },
    {
      icon: RefreshCw,
      question: "What is your refund policy?",
      answer:
        "We offer refunds if the tool/service is not delivered as promised. Contact us within 24 hours of purchase.",
    },
    {
      icon: ShoppingCart,
      question: "How do I purchase?",
      answer:
        "Click on any 'Buy Now' or 'WhatsApp' button, message us with your requirements, make payment, and receive your tool instantly.",
    },
    {
      icon: Briefcase,
      question: "Do you offer reseller pricing?",
      answer:
        "Yes! We offer special pricing for resellers. Message us on WhatsApp to discuss bulk orders and reseller programs.",
    },
  ]);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSiteConfig({
            phone_display: data.settings.phone_display || SITE.phoneDisplay,
            phone_e164: data.settings.phone_e164 || SITE.phoneE164,
            instagram_url: data.settings.instagram_url || SITE.instagramUrl,
            whatsapp_community_url: data.settings.whatsapp_community_url || SITE.whatsappCommunityUrl,
          });
        }
      })
      .catch(() => {});

    fetch('/api/faqs')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.faqs) && data.faqs.length > 0) {
          const mapped = data.faqs.slice(0, 4).map((f: any, idx: number) => {
            const icons = [Clock, RefreshCw, ShoppingCart, Briefcase];
            return {
              icon: icons[idx % icons.length],
              question: f.question,
              answer: f.answer,
            };
          });
          setFaqs(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const waLink = `https://wa.me/${siteConfig.phone_e164}?text=${encodeURIComponent(
    "Hello EduGenius Hub, I have a query."
  )}`;

  return (
    <main className="min-h-screen bg-background pt-16">
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
              <HomeIcon className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Contact</span>
          </div>
        </div>
      </div>

      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 sm:mb-14 text-center">
            <h1 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-black text-foreground">Contact Us</h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              We&apos;re here to help! Reach out to us through any of these channels.
            </p>
          </div>

          <div className="mb-10 grid gap-4 sm:gap-6 md:grid-cols-2">
            {/* WhatsApp Card */}
            <Card className="border border-border bg-card hover:border-[#25D366]/30 transition-all hover:shadow-md">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20">
                  <MessageCircle className="h-7 w-7 text-[#25D366]" />
                </div>
                <h3 className="mb-2 text-xl sm:text-2xl font-bold text-foreground">WhatsApp</h3>
                <p className="mb-4 text-sm sm:text-base text-muted-foreground">
                  Chat with us directly for instant support
                </p>
                <p className="mb-2 text-lg font-semibold text-foreground">
                  {siteConfig.phone_display}
                </p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all hover:scale-105"
                >
                  <MessageCircle className="w-4 h-4" />
                  Start Chat
                </a>
              </CardContent>
            </Card>

            {/* Instagram Card */}
            <Card className="border border-border bg-card hover:border-pink-500/30 transition-all hover:shadow-md">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/10 border border-pink-500/20">
                  <Instagram className="h-7 w-7 text-pink-500" />
                </div>
                <h3 className="mb-2 text-xl sm:text-2xl font-bold text-foreground">Instagram</h3>
                <p className="mb-4 text-sm sm:text-base text-muted-foreground">
                  Follow us for updates and offers
                </p>
                <p className="mb-2 text-lg font-semibold text-foreground">
                  @edugenius.hub1
                </p>
                <a
                  href={siteConfig.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-pink-500/10 hover:bg-pink-500/20 text-pink-600 dark:text-pink-400 font-semibold px-5 py-2.5 rounded-xl text-sm border border-pink-500/20 transition-all hover:scale-105"
                >
                  <Instagram className="w-4 h-4" />
                  Follow Us
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Community CTA */}
          <Card className="border border-border bg-card mb-10">
            <CardContent className="p-8 sm:p-12 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-3 text-2xl sm:text-3xl font-bold text-foreground">
                Join Our Community
              </h3>
              <p className="mb-6 text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
                Connect with thousands of users, get exclusive deals, and stay updated.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3.5 text-base rounded-xl"
              >
                <a
                  href={siteConfig.whatsapp_community_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Join WhatsApp Community
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* FAQ */}
          <div>
            <h2 className="mb-6 sm:mb-8 text-2xl sm:text-3xl font-bold text-foreground text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {faqs.map((faq, idx) => {
                const Icon = faq.icon;
                return (
                  <Card key={idx} className="border-border bg-card">
                    <CardContent className="p-5 sm:p-6">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-bold text-foreground text-sm sm:text-base">{faq.question}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground pl-13">{faq.answer}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
