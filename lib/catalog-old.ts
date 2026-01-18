// Auto-merged catalog file (reviews + services + tools + config + whatsapp-message + deals)

// -------------------- config.ts --------------------
export const SITE = {
  brand: "EduGenius Hub",
  phoneDisplay: "+91 87662 53356",
  phoneE164: "918766253356",
  whatsappCommunityUrl: "https://chat.whatsapp.com/FtMZUM8Ql41IkUXSmw3pBU",
  instagramUrl: "https://www.instagram.com/turnitin__plagiarism",
};

// -------------------- reviews.ts --------------------
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

// -------------------- services.ts --------------------
export const services = [
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

export const customRequirement = {
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

// -------------------- tools.ts --------------------
export type PlanType = "Month" | "Year";
export type AccountType = "private" | "shared";

export type Tool = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  officialUrl: string;
  image: string;
  marketPrice: number;
  ourPrice: number;
  category: "report" | "account" | "ott";
  planType: PlanType;
  accountType: AccountType;
};

export type ComboTool = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tools: string[];
  image: string;
  marketPrice: number;
  ourPrice: number;
  planType: PlanType;
};

export const TOOLS: Tool[] = [
  {
    id: "turnitin-plag",
    name: "Turnitin Plagiarism Report",
    tagline: "Plagiarism detection reports.",
    description: "Generate plagiarism detection of documents.",
    officialUrl: "https://turnitin.com",
    image: "/tools/plag.png",
    marketPrice: 100,
    ourPrice: 40,
    category: "report",
    planType: "Month",
    accountType: "private",
  },
  {
    id: "turnitin-combo",
    name: "Turnitin Plagiarism and Ai Report",
    tagline: "Plagiarism & AI detection reports.",
    description: "Generate plagiarism/AI detection of documents.",
    officialUrl: "https://turnitin.com",
    image: "/tools/plagai.png",
    marketPrice: 250,
    ourPrice: 150,
    category: "report",
    planType: "Month",
    accountType: "private",
  },
  {
    id: "drillbit",
    name: "DrillBit Plagiarism Report",
    tagline: "Plagiarism & AI detection reports.",
    description: "Generate plagiarism/AI detection of documents.",
    officialUrl: "https://drillbitplagiarism.com",
    image: "/tools/drillbit.jpg",
    marketPrice: 500,
    ourPrice: 299,
    category: "report",
    planType: "Month",
    accountType: "private",
  },
  {
    id: "turnitin-student",
    name: "Turnitin Student Account",
    tagline:
      "Check plagiarism like a pro. No ai report is genrated in student account",
    description:
      "Student account only for Plagisarism/Similarity checks. Simple and reliable for academic work.",
    officialUrl: "https://www.turnitin.com",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3HLwpgg_EEEqDYfucJ5ama3YWxNf8kjBm_Q&s",
    marketPrice: 1499,
    ourPrice: 799,
    category: "account",
    planType: "Month",
    accountType: "private",
  },
  {
    id: "quillbot-premium",
    name: "QuillBot Premium",
    tagline: "Paraphrase, summarize, write faster.",
    description: "Premium rewriting modes, summarizer, and grammar tools.",
    officialUrl: "https://quillbot.com",
    image:
      "https://www.01net.com/en/app/uploads/2023/11/How-to-Unblock-Quillbot.jpg",
    marketPrice: 499,
    ourPrice: 149,
    category: "account",
    planType: "Month",
    accountType: "shared",
  },
  {
    id: "grammarly-premium",
    name: "Grammarly Premium",
    tagline: "Fix grammar & enhance clarity.",
    description:
      "Advanced grammar, tone, and clarity suggestions for writing that impresses.",
    officialUrl: "https://www.grammarly.com",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtjY30W4pwsQahrIg_Pq8y3mFjLfGq_PKITQ&s",
    marketPrice: 499,
    ourPrice: 299,
    category: "account",
    planType: "Month",
    accountType: "shared",
  },
  {
    id: "chatgpt-plus",
    name: "ChatGPT (Plus Access)",
    tagline: "Advanced AI for writing, coding, research.",
    description: "Access powerful AI to draft, code, analyze, and brainstorm.",
    officialUrl: "https://chat.openai.com",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRscoFVJSrm9By0t5KD4zdRr0DBpb-oOidVUg&s",
    marketPrice: 999,
    ourPrice: 299,
    category: "account",
    planType: "Month",
    accountType: "shared",
  },
  {
    id: "stealthwriter",
    name: "StealthWriter",
    tagline: "Make AI text look human-written.",
    description: "Humanize AI-generated text to bypass style detectors.",
    officialUrl: "https://app.stealthwriter.ai/auth/login",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOyNrycW5jlNDMGTW8TZ5unF25TZGjZGtMZg&s",
    marketPrice: 1500,
    ourPrice: 999,
    category: "account",
    planType: "Month",
    accountType: "shared",
  },
  {
    id: "writehuman-ai",
    name: "Writehuman AI",
    tagline: "Make AI text look human-written.",
    description: "Humanize AI-generated text to bypass style detectors.",
    officialUrl: "https://writehuman.ai/",
    image: "https://media.theresanaiforthat.com/writehuman.png",
    marketPrice: 1499,
    ourPrice: 449,
    category: "account",
    planType: "Month",
    accountType: "shared",
  },
  {
    id: "perplexity-ai",
    name: "Perplexity AI (Yearly Price)",
    tagline: "Instant factual answers with sources.",
    description: "Ask anything and get precise answers with citations.",
    officialUrl: "https://www.perplexity.ai",
    image: "https://brytesoft.com/media/catalog/product/p/e/perplexity_pro.png",
    marketPrice: 2000,
    ourPrice: 799,
    category: "account",
    planType: "Year",
    accountType: "shared",
  },
  {
    id: "netflix-premium",
    name: "Netflix Premium",
    tagline: "Unlimited HD/4K streaming.",
    description: "OTP based login",
    officialUrl: "https://www.netflix.com",
    image:
      "https://www.logoai.com/uploads/articles/2025/04/23/banner-1712644978-1745388914.jpg",
    marketPrice: 649,
    ourPrice: 149,
    category: "ott",
    planType: "Month",
    accountType: "shared",
  },
  {
    id: "prime-video",
    name: "Amazon Prime Video",
    tagline: "Latest movies & exclusive shows.",
    description: "Shared ID and Password based login",
    officialUrl: "https://www.primevideo.com",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXyLNwBktHQkq8BFxyOXLwmVMhCD2s3gbmYw&s",
    marketPrice: 499,
    ourPrice: 49,
    category: "ott",
    planType: "Month",
    accountType: "shared",
  },
  {
    id: "zee5-premium",
    name: "ZEE5 Premium (1080p) (Yearly Price)",
    tagline: "Latest movies & exclusive shows.",
    description: "Private Account on your number - 12 months subscription",
    officialUrl: "https://www.zee5.com",
    image:
      "https://pnghdpro.com/wp-content/themes/pnghdpro/download/social-media-and-brands/zee5-logo-hd.png",
    marketPrice: 499,
    ourPrice: 299,
    category: "ott",
    planType: "Year",
    accountType: "private",
  },
  {
    id: "sonyliv-premium",
    name: "Sony Liv Premium (4K) (Yearly Price)",
    tagline: "Latest movies & exclusive shows.",
    description: "Private Account on your number - 12 months subscription",
    officialUrl: "https://www.sonyliv.com",
    image: "https://www.bizasialive.com/wp-content/uploads/2020/05/899ec721-sonylivnew001.jpg",
    marketPrice: 499,
    ourPrice: 299,
    category: "ott",
    planType: "Year",
    accountType: "private",
  },
  {
    id: "jenni-ai",
    name: "Jenni AI",
    tagline: "Helps in assisting writing essays and articles.",
    description: "It Helps in assignment writing.",
    officialUrl: "https://app.jenni.ai/",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3UxmWxJPAKz272Dp3FxLnC2Z_w0cBORMM_w&s",
    marketPrice: 2000,
    ourPrice: 449,
    category: "account",
    planType: "Month",
    accountType: "shared",
  },
  {
    id: "canva-pro",
    name: "Canva Pro/EDU Account (Yearly Price)",
    tagline: "Design like a pro.",
    description:
      "Premium templates but brand kits are not available in EDU account of Canva.",
    officialUrl: "https://www.canva.com",
    image:
      "https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxo4K81Ei7WzcnqEk8W.MgwZFE_jBn46Q0eZmYS1jqh9hsP2yct.ANJrdxy.La13GX7IADGcPOztqti6H6DAjzvg-&format=source",
    marketPrice: 1500,
    ourPrice: 99,
    category: "account",
    planType: "Year",
    accountType: "shared",
  },
  {
    id: "request-new-tool",
    name: "Request a New Tool",
    tagline: "Tell us what you need.",
    description: "Message us your desired tool and we'll try to add it.",
    officialUrl: "#",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFOXhn7CwrVEhvT-lFg3YNbLWHoEEUpXZvIg&s",
    marketPrice: 0,
    ourPrice: 0,
    category: "account",
    planType: "Month",
    accountType: "private",
  },
];

export const COMBO_TOOLS: ComboTool[] = [
  {
    id: "student-essentials",
    name: "Student Essentials Combo",
    tagline: "Everything you need for academic success.",
    description:
      "Get Turnitin Student + QuillBot Premium + Grammarly Premium in one discounted bundle.",
    tools: ["Turnitin-instructor", "QuillBot Premium", "Grammarly Premium"],
    image:
      "https://t4.ftcdn.net/jpg/05/36/10/23/360_F_536102364_DwSdM6aQ6nuS4wOGsZN3dncYZ0I0VKYP.jpg",
    marketPrice: 2000,
    ourPrice: 999,
    planType: "Month",
  },
  {
    id: "ai-writer-pro",
    name: "AI Writer Pro Combo",
    tagline: "Complete AI writing toolkit.",
    description:
      "ChatGPT Pro + StealthWriter + Perplexity AI for all your content needs.",
    tools: ["ChatGPT Pro", "StealthWriter", "Perplexity AI"],
    image:
      "https://t4.ftcdn.net/jpg/05/36/10/23/360_F_536102364_DwSdM6aQ6nuS4wOGsZN3dncYZ0I0VKYP.jpg",
    marketPrice: 5500,
    ourPrice: 2499,
    planType: "Month",
  },
  {
    id: "entertainment-bundle",
    name: "Entertainment Bundle",
    tagline: "Unlimited streaming at best price.",
    description: "Netflix Premium + Amazon Prime Video together.",
    tools: ["Netflix Premium", "Amazon Prime Video"],
    image:
      "https://t4.ftcdn.net/jpg/05/36/10/23/360_F_536102364_DwSdM6aQ6nuS4wOGsZN3dncYZ0I0VKYP.jpg",
    marketPrice: 499,
    ourPrice: 199,
    planType: "Month",
  },
  {
    id: "complete-package",
    name: "Complete Academic Package",
    tagline: "All tools, maximum savings.",
    description:
      "Get ALL our academic tools in one ultimate bundle. Turnitin, QuillBot, Grammarly, ChatGPT, and more!",
    tools: ["Customise as needed"],
    image:
      "https://t4.ftcdn.net/jpg/05/36/10/23/360_F_536102364_DwSdM6aQ6nuS4wOGsZN3dncYZ0I0VKYP.jpg",
    marketPrice: 12000,
    ourPrice: 1999,
    planType: "Month",
  },
];

export async function getTools(): Promise<Tool[]> {
  return TOOLS;
}

export async function getToolById(
  id: string,
): Promise<Tool | ComboTool | undefined> {
  return TOOLS.find((t) => t.id === id) || COMBO_TOOLS.find((c) => c.id === id);
}

// -------------------- whatsapp-message.ts --------------------
export function waOrderMessage(toolName: string, price?: number) {
  let base = "Hello EduGeniusHub, I want " + toolName;
  if (price !== undefined && price > 0) {
    base += " (Price: ₹" + price + ")";
  }
  base += ". Please share details.";
  return encodeURIComponent(base);
}

export function waDirectLink(
  toolName?: string,
  price?: number,
  phoneE164?: string,
) {
  const to = phoneE164 || SITE.phoneE164;
  const msg = toolName
    ? waOrderMessage(toolName, price)
    : encodeURIComponent("Hello EduGeniusHub, I have a query.");
  return `https://wa.me/${to}?text=${msg}`;
}

export function waComboInquiryLink(combo: ComboTool, phoneE164?: string) {
  return waDirectLink(`Combo: ${combo.name}`, combo.ourPrice, phoneE164);
}

// -------------------- deals.ts --------------------
// Inline DealItem type to remove external import (originally from ./catalogTypes)
export type DealItem = {
  id: string;
  title: string;
  flashText?: string;
  validTill: string; // YYYY-MM-DD
  toolId?: string;
  comboId?: string;
  active: boolean;
  sortOrder?: number;
};

export const deals: DealItem[] = [
  {
    id: "deal-turnitin-combo",
    title: "Turnitin Plagiarism + AI Combo",
    flashText: "Limited time offer",
    validTill: "2026-12-31",
    toolId: "turnitin-combo",
    active: true,
    sortOrder: 10,
  },
  {
    id: "deal-writing-pro",
    title: "Writing Pro Combo",
    flashText: "Limited time offer",
    validTill: "2026-12-31",
    comboId: "combo-writing-pro",
    active: true,
    sortOrder: 20,
  },
];

export function activeDeals() {
  const now = new Date();
  return deals
    .filter((d) => d.active)
    .filter((d) => {
      const till = new Date(d.validTill);
      return !Number.isNaN(till.getTime()) && till.getTime() >= now.getTime();
    })
    .sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999))
    .slice(0, 2);
}
