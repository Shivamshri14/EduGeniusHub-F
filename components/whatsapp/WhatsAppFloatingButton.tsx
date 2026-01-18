"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/utils/whatsappMessageBuilder";

export default function WhatsAppFloatingButton() {
  return (
    <a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg shadow-blue-600/50 transition-transform hover:scale-110 hover:shadow-xl hover:shadow-blue-600/60"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </a>
  );
}
