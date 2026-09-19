"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { activeReviews } from "@/lib/catalog";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<any[]>(() => activeReviews());

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.reviews) && data.reviews.length > 0) {
          setReviews(data.reviews);
        }
      })
      .catch((err) => {
        console.warn('Failed to load reviews from DB:', err);
      });
  }, []);

  if (reviews.length === 0) return null;

  const getImageSrc = (url?: string) => {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('/assets/')) return url;
    if (url.startsWith('/')) return `/assets${url}`;
    return `/assets/${url}`;
  };

  return (
    <section className="py-16 sm:py-20 bg-muted/30 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-6 w-6 sm:h-8 sm:w-8 fill-yellow-500 text-yellow-500"
              />
            ))}
          </div>

          <h2 className="mb-3 text-2xl sm:text-3xl font-black text-foreground">
            Trusted by Thousands
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">See what our customers say about us</p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <Card
              key={review.id}
              className="overflow-hidden border-border bg-card hover:border-primary/30 transition-all hover:shadow-md"
            >
              <CardContent className="p-0">
                {getImageSrc(review.imageUrl || review.image_url) ? (
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={getImageSrc(review.imageUrl || review.image_url)!}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="p-6 bg-muted/20 border-b border-border min-h-[140px] flex items-center justify-center text-center">
                    <p className="text-sm italic text-muted-foreground font-medium">&ldquo;{review.quote}&rdquo;</p>
                  </div>
                )}
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

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-sm text-muted-foreground">See thousands of satisfied customers</p>
        </div>
      </div>
    </section>
  );
}
