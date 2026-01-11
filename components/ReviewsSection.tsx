import Image from "next/image";
import { activeReviews } from "@/lib/reviews";
import { siteConfig } from "@/lib/siteConfig";  

function isExternal(src: string) {
  return /^https?:\/\//.test(src);
}

export function ReviewsSection() {
  const reviews = activeReviews();
  if (!reviews.length) return null;

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Trusted by Thousands
          </h2>
          <p className="text-slate-300">
            Real reviews from real customers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {reviews.slice(0, 3).map((r) => (
            <div
              key={r.id}
              className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-sm"
            >
              {/* FIXED IMAGE BOX */}
              <div className="relative w-full aspect-[4/5] bg-black/20">
                {isExternal(r.imageUrl) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={r.imageUrl}
                    alt="Review"
                    className="h-full w-full object-contain p-3"
                    loading="lazy"
                  />
                ) : (
                  <Image
                    src={r.imageUrl}
                    alt="Review"
                    fill
                    className="object-contain p-3"
                  />
                )}
              </div>
              <div className="p-4">
                <p className="text-sm text-slate-200 leading-relaxed">
                  “{r.quote}”
                </p>
                <p className="text-xs text-slate-400 mt-3 font-medium">
                  — {r.name}
                </p>
              </div>

            </div>

          ))}
        </div>
        <div className="text-center mt-8">
          <p className="text-slate-300 mb-4">Join thousands of satisfied customers</p>
          <a
            href={siteConfig.whatsappChatLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors font-semibold"
          >
            Start Your Order
          </a>
        </div>

      </div>
    </section>
  );
}
