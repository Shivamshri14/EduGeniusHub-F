import Image from "next/image";

export type ReviewItem = {
  id: string;
  imageUrl: string;
  caption?: string;
  rating?: number;
  reviewerName?: string;
  reviewText?: string;
};

function Stars({ rating = 5 }: { rating?: number }) {
  const r = Math.max(0, Math.min(5, Math.round(rating || 0)));
  return (
    <div className="flex justify-center gap-1 mb-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < r ? "text-yellow-400" : "text-slate-500"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function ReviewsSection({ reviews }: { reviews: ReviewItem[] }) {
  if (!reviews?.length) return null;
  const top = reviews.slice(0, 3);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Stars rating={5} />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            See what our customers say about delivery speed and authentic reports.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {top.map((r) => (
            <div
              key={r.id}
              className="bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="relative h-64 bg-slate-900">
                <Image
                  src={r.imageUrl}
                  alt={r.caption || "review"}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div className="p-6">
                <Stars rating={r.rating || 5} />
                <p className="text-slate-200 text-sm leading-relaxed mb-4">
                  {r.reviewText || r.caption || "Great experience."}
                </p>
                <div className="text-slate-400 text-sm font-semibold">
                  {r.reviewerName || "Verified Customer"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
