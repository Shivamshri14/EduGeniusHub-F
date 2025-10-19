import { SITE } from "@/lib/config";
import { ContactPanel } from "@/components/marketing/ContactPanel";
import { MapPin } from "lucide-react";

export const metadata = {
  title: `Contact Us - ${SITE.brand}`,
  description: `Get in touch with ${SITE.brand}. Reach us on WhatsApp for instant support or join our community.`,
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Have questions? Need support? We're here to help. Reach out via WhatsApp for instant assistance.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactPanel />

          <div className="mt-12 bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="text-slate-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-xl text-slate-900 mb-2">About {SITE.brand}</h3>
                <p className="text-slate-700 leading-relaxed mb-4">
                  We provide premium subscription access to essential tools for students and professionals. Our mission is to make high-quality software affordable and accessible.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  With fast delivery, verified accounts, and dedicated support, we ensure you have the best experience with every purchase.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl shadow-lg p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Fastest Response on WhatsApp
            </h2>
            <p className="text-xl text-blue-100 mb-6 leading-relaxed">
              We typically respond within minutes. Get instant answers to your questions and place orders directly through WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${SITE.phoneE164}?text=${encodeURIComponent("Hello EduGeniusHub, I have a query.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors font-semibold text-lg shadow-lg"
              >
                <span>Chat Now: {SITE.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
