"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle, Instagram } from "lucide-react";
import { SITE } from "@/lib/config";

export default function CommunitySection() {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-900/40 via-blue-800/30 to-background dark:from-blue-900/40 dark:via-blue-800/30 dark:to-[#1a2332]">
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-4 flex items-center justify-center">
          <div className="rounded-full bg-blue-500/20 p-4">
            <MessageCircle className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <h2 className="mb-4 text-3xl font-bold text-foreground dark:text-white">Join Our Community</h2>
        <p className="mb-8 text-lg text-muted-foreground dark:text-gray-300">
          Connect with other users, get exclusive offers, and stay updated with the latest tools and deals.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <a
              href={`https://wa.me/${SITE.phoneE164}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Join WhatsApp
            </a>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-pink-500/50 bg-pink-500/10 text-foreground dark:text-white hover:bg-pink-500/20"
          >
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="mr-2 h-5 w-5" />
              Follow on Instagram
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
