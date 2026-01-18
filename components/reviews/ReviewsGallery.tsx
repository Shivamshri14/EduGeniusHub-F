"use client";

import Image from "next/image";
import { activeReviews } from "@/lib/catalog";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export default function ReviewsGallery() {
  const reviews = activeReviews();

  if (reviews.length === 0) return null;

  return (
    <section className="py-16 bg-[#1a2332]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Trusted by Thousands
          </h2>
          <p className="text-gray-400">
            See what our customers say about us
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="overflow-hidden border-2 border-primary/20"
            >
              <CardContent className="p-0">
                <div className="relative aspect-[3/4] w-full border-b-2 border-primary/20">
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
                        className="h-4 w-4 fill-secondary text-secondary"
                      />
                    ))}
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">{review.quote}</p>
                  <p className="text-xs font-semibold text-primary">
                    {review.name}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
