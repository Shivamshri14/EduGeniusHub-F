"use client";

import { ComboTool } from "@/lib/catalog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/utils/whatsappMessageBuilder";
import { Package } from "lucide-react";

interface ComboDialogProps {
  combo: ComboTool;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ComboDialog({ combo, open, onOpenChange }: ComboDialogProps) {
  const savings = combo.marketPrice - combo.ourPrice;
  const savingsPercent = Math.round((savings / combo.marketPrice) * 100);

  const whatsappMessage = `Hi EduGenius, I want to purchase the ${combo.name} combo (₹${combo.ourPrice}). Tools included: ${combo.tools.join(", ")}. Please share details.`;
  const whatsappLink = buildWhatsAppLink(whatsappMessage);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl border-white/10 bg-zinc-900 text-white">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-blue-400" />
            <DialogTitle className="text-2xl font-bold">
              {combo.name}
            </DialogTitle>
          </div>
          <DialogDescription className="text-blue-400">
            {combo.tagline}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600">
              COMBO DEAL
            </Badge>
            <Badge variant="secondary" className="bg-red-500/20 text-red-300">
              Save {savingsPercent}%
            </Badge>
            <Badge variant="secondary" className="bg-zinc-800 text-gray-300">
              {combo.planType}ly
            </Badge>
          </div>

          <div>
            <h4 className="mb-2 font-semibold">Description</h4>
            <p className="text-sm text-gray-300">{combo.description}</p>
          </div>

          <div>
            <h4 className="mb-2 font-semibold">Included Tools</h4>
            <ul className="space-y-2">
              {combo.tools.map((tool, idx) => (
                <li key={idx} className="flex items-center text-sm text-gray-300">
                  <span className="mr-2 text-blue-400">✓</span>
                  {tool}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-white/10 bg-zinc-800/50 p-4">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="text-sm text-gray-400">Regular Price</p>
                <span className="text-lg text-gray-500 line-through">
                  ₹{combo.marketPrice}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Combo Price</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-blue-400">
                    ₹{combo.ourPrice}
                  </span>
                  <span className="text-sm text-gray-400">/ {combo.planType}</span>
                </div>
              </div>
            </div>
            <div className="mt-2 text-center text-sm font-semibold text-green-400">
              You Save ₹{savings}!
            </div>
          </div>

          <Button
            asChild
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Get Combo Deal on WhatsApp
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
