export type TestimonialItem = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
};

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Rahul S.',
    role: 'B.Tech Student, Delhi',
    quote: 'Got my Turnitin report within 10 minutes. Absolutely amazing service and super affordable. Will use again!',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Priya M.',
    role: 'PhD Scholar, Mumbai',
    quote: 'Using QuillBot and Grammarly from EduGenius Hub for my thesis. The combo deal saved me so much money!',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Ankit V.',
    role: 'MBA Student, Pune',
    quote: 'ChatGPT Plus at such a low price — I was skeptical at first but it works perfectly. Support on WhatsApp is instant.',
    rating: 5,
  },
  {
    id: 't4',
    name: 'Sneha K.',
    role: 'Working Professional, Bangalore',
    quote: 'Netflix and Prime Video combo for just ₹199 — best deal I have found online. Highly recommended!',
    rating: 5,
  },
  {
    id: 't5',
    name: 'Deepak R.',
    role: 'Research Scholar, Hyderabad',
    quote: 'Paperpal Premium helped me polish my research paper. Got it delivered in 15 minutes. Great service!',
    rating: 5,
  },
  {
    id: 't6',
    name: 'Kavya T.',
    role: 'UG Student, Chennai',
    quote: 'The team is super responsive on WhatsApp. Solved my issue within minutes. Five stars for sure!',
    rating: 5,
  },
];

export const TRUST_STATS = {
  reports_delivered: '12000+',
  students_served: '5000+',
  satisfaction: '99%',
  response_time: '< 2 mins',
};
