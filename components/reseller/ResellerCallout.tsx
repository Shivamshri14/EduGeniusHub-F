import { resellerContent } from "@/lib/homeContent";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { buildWhatsAppLink, buildResellerMessage } from "@/utils/whatsappMessageBuilder";
import { Sparkles } from "lucide-react";

export default function ResellerCallout() {
  if (!resellerContent.active) return null;

  const whatsappLink = buildWhatsAppLink(buildResellerMessage());

  return (
    <section className="py-8 bg-background">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden border-2 border-blue-500/50 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-900/30 dark:to-cyan-900/30">
          <CardContent className="p-8 text-center">
            <Sparkles className="mx-auto mb-4 h-12 w-12 text-blue-600 dark:text-blue-400" />
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              {resellerContent.title}
            </h2>
            <p className="mb-6 text-muted-foreground">
              {resellerContent.description}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
            >
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {resellerContent.buttonLabel}
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
