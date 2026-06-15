'use client';

import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

const WA_URL = 'https://wa.me/918766253356';
const CALL_PHONE = 'tel:+918766253356';

const WA_SVG = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function WhatsAppFloatingButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-2.5">
      {/* Call button */}
      <a
        href={CALL_PHONE}
        className="flex items-center gap-2.5 bg-[#0B1F3A] hover:bg-[#122d58] text-white shadow-xl shadow-[#0B1F3A]/30 transition-all duration-200 hover:scale-105 rounded-2xl px-4 py-2.5 border border-white/10"
        aria-label="Call now"
      >
        <span className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center">
          <Phone className="w-4 h-4 text-blue-300" />
        </span>
        <div className="hidden sm:block">
          <p className="text-xs font-bold leading-tight">Call Now</p>
          <p className="text-[10px] text-gray-300 leading-tight">+91 87662 53356</p>
        </div>
      </a>

      {/* WhatsApp button */}
      <a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-xl shadow-[#25D366]/35 transition-all duration-200 hover:scale-105 rounded-2xl px-4 py-2.5"
        aria-label="Chat on WhatsApp"
      >
        {WA_SVG}
        <div className="hidden sm:block">
          <p className="text-xs font-bold leading-tight">Chat Now</p>
          <p className="text-[10px] opacity-85 leading-tight">Avg reply &lt; 2 mins</p>
        </div>
      </a>
    </div>
  );
}
