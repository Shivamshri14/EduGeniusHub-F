"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ComboTool } from "@/lib/catalog";
import { buildWhatsAppLink } from "@/utils/whatsappMessageBuilder";
import { Package, Info } from "lucide-react";
import ComboDialog from "./ComboDialog";

interface ComboCardProps {
  combo: ComboTool;
}

export default function ComboCard({ combo }: ComboCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const whatsappMessage = `Hi EduGenius, I want to purchase the ${combo.name} combo (₹${combo.ourPrice}). Tools included: ${combo.tools.join(", ")}. Please share details.`;
  const whatsappLink = buildWhatsAppLink(whatsappMessage);

  const savings = combo.marketPrice - combo.ourPrice;
  const savingsPercent = Math.round((savings / combo.marketPrice) * 100);

  return (
    <>
      <Card className="group overflow-hidden border-white/10 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-sm transition-all hover:border-blue-600/50 hover:shadow-lg hover:shadow-blue-600/10">
        <CardContent className="p-6">
          <div className="mb-4 flex items-start justify-between">
            <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600">
              <Package className="mr-1 h-3 w-3" />
              COMBO
            </Badge>
            <Badge variant="secondary" className="bg-red-500/20 text-red-300">
              Save {savingsPercent}%
            </Badge>
          </div>

          <h3 className="mb-2 text-xl font-bold text-white">{combo.name}</h3>

          <p className="mb-2 text-sm text-blue-300">{combo.tagline}</p>

          <button
            onClick={() => setDialogOpen(true)}
            className="mb-4 flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
          >
            <Info className="h-3 w-3" />
            Click for details
          </button>

          <div className="mb-4">
            <p className="mb-2 text-xs font-semibold uppercase text-gray-400">
              Includes {combo.tools.length} tools:
            </p>
            <ul className="space-y-1">
              {combo.tools.slice(0, 3).map((tool, idx) => (
                <li key={idx} className="flex items-center text-sm text-gray-300">
                  <span className="mr-2 text-blue-400">✓</span>
                  {tool}
                </li>
              ))}
              {combo.tools.length > 3 && (
                <li className="text-sm text-gray-400">
                  + {combo.tools.length - 3} more...
                </li>
              )}
            </ul>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-sm text-gray-500 line-through">
              ₹{combo.marketPrice}
            </span>
            <span className="text-2xl font-bold text-blue-400">
              ₹{combo.ourPrice}
            </span>
            <span className="text-xs text-gray-400">/ {combo.planType}</span>
          </div>
        </CardContent>

        <CardFooter className="border-t border-white/5 bg-zinc-900/80 p-4">
          <Button
            asChild
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              Get Combo Deal
            </a>
          </Button>
        </CardFooter>
      </Card>

      <ComboDialog combo={combo} open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
