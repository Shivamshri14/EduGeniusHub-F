'use client';

import { useState, useEffect } from 'react';
import { activeServices, customRequirement } from '@/lib/catalog';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { buildWhatsAppLink, buildServiceMessage } from '@/utils/whatsappMessageBuilder';
import { CircleCheck as CheckCircle2, Code, FileText, Sparkles, ArrowRight } from 'lucide-react';

export default function ServicesSection() {
  const [allServices, setAllServices] = useState<any[]>(() => {
    const staticList = activeServices();
    return customRequirement.active ? [...staticList, customRequirement] : staticList;
  });

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.services) && data.services.length > 0) {
          setAllServices(data.services);
        }
      })
      .catch((err) => {
        console.warn('Failed to load services from DB:', err);
      });
  }, []);

  if (allServices.length === 0) return null;

  const serviceIcons: { [key: string]: any } = {
    'academic-writing': FileText,
    'development': Code,
  };

  return (
    <section className="py-16 sm:py-20 bg-background border-y border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-14 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-primary/20 bg-primary/10 text-primary font-semibold px-4 py-1.5 rounded-full text-xs tracking-wider uppercase"
          >
            Premium Solutions
          </Badge>
          <h2 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground">
            Professional{' '}
            <span className="text-primary">
              Services
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            Beyond standard tool accounts — we provide customized, high-quality academic support and custom software development to guarantee your success.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto items-stretch">
          {allServices.map((service, idx) => {
            const whatsappLink = buildWhatsAppLink(
              buildServiceMessage(service.title)
            );
            const serviceKey = 'id' in service ? (service.id as string) : `service-${idx}`;
            const ServiceIcon = 'id' in service ? serviceIcons[service.id as string] || Sparkles : Sparkles;

            return (
              <Card
                key={serviceKey}
                className="group overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-md bg-card rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <CardHeader className="pb-4 p-5 sm:p-7">
                    <div className="mb-5 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary group-hover:scale-105 transition-transform duration-300">
                      <ServiceIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2.5 leading-relaxed">
                      {service.description}
                    </p>
                  </CardHeader>

                  <CardContent className="pb-6 px-5 sm:px-7">
                    {'items' in service && service.items && Array.isArray(service.items) ? (
                      <ul className="space-y-3">
                        {(service.items as string[]).map((item, itemIdx) => {
                          const [title, description] = item.split(' - ');
                          return (
                            <li
                              key={itemIdx}
                              className="flex items-start gap-3 text-sm text-foreground"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
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
                </div>

                <CardFooter className="border-t border-border bg-muted/30 p-5 sm:p-7 mt-auto">
                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl py-3 text-sm transition-all hover:scale-[1.01]"
                  >
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      Request Quote
                      <ArrowRight className="w-4 h-4" />
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
