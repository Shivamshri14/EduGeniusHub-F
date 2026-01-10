"use client";

import { SITE } from "@/lib/config";
import { waDirectLink } from "@/lib/whatsapp-message";
import { Phone, MessageCircle, Users, Instagram } from "lucide-react";

export function ContactPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Phone className="text-blue-600" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900">Call or Message</h3>
            <p className="text-sm text-slate-600">Quick response on WhatsApp</p>
          </div>
        </div>
        <a
          href={waDirectLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors block mb-4"
        >
          {SITE.phoneDisplay}
        </a>
        <a
          href={waDirectLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm"
        >
          <MessageCircle size={20} />
          <span>Message on WhatsApp</span>
        </a>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <Users className="text-green-600" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900">Join Our Community</h3>
            <p className="text-sm text-slate-600">Connect with other users</p>
          </div>
        </div>
        <p className="text-slate-700 mb-4 leading-relaxed">
          Get updates, exclusive offers, and support from our WhatsApp community. Stay connected with {SITE.brand}.
        </p>
        <a
          href={SITE.whatsappCommunityUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-sm"
        >
          <Users size={20} />
          <span>Join WhatsApp Community</span>
        </a>
      </div>

      {SITE.instagramUrl && (
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-sm p-8 text-white md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Instagram size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Follow Us on Instagram</h3>
              <p className="text-sm text-white/90">Daily updates and exclusive content</p>
            </div>
          </div>
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg hover:bg-white/90 transition-colors font-semibold shadow-sm"
          >
            <Instagram size={20} />
            <span>Follow on Instagram</span>
          </a>
        </div>
      )}
    </div>
  );
}
