"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Code2 } from "lucide-react";
import { buildWhatsAppLink, buildServiceMessage } from "@/utils/whatsappMessageBuilder";

const services = [
  {
    id: "academic",
    icon: BookOpen,
    title: "Academic Writing Services",
    description: "Professional academic writing and research assistance for students",
    color: "blue",
    gradient: "from-blue-600 to-blue-700",
    iconGradient: "from-blue-500 to-blue-600",
    items: [
      "Thesis Writing - Complete thesis from chapter wise to whole thesis",
      "Research Paper - Quality research for journals or conferences",
      "Custom work Writing - Understand your needs and delivered on time",
      "Copyscapes and Writing - Essays and case studies with grammar checks",
      "And Personal Statement - Get personalized content",
    ],
  },
  {
    id: "development",
    icon: Code2,
    title: "Development Services",
    description: "Custom web and app development solutions for your business needs",
    color: "green",
    gradient: "from-emerald-600 to-emerald-700",
    iconGradient: "from-emerald-500 to-emerald-600",
    items: [
      "Website Development - Modern, responsive websites for your business",
      "Web/Mobile Apps - Full-stack app development for iOS and Android",
      "Mobile Apps - iOS and Android app development",
      "Frontend/Backend - Frontend design and backend robust development",
      "Maintenance & Support - Ongoing technical support",
    ],
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">Our Services</h2>
          <p className="text-muted-foreground">
            Beyond tools - Complete academic and development solutions
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <Card
                key={service.id}
                className="overflow-hidden border-border bg-card hover:border-primary/30 transition-all"
              >
                <CardHeader className="pb-4">
                  <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${service.iconGradient}`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardHeader>

                <CardContent className="pb-6">
                  <ul className="space-y-3">
                    {service.items.map((item, idx) => {
                      const [title, description] = item.split(" - ");
                      return (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
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
                </CardContent>

                <CardFooter>
                  <Button
                    asChild
                    className={`w-full bg-gradient-to-r ${service.gradient} hover:opacity-90`}
                    size="lg"
                  >
                    <a
                      href={buildWhatsAppLink(buildServiceMessage(service.title))}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn About Services
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
