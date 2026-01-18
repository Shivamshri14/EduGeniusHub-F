"use client";

import { Tool } from "@/lib/catalog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink, buildToolMessage } from "@/utils/whatsappMessageBuilder";
import { ExternalLink } from "lucide-react";

interface ToolDialogProps {
  tool: Tool;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ToolDialog({ tool, open, onOpenChange }: ToolDialogProps) {
  const hasPrice = tool.ourPrice > 0;
  const whatsappLink = buildWhatsAppLink(
    buildToolMessage(tool.name, tool.ourPrice)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {tool.name}
          </DialogTitle>
          <DialogDescription className="text-primary">
            {tool.tagline}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="border-primary/40 bg-primary/15 text-primary dark:text-primary"
            >
              {tool.category.toUpperCase()}
            </Badge>
            <Badge
              variant="outline"
              className="border-secondary/40 bg-secondary/15 text-foreground dark:text-foreground"
            >
              {tool.accountType === "private" ? "Private Account" : tool.accountType === "shared" ? "Shared Account" : "Mail Access"}
            </Badge>
            <Badge
              variant="outline"
              className="border-border bg-muted text-foreground dark:text-foreground"
            >
              {tool.durationValue && tool.durationType
                ? `${tool.durationValue} ${tool.durationType}`
                : tool.planType}
            </Badge>
          </div>

          <div>
            <h4 className="mb-2 font-semibold">Description</h4>
            <p className="text-sm text-muted-foreground">{tool.description}</p>
          </div>

          <div className="flex items-baseline gap-2">
            {tool.marketPrice > 0 && (
              <span className="text-lg text-muted-foreground line-through">
                ₹{tool.marketPrice}
              </span>
            )}
            {hasPrice ? (
              <>
                <span className="text-3xl font-bold text-primary">
                  ₹{tool.ourPrice}
                </span>
                <span className="text-sm text-muted-foreground">
                  / {tool.durationValue && tool.durationType
                      ? `${tool.durationValue} ${tool.durationType}`
                      : tool.planType}
                </span>
              </>
            ) : (
              <span className="text-xl font-semibold text-primary">
                Contact for Price
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              asChild
              className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                {hasPrice ? "Buy Now on WhatsApp" : "Inquire on WhatsApp"}
              </a>
            </Button>
            {tool.officialUrl !== "#" && (
              <Button
                asChild
                variant="outline"
              >
                <a
                  href={tool.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Official Site
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
