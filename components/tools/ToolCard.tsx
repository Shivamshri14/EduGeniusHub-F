"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tool } from "@/lib/catalog";
import { buildWhatsAppLink, buildToolMessage } from "@/utils/whatsappMessageBuilder";
import { ExternalLink } from "lucide-react";
import ToolDialog from "./ToolDialog";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const hasPrice = tool.ourPrice > 0;
  const whatsappLink = buildWhatsAppLink(
    buildToolMessage(tool.name, tool.ourPrice)
  );

  return (
    <>
      <Card className="group overflow-hidden border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
        <div
          className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 cursor-pointer"
          onClick={() => setDialogOpen(true)}
        >
          <div className="text-center px-4">
            <div className="mb-2 text-3xl font-black text-white">
              {tool.name.split(' ')[0]}
            </div>
            <div className="text-lg font-bold text-white">
              {tool.name.split(' ').slice(1).join(' ')}
            </div>
          </div>
        </div>
        <CardContent
          className="p-6 cursor-pointer"
          onClick={() => setDialogOpen(true)}
        >
          <div className="mb-4 flex flex-wrap items-start gap-2">
            <Badge variant="default">
              {tool.category.toUpperCase()}
            </Badge>
            <Badge variant="secondary">
              {tool.accountType === "private" ? "Private" : tool.accountType === "shared" ? "Shared" : "Mail Access"}
            </Badge>
            {tool.durationValue && tool.durationType ? (
              <Badge variant="outline">
                {tool.durationValue} {tool.durationType}
              </Badge>
            ) : (
              <Badge variant="outline">
                {tool.planType}
              </Badge>
            )}
          </div>

          <h3 className="mb-2 text-lg font-bold text-foreground">
            {tool.name}
          </h3>

          <p className="mb-4 text-sm text-muted-foreground">{tool.tagline}</p>

          <div className="flex items-baseline gap-2">
            {tool.marketPrice > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{tool.marketPrice}
              </span>
            )}
            {hasPrice ? (
              <>
                <span className="text-2xl font-bold text-primary">
                  ₹{tool.ourPrice}
                </span>
                <span className="text-xs text-muted-foreground">
                  / {tool.durationValue && tool.durationType
                      ? `${tool.durationValue} ${tool.durationType}`
                      : tool.planType}
                </span>
              </>
            ) : (
              <span className="text-lg font-semibold text-primary">
                Contact for Price
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex gap-2 border-t p-4">
          <Button
            asChild
            className="flex-1"
            onClick={(e) => e.stopPropagation()}
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              {hasPrice ? "Buy Now" : "Inquire Now"}
            </a>
          </Button>
          {tool.officialUrl !== "#" && (
            <Button
              asChild
              variant="outline"
              size="icon"
              onClick={(e) => e.stopPropagation()}
            >
              <a
                href={tool.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Visit official site"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>

      <ToolDialog tool={tool} open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
}
