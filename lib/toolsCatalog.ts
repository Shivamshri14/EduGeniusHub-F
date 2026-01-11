import type { ToolItem } from "./catalogTypes";

export const toolsCatalog: ToolItem[] = [
  {
    id: "turnitin-plag",
    title: "Turnitin Plagiarism Report",
    category: "Reports",
    description:
      "• Plagiarism detection report\n• Fast delivery on WhatsApp\n• Ideal for assignments, dissertation, thesis",
    price: 40,
    mrp: 100,
    billingPlanMonths: [1],
    imageUrl: "/tools/plag.png",
    active: true,
    featured: true,
    sortOrder: 10,

    // ✅ FIX
    accountTypes: ["Private Account"],
    
  },
  {
    id: "turnitin-ai",
    title: "Turnitin AI Report",
    category: "Reports",
    description:
      "• AI detection report\n• Fast delivery\n• Suitable for academic submissions",
    price: 50,
    mrp: 150,
    billingPlanMonths: [1],
    imageUrl: "/tools/ai.png",
    active: true,
    featured: true,
    sortOrder: 20,

    // ✅ FIX
    accountTypes: ["Private Account"],
    
  },
  {
    id: "turnitin-combo",
    title: "Turnitin Plagiarism + AI Combo",
    category: "Reports",
    description:
      "• Plagiarism + AI detection\n• Best value combo\n• Quick WhatsApp delivery",
    price: 80,
    mrp: 200,
    billingPlanMonths: [1],
    imageUrl: "/tools/plagai.png",
    active: true,
    featured: true,
    sortOrder: 30,

    // ✅ FIX
    accountTypes: ["Private Account"],
    
  },
  {
    id: "drillbit",
    title: "DrillBit Plagiarism Report",
    category: "Reports",
    description:
      "• Plagiarism + AI detection\n• Detailed report\n• Delivery on WhatsApp",
    price: 199,
    mrp: 500,
    billingPlanMonths: [1],
    imageUrl: "/tools/drillbit.jpg",
    active: true,
    featured: false,
    sortOrder: 40,

    // ✅ FIX
    accountTypes: ["Private Account"],
    
  },

  {
    id: "turnitin-student",
    title: "Turnitin Student Account",
    category: "Accounts",
    description:
      "• Student account for similarity checks\n• No AI report generated\n• Simple and reliable for academic work",
    price: 199,
    mrp: 499,
    billingPlanMonths: [1],
    imageUrl: "/tools/turnitin.jpg",
    active: true,
    featured: true,
    sortOrder: 110,

    // ✅ FIX
    accountTypes: ["Mail Access Account"],
    
  },
  {
    id: "quillbot-premium",
    title: "QuillBot Premium",
    category: "Accounts",
    description:
      "• Paraphrase + Summarizer\n• Premium writing modes\n• Student-friendly pricing",
    price: 149,
    mrp: 499,
    billingPlanMonths: [1],
    imageUrl:
      "https://www.01net.com/en/app/uploads/2023/11/How-to-Unblock-Quillbot.jpg",
    active: true,
    featured: true,
    sortOrder: 120,

    // ✅ FIX
    accountTypes: ["Shared Account"],
    
  },
  {
    id: "grammarly-premium",
    title: "Grammarly Premium",
    category: "Accounts",
    description:
      "• Grammar + Clarity + Tone\n• Advanced writing suggestions\n• Perfect for professionals",
    price: 299,
    mrp: 499,
    billingPlanMonths: [1],
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtjY30W4pwsQahrIg_Pq8y3mFjLfGq_PKITQ&s",
    active: true,
    featured: false,
    sortOrder: 130,

    // ✅ FIX
    accountTypes: ["Shared Account"],
    
  },
  {
    id: "chatgpt-plus",
    title: "ChatGPT Plus Access",
    category: "Accounts",
    description:
      "• Advanced AI for writing, coding, research\n• Faster responses\n• Priority access",
    price: 299,
    mrp: 999,
    billingPlanMonths: [1],
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRscoFVJSrm9By0t5KD4zdRr0DBpb-oOidVUg&s",
    active: true,
    featured: true,
    sortOrder: 140,

    // ✅ FIX
    accountTypes: ["Private Account"],
    
  },

  {
    id: "netflix-premium",
    title: "Netflix Premium",
    category: "OTT",
    description: "• Unlimited streaming\n• HD/4K plan\n• OTP based login",
    price: 149,
    mrp: 649,
    billingPlanMonths: [1],
    imageUrl:
      "https://www.logoai.com/uploads/articles/2025/04/23/banner-1712644978-1745388914.jpg",
    active: true,
    featured: false,
    sortOrder: 210,

    // ✅ FIX
    accountTypes: ["Shared Account"],
    
  },
  {
    id: "prime-video",
    title: "Amazon Prime Video",
    category: "OTT",
    description:
      "• Latest movies & shows\n• Family entertainment\n• Easy activation",
    pricingText: "Inquire Now",
    billingPlanMonths: [1],
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png",
    active: true,
    featured: false,
    sortOrder: 220,

    // ✅ FIX
    accountTypes: ["Shared Account"],
    
  },

  {
    id: "ai-removal",
    title: "AI Removal / Humanization",
    category: "Services",
    description:
      "• Make AI text look natural\n• Maintain meaning\n• Delivery on WhatsApp",
    pricingText: "Inquire Now",
    billingPlanMonths: [1],
    imageUrl: "https://otl.du.edu/wp-content/uploads/2023/04/Screenshot-2024-05-10-at-10.29.49%E2%80%AFAM-768x529.png",
    active: true,
    featured: false,
    sortOrder: 310,

    // ✅ FIX
    accountTypes: ["Private Account"],
    
  },
];

export function toolsCatalogActive() {
  return toolsCatalog
    .filter((t) => t.active)
    .sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999));
}

export function featuredToolsCatalog() {
  return toolsCatalogActive().filter((t) => t.featured);
}
