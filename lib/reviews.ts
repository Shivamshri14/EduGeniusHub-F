export type ReviewItem = {
  id: string;
  imageUrl: string;
  name: string;
  quote: string;
  active: boolean;
  sortOrder?: number;
};

export const reviews: ReviewItem[] = [
  {
    id: "r1",
    imageUrl: "/reviews/review1.jpg",
    name: "Student from Delhi",
    quote:
      "Fast delivery and excellent support! Got my ChatGPT subscription within 5 minutes.",
    active: true,
    sortOrder: 1,
  },
  {
    id: "r2",
    imageUrl: "/reviews/review2.jpg",
    name: "PhD Scholar, Mumbai",
    quote:
      "Very reliable service. Using Turnitin and Grammarly for my thesis. Highly recommended!",
    active: true,
    sortOrder: 2,
  },
  {
    id: "r3",
    imageUrl: "/reviews/review3.jpg",
    name: "Working Professional",
    quote:
      "Amazing prices and instant response on WhatsApp. Best place for student subscriptions!",
    active: true,
    sortOrder: 3,
  },
];

export function activeReviews(): ReviewItem[] {
  return reviews
    .filter((r) => r.active)
    .sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999));
}
