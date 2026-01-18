import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/catalog";
import { Users, Bell, Gift, MessageCircle } from "lucide-react";

export default function CommunitySection() {
  return (
    <section className="">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden border-blue-600/30 bg-gradient-to-br from-blue-900/30 via-cyan-900/20 to-blue-900/30">
          <CardContent className="p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-600/20 px-4 py-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  <span className="text-sm font-semibold text-blue-400">
                    JOIN OUR COMMUNITY
                  </span>
                </div>
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                  Get Exclusive Deals & Updates
                </h2>
                <p className="mb-6 text-gray-300">
                  Join our WhatsApp community and be the first to know about special offers,
                  new tools, and exclusive discounts. Connect with thousands of satisfied customers!
                </p>

                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600/20">
                      <Bell className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Instant Updates</h4>
                      <p className="text-sm text-gray-400">
                        Get notified about new tools and features
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-600/20">
                      <Gift className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Exclusive Offers</h4>
                      <p className="text-sm text-gray-400">
                        Access member-only deals and discounts
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-600/20">
                      <MessageCircle className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Priority Support</h4>
                      <p className="text-sm text-gray-400">
                        Get faster responses to your queries
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-purple-600/20">
                      <Users className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Community Help</h4>
                      <p className="text-sm text-gray-400">
                        Connect with other users and share tips
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  <a
                    href={SITE.whatsappCommunityUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Users className="h-5 w-5" />
                    Join WhatsApp Community
                  </a>
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-600/20 blur-3xl"></div>
                <div className="relative rounded-lg border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-blue-600"></div>
                      <div>
                        <p className="font-semibold text-white">EduGenius Hub Community</p>
                        <p className="text-sm text-gray-400">1000+ members</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-lg bg-zinc-800/50 p-3">
                      <p className="text-sm text-gray-300">
                        <span className="font-semibold text-blue-400">Admin:</span> 🎉 New
                        Year special offer on ChatGPT Plus!
                      </p>
                    </div>
                    <div className="rounded-lg bg-zinc-800/50 p-3">
                      <p className="text-sm text-gray-300">
                        <span className="font-semibold text-cyan-400">Member:</span> Just
                        received my Turnitin account. Super fast delivery!
                      </p>
                    </div>
                    <div className="rounded-lg bg-zinc-800/50 p-3">
                      <p className="text-sm text-gray-300">
                        <span className="font-semibold text-green-400">Member:</span> Best
                        prices for premium tools. Highly recommended! 👍
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
