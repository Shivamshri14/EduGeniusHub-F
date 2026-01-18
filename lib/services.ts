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
      "Professional assistance for all your academic writing needs with guaranteed quality and timely delivery.",
    items: [
      "Thesis Writing - Complete thesis from scratch or chapter-wise assistance",
      "Dissertation Help - Research, writing, and formatting support",
      "Chapter-wise Writing - Individual chapters or complete projects",
      "PPT Creation - Professional presentations for your projects",
      "Plagiarism Removal - Make your content 100% original",
      "AI Detection Removal - Humanize AI-generated content",
    ],
    ctaText: "Inquire About Academic Services",
    ctaType: "whatsapp",
    active: true,
    sortOrder: 1,
  },
  {
    id: "development",
    title: "Development Services",
    description:
      "Custom website and app development solutions tailored to your specific business needs.",
    items: [
      "Website Development - Modern, responsive websites for your business",
      "E-commerce Solutions - Online stores with payment integration",
      "Mobile Apps - iOS and Android app development",
      "Custom Portals - Student/employee management systems",
      "API Integration - Connect your systems seamlessly",
      "Maintenance & Support - Ongoing technical support",
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
    "Have a specific project in mind? Whether it's a unique tool subscription, custom academic work, or a special development project - we've got you covered. Contact us to discuss your requirements!",
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
