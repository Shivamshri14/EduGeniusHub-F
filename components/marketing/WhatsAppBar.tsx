"use client";

import { SITE } from "@/lib/config";
import { waDirectLink } from "@/lib/whatsapp";
import { MessageCircle, Users } from "lucide-react";

export function WhatsAppBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg md:hidden">
      <div className="flex divide-x divide-slate-200">
        <a
          href={waDirectLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-4 hover:bg-blue-700 transition-colors active:bg-blue-800"
        >
          <MessageCircle size={20} />
          <span className="font-semibold text-sm">Chat on WhatsApp</span>
        </a>
        <a
          href={SITE.whatsappCommunityUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-4 hover:bg-slate-800 transition-colors active:bg-slate-700"
        >
          <Users size={20} />
          <span className="font-semibold text-sm">Join Community</span>
        </a>
      </div>
    </div>
  );
}
