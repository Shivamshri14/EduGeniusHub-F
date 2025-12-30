import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/config";
import { TOOLS } from "@/lib/tools";
import { waDirectLink } from "@/lib/whatsapp";
import { FeaturedTools } from "@/components/marketing/FeaturedTools";
import { MessageCircle, CheckCircle, Zap, Users, Package } from "lucide-react";

export const metadata = {
  title: `${SITE.brand} - Premium Tools. Managed by Professionals.`,
  description: "Access premium subscription tools for students and professionals. Fast delivery, trusted service, simple support.",
};

export default function MarketingHomePage() {
  const featuredTools = TOOLS.slice(0, 5);

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8 flex justify-center">
              <Image
                src="/edugeniushub-logo.png"
                alt={SITE.brand}
                width={80}
                height={80}
                className="rounded-2xl shadow-xl"
              />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Premium Tools.<br />
              <span className="text-blue-400">Managed by {SITE.brand}.</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 mb-10 leading-relaxed">
              Access top subscription tools for students and professionals. Fast delivery, trusted service, simple support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg"
              >
                <Package size={24} />
                <span>Browse Tools</span>
              </Link>
              <a
                href={waDirectLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl hover:bg-slate-100 transition-colors font-semibold text-lg shadow-lg"
              >
                <MessageCircle size={24} />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-blue-600" size={32} />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-2">Trusted Service</h3>
              <p className="text-slate-600 leading-relaxed">
                Verified accounts with guaranteed access. Your satisfaction is our priority.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Zap className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-2">Fast Delivery</h3>
              <p className="text-slate-600 leading-relaxed">
                Get your credentials quickly via WhatsApp. Start using tools within minutes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Users className="text-purple-600" size={32} />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-2">Simple Support</h3>
              <p className="text-slate-600 leading-relaxed">
                24/7 assistance on WhatsApp. We're here to help whenever you need us.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Featured Tools
            </h2>
            <p className="text-xl text-slate-600">
              Popular tools our customers love
            </p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg max-w-4xl mx-auto">
            <p className="text-sm text-yellow-800 text-center">
              <strong>Note:</strong> Prices are subject to change and may vary from time to time. Please contact us on WhatsApp for current pricing.
            </p>
          </div>
          <FeaturedTools tools={featuredTools} />
          <div className="text-center mt-12">
            <Link
              href="/tools"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-xl hover:bg-slate-800 transition-colors font-semibold text-lg shadow-lg"
            >
              <span>View All {TOOLS.length} Tools</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users size={64} className="mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Join Our Community
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Connect with other users, get exclusive offers, and stay updated with the latest tools and deals.
          </p>
          <a
            href={SITE.whatsappCommunityUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors font-semibold text-lg shadow-lg"
          >
            <MessageCircle size={24} />
            <span>Join WhatsApp Community</span>
          </a>
        </div>
      </section>
    </div>
  );
}
