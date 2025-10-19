"use client";

import { useState } from "react";
import Image from "next/image";
import { waDirectLink } from "@/lib/whatsapp";
import { MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import type { Tool } from "@/lib/tools";

interface FeaturedToolsProps {
  tools: Tool[];
}

export function FeaturedTools({ tools }: FeaturedToolsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % tools.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + tools.length) % tools.length);
  };

  const currentTool = tools[currentIndex];

  return (
    <div className="relative bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="relative h-64 sm:h-80 bg-gradient-to-br from-slate-50 to-blue-50">
        <Image
          src={currentTool.image}
          alt={currentTool.name}
          fill
          className="object-contain p-8"
        />
      </div>

      <div className="p-6 sm:p-8">
        <h3 className="font-bold text-2xl text-slate-900 mb-2">{currentTool.name}</h3>
        <p className="text-lg text-blue-600 mb-3">{currentTool.tagline}</p>
        <p className="text-slate-600 mb-6 leading-relaxed">{currentTool.description}</p>

        <a
          href={waDirectLink(currentTool.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm w-full sm:w-auto"
        >
          <MessageCircle size={20} />
          <span>Enquire on WhatsApp</span>
        </a>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex items-center justify-between pointer-events-none">
        <button
          onClick={prevSlide}
          className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-slate-700 hover:text-blue-600 transition-colors"
          aria-label="Previous tool"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-slate-700 hover:text-blue-600 transition-colors"
          aria-label="Next tool"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {tools.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-blue-600 w-8"
                : "bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
