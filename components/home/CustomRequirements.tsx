"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { buildWhatsAppLink } from "@/utils/whatsappMessageBuilder";

export default function CustomRequirements() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden border-2 border-orange-500/50 bg-gradient-to-br from-orange-500/10 to-red-500/10 dark:from-orange-900/20 dark:to-red-900/20">
          <CardContent className="p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500">
              <Sparkles className="h-8 w-8 text-white" />
            </div>

            <h2 className="mb-3 text-2xl font-bold text-foreground">
              Custom Requirements?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Have a specific project or tool in mind that you don&apos;t see listed? Or a project that is complex or needs special expertise? Tell us what you need, and we&apos;ll custom make it for you, tailored to the job you need done. Contact us for a free consultation.
            </p>

            <Button
              asChild
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
              size="lg"
            >
              <a
                href={buildWhatsAppLink("I have a custom requirement")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Discuss Your Needs
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
