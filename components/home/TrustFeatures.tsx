"use client";

import { CheckCircle, Zap, Shield, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: CheckCircle,
    title: "Trusted Service",
    description: "Verified accounts with guaranteed access",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Instant Delivery",
    description: "Get your tools and services instantly",
    gradient: "from-emerald-500 to-green-500",
  },
  {
    icon: Shield,
    title: "Secure & Safe",
    description: "Your data is protected and secure",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Always here to help you anytime",
    gradient: "from-orange-500 to-red-500",
  },
];

export default function TrustFeatures() {
  return (
    <section className="py-16 bg-background border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="bg-card border-border hover:border-primary/30 transition-all"
              >
                <CardContent className="pt-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                    <div
                      className={`flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} p-3`}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
