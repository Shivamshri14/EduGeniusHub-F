import Image from "next/image";
import { waDirectLink } from "@/lib/whatsapp";
import { MessageCircle, CheckCircle } from "lucide-react";
import type { ComboTool } from "@/lib/tools";

interface ComboCardProps {
  combo: ComboTool;
}

export function ComboCard({ combo }: ComboCardProps) {
  const discount = Math.round(((combo.marketPrice - combo.ourPrice) / combo.marketPrice) * 100);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl shadow-md border-2 border-purple-200 dark:border-purple-800 overflow-hidden hover:shadow-xl transition-all group relative">
      <div className="absolute top-3 right-3 z-10">
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-base font-bold shadow-lg animate-pulse">
          {discount}% OFF
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
      </div>

      <div className="relative h-56 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
        <Image
          src={combo.image}
          alt={combo.name}
          fill
          className="object-contain p-8 group-hover:scale-110 transition-transform"
        />
        <div className="absolute bottom-3 left-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
          COMBO PACK
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2">
          {combo.name}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{combo.tagline}</p>

        <div className="mb-4 space-y-2">
          {combo.tools.map((tool, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
              <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
              <span>{tool}</span>
            </div>
          ))}
        </div>

        <div className="mb-4 bg-white dark:bg-slate-800 p-4 rounded-lg border-2 border-purple-200 dark:border-purple-700">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-3xl font-bold text-green-600 dark:text-green-400">₹{combo.ourPrice}</span>
            <span className="text-xl text-slate-400 dark:text-slate-500 line-through">₹{combo.marketPrice}</span>
          </div>
          <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
            🎉 You save ₹{combo.marketPrice - combo.ourPrice}!
          </p>
        </div>

        <a
          href={waDirectLink(combo.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all font-semibold shadow-md hover:shadow-lg"
        >
          <MessageCircle size={18} />
          <span>Get This Combo</span>
        </a>
      </div>
    </div>
  );
}
