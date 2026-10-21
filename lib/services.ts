export type Service = {
  id: string;
  title: string;
  description: string;
  items: string[];
  ctaText: string;
  ctaType: string;
  active: boolean;
  sortOrder: number;
};

export type CustomRequirement = {
  title: string;
  description: string;
  ctaText: string;
  ctaType: string;
  active: boolean;
  sortOrder: number;
};

export const services: Service[] = [
  {
    id: "academic-writing",
    title: "Academic Writing Services",
    description:
      "Help with a thesis, dissertation, chapters, or a presentation. Ask on WhatsApp for a price.",
    items: [
      "Thesis Writing - Complete thesis from scratch or chapter-wise assistance",
      "Dissertation Help - Research, writing, and formatting support",
      "Chapter-wise Writing - Individual chapters or complete projects",
      "PPT Creation - Professional presentations for your projects",
      "Plagiarism cleanup - rewrite overlapping text",
      "AI-writing cleanup - rewrite text that reads as machine-written",
    ],
    ctaText: "Inquire About Academic Services",
    ctaType: "whatsapp",
    active: true,
    sortOrder: 1,
  },
  {
    id: "development",
    title: "Websites and apps",
    description:
      "We also build websites and apps at affordable prices. Message on WhatsApp with what you need.",
    items: [
      "Websites",
      "Online stores",
      "Android and iOS apps",
      "Portals for students or staff",
      "Connecting an existing tool to your site",
      "Fixes after launch",
    ],
    ctaText: "Inquire About Development",
    ctaType: "whatsapp",
    active: true,
    sortOrder: 2,
  },
];

export const customRequirement: CustomRequirement = {
  title: "Custom Requirements?",
  description:
    "If the thing you need is not listed, message on WhatsApp and describe it.",
  ctaText: "Discuss Your Project",
  ctaType: "whatsapp",
  active: true,
  sortOrder: 3,
};

export function activeServices() {
  return services
    .filter((s) => s.active !== false)
    .sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999));
}
