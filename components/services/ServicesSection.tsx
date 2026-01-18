"use client";

import { activeServices, customRequirement } from "@/lib/catalog";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { buildWhatsAppLink, buildServiceMessage } from "@/utils/whatsappMessageBuilder";
import { CheckCircle2, Code, FileText, Sparkles, ArrowRight } from "lucide-react";

export default function ServicesSection() {
  const services = activeServices();
  const allServices = customRequirement.active
    ? [...services, customRequirement]
    : services;

  if (allServices.length === 0) return null;

  const serviceIcons: { [key: string]: any } = {
    "academic-writing": FileText,
    "development": Code,
  };

  return (
    <section className="relative py-20 bg-[#1a2332]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <Badge
            variant="outline"
            className="mb-6 border-primary/30 bg-primary/10 text-primary font-semibold px-4 py-1.5"
          >
            PROFESSIONAL SERVICES
          </Badge>
          <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Expert Services
            </span>
            <br />
            <span className="text-foreground">for Your Success</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed">
            Beyond tools - we offer professional academic writing and development services
            tailored to help you achieve your goals with guaranteed quality and timely delivery
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {allServices.map((service, idx) => {
            const whatsappLink = buildWhatsAppLink(
              buildServiceMessage(service.title)
            );
            const serviceKey = "id" in service ? (service.id as string) : `service-${idx}`;
            const ServiceIcon = "id" in service ? serviceIcons[service.id as string] || Sparkles : Sparkles;

            return (
              <Card
                key={serviceKey}
                className="group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-card/50 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 shadow-lg">
                    <ServiceIcon className="h-8 w-8 text-primary" />
                  </div>

                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-base text-muted-foreground mt-2 leading-relaxed">
                    {service.description}
                  </p>
                </CardHeader>

                <CardContent className="pb-6">
                  {"items" in service && service.items && Array.isArray(service.items) ? (
                    <ul className="space-y-3">
                      {(service.items as string[]).map((item, itemIdx) => {
                        const [title, description] = item.split(" - ");
                        return (
                          <li
                            key={itemIdx}
                            className="flex items-start gap-3 text-sm"
                          >
                            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                            <div>
                              <span className="font-semibold text-foreground">{title}</span>
                              {description && (
                                <span className="text-muted-foreground"> - {description}</span>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </CardContent>

                <CardFooter className="border-t bg-muted/30 p-6">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold shadow-md hover:shadow-lg transition-all group/btn"
                    size="lg"
                  >
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {service.ctaText}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
