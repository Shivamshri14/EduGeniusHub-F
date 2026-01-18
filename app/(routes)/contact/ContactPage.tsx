import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/catalog";
import { buildWhatsAppLink } from "@/utils/whatsappMessageBuilder";
import {
  MessageCircle,
  Instagram,
  Users,
  Home as HomeIcon,
  ChevronRight,
  Clock,
  RefreshCw,
  ShoppingCart,
  Briefcase,
} from "lucide-react";

export default function ContactPage() {
  const faqs = [
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
  ];

  return (
    <main className="min-h-screen bg-background">
      <div className="border-b border-border bg-card py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

      <div className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-5xl font-bold text-foreground">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              We're here to help! Reach out to us through any of these channels.
            </p>
          </div>

          <div className="mb-12 grid gap-6 md:grid-cols-2">
            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-emerald-500/10 via-emerald-400/5 to-teal-500/10 dark:from-emerald-900/40 dark:via-emerald-800/30 dark:to-teal-900/40 p-[2px] transition-all hover:shadow-2xl hover:shadow-emerald-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <CardContent className="relative bg-card p-8 rounded-[calc(0.75rem-2px)]">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-foreground">WhatsApp</h3>
                <p className="mb-4 text-muted-foreground">
                  Chat with us directly for instant support
                </p>
                <p className="mb-1 text-xl font-semibold text-emerald-600 dark:text-emerald-400">
                  {SITE.phoneDisplay}
                </p>
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Click to start chat →
                </a>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-pink-500/10 via-fuchsia-400/5 to-purple-500/10 dark:from-pink-900/40 dark:via-fuchsia-800/30 dark:to-purple-900/40 p-[2px] transition-all hover:shadow-2xl hover:shadow-pink-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-fuchsia-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <CardContent className="relative bg-card p-8 rounded-[calc(0.75rem-2px)]">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-600">
                  <Instagram className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-foreground">Instagram</h3>
                <p className="mb-4 text-muted-foreground">
                  Follow us for updates and offers
                </p>
                <p className="mb-1 text-xl font-semibold text-pink-600 dark:text-pink-400">
                  @edugeniushub
                </p>
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                >
                  Click to follow →
                </a>
              </CardContent>
            </Card>
          </div>

          <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-indigo-500/10 dark:from-blue-900/40 dark:via-blue-800/30 dark:to-indigo-900/40 p-[2px] transition-all hover:shadow-2xl hover:shadow-blue-500/20 mb-12">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <CardContent className="relative bg-card p-12 text-center rounded-[calc(0.75rem-2px)]">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 text-3xl font-bold text-foreground">
                Join Our Community
              </h3>
              <p className="mb-8 text-muted-foreground max-w-2xl mx-auto">
                Connect with thousands of users, get exclusive deals, and stay updated.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-6 text-base"
              >
                <a
                  href={SITE.whatsappCommunityUrl}
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

          <div>
            <h2 className="mb-8 text-3xl font-bold text-foreground text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {faqs.map((faq, idx) => {
                const Icon = faq.icon;
                return (
                  <Card key={idx} className="border-border bg-card">
                    <CardContent className="p-6">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-bold text-foreground">{faq.question}</h3>
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
