"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { activeReviews } from "@/lib/catalog";

export default function ReviewsSection() {
  const reviews = activeReviews();

  if (reviews.length === 0) return null;

  return (
    <section className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          {/* 5 Stars */}
          <div className="mb-4 flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-8 w-8 fill-yellow-500 text-yellow-500"
              />
            ))}
          </div>

          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Trusted by Thousands
          </h2>
          <p className="text-muted-foreground">See what our customers say about us</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="overflow-hidden border-border bg-card hover:border-primary/30 transition-all"
            >
              <CardContent className="p-0">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={`/assets${review.imageUrl}`}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-500 text-yellow-500"
                      />
                    ))}
                  </div>
                  <p className="mb-2 text-sm text-foreground">{review.quote}</p>
                  <p className="text-xs font-semibold text-primary">
                    {review.name}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">See thousands of satisfied customers</p>
        </div>
      </div>
    </section>
  );
}
