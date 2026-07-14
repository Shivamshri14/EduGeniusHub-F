'use client';

import { activeServices, customRequirement } from '@/lib/catalog';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { buildWhatsAppLink, buildServiceMessage } from '@/utils/whatsappMessageBuilder';
import { CheckCircle2, Code, FileText, Sparkles, ArrowRight } from 'lucide-react';

export default function ServicesSection() {
  const services = activeServices();
  const allServices = customRequirement.active
    ? [...services, customRequirement]
    : services;

  if (allServices.length === 0) return null;

  const serviceIcons: { [key: string]: any } = {
    'academic-writing': FileText,
    'development': Code,
  };

  return (
    <section className="relative py-24 bg-[#0B1F3A] overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d2448] via-[#0B1F3A] to-[#07121f]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F4B400]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-[#F4B400]/30 bg-[#F4B400]/10 text-[#F4B400] font-semibold px-4 py-1.5 rounded-full text-xs tracking-wider uppercase"
          >
            Premium Solutions
          </Badge>
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-white">
            Professional{' '}
            <span className="text-[#F4B400]">
              Services
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-gray-300 leading-relaxed">
            Beyond standard tool accounts — we provide customized, high-quality academic support and custom software development to guarantee your success.
          </p>
        </div>

        {/* 3-Column Grid for perfect symmetry */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto items-stretch">
          {allServices.map((service, idx) => {
            const whatsappLink = buildWhatsAppLink(
              buildServiceMessage(service.title)
            );
            const serviceKey = 'id' in service ? (service.id as string) : `service-${idx}`;
            const ServiceIcon = 'id' in service ? serviceIcons[service.id as string] || Sparkles : Sparkles;

            return (
              <Card
                key={serviceKey}
                className="group overflow-hidden border border-white/10 hover:border-[#F4B400]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#F4B400]/5 bg-[#0d2448]/45 backdrop-blur-md rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <CardHeader className="pb-4 p-6 sm:p-8">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-lg text-[#F4B400] group-hover:scale-105 transition-transform duration-300">
                      <ServiceIcon className="h-6 w-6" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#F4B400] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-300 mt-2.5 leading-relaxed">
                      {service.description}
                    </p>
                  </CardHeader>

                  <CardContent className="pb-6 px-6 sm:px-8">
                    {'items' in service && service.items && Array.isArray(service.items) ? (
                      <ul className="space-y-3">
                        {(service.items as string[]).map((item, itemIdx) => {
                          const [title, description] = item.split(' - ');
                          return (
                            <li
                              key={itemIdx}
                              className="flex items-start gap-3 text-sm text-gray-200"
                            >
                              <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 flex-shrink-0 text-[#F4B400]" />
                              <div>
                                <span className="font-semibold text-white">{title}</span>
                                {description && (
                                  <span className="text-gray-300"> - {description}</span>
                                )}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </CardContent>
                </div>

                <CardFooter className="border-t border-white/5 bg-white/[0.01] p-6 sm:p-8 mt-auto">
                  <Button
                    asChild
                    className="w-full bg-[#F4B400] hover:bg-[#d9a200] text-[#0B1F3A] font-bold rounded-xl py-3 text-sm transition-all hover:scale-[1.01] shadow-md shadow-[#F4B400]/10"
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
