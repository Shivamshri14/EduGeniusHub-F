export type Tool = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  officialUrl: string;
  image: string;
  marketPrice: number;
  ourPrice: number;
  category: 'report' | 'account' | 'ott';
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
    category: 'report'
  },
  {
    id: "turnitin-ai",
    name: "Turnitin Ai Report",
    tagline: "AI detection reports.",
    description: "Generate AI detection of documents.",
    officialUrl: "https://turnitin.com",
    image: "/tools/ai.png",
    marketPrice: 150,
    ourPrice: 50,
    category: 'report'
  },
  {
    id: "turnitin-combo",
    name: "Turnitin Plagiarism and Ai Report",
    tagline: "Plagiarism & AI detection reports.",
    description: "Generate plagiarism/AI detection of documents.",
    officialUrl: "https://turnitin.com",
    image: "/tools/plagai.png",
    marketPrice: 200,
    ourPrice: 80,
    category: 'report'
  },
  {
    id: "drillbit",
    name: "DrillBit Plagiarism Report",
    tagline: "Plagiarism & AI detection reports.",
    description: "Generate plagiarism/AI detection of documents.",
    officialUrl: "https://drillbitplagiarism.com",
    image: "/tools/drillbit.jpg",
    marketPrice: 500,
    ourPrice: 199,
    category: 'report'
  },
  {
    id: "turnitin-student",
    name: "Turnitin Student Account",
    tagline: "Check plagiarism like a pro. No ai report is genrated in student account",
    description: "Student account only for Plagisarism/Similarity checks. Simple and reliable for academic work.",
    officialUrl: "https://www.turnitin.com",
    image: "/tools/turnitin.jpg",
    marketPrice: 499,
    ourPrice: 199,
    category: 'account'
  },
  {
    id: "turnitin-instructor",
    name: " 𝗧𝘂𝗿𝗻𝗶𝘁𝗶𝗻𝗗𝗲𝘁𝗲𝗰𝘁 / 𝗜𝗻𝘀𝘁𝗿𝘂𝗰𝘁𝗼𝗿 𝗔𝗰𝗰𝗼𝘂𝗻𝘁",
    tagline: "Plagiarism + AI report.",
    description: " API-based Account – Connected directly to Turnitin's official server just Different interface but same Turnitin report",
    officialUrl: "https://www.turndetect.com",
    image: "/tools/turndetect.jpeg",
    marketPrice: 499,
    ourPrice: 249,
    category: 'account'
  },
  {
    id: "quillbot-premium",
    name: "QuillBot Premium",
    tagline: "Paraphrase, summarize, write faster.",
    description: "Premium rewriting modes, summarizer, and grammar tools.",
    officialUrl: "https://quillbot.com",
    image: "https://cdn-iddod.nitrocdn.com/pfdvReMUBzCUteBdCpoKYlDKsvtOTIJl/assets/images/optimized/rev-c127345/creatorwala.in/wp-content/uploads/2023/02/quillbot_1-8.png",
    marketPrice: 499,
    ourPrice: 149,
    category: 'account'
  },
  {
    id: "grammarly-premium",
    name: "Grammarly Premium",
    tagline: "Fix grammar & enhance clarity.",
    description: "Advanced grammar, tone, and clarity suggestions for writing that impresses.",
    officialUrl: "https://www.grammarly.com",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtjY30W4pwsQahrIg_Pq8y3mFjLfGq_PKITQ&s",
    marketPrice: 499,
    ourPrice: 299,
    category: 'account'
  },
  {
    id: "chatgpt-plus",
    name: "ChatGPT (Plus Access)",
    tagline: "Advanced AI for writing, coding, research.",
    description: "Access powerful AI to draft, code, analyze, and brainstorm.",
    officialUrl: "https://chat.openai.com",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRscoFVJSrm9By0t5KD4zdRr0DBpb-oOidVUg&s",
    marketPrice: 999,
    ourPrice: 299,
    category: 'account'
  },
  {
    id: "stealthwriter",
    name: "StealthWriter",
    tagline: "Make AI text look human-written.",
    description: "Humanize AI-generated text to bypass style detectors.",
    officialUrl: "https://app.stealthwriter.ai/auth/login",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOyNrycW5jlNDMGTW8TZ5unF25TZGjZGtMZg&s",
    marketPrice: 1500,
    ourPrice: 999,
    category: 'account'
  },
  {
    id: "writehuman-ai",
    name: "Writehuman AI",
    tagline: "Make AI text look human-written.",
    description: "Humanize AI-generated text to bypass style detectors.",
    officialUrl: "https://writehuman.ai/",
    image: "https://media.theresanaiforthat.com/writehuman.png",
    marketPrice: 1499,
    ourPrice: 349,
    category: 'account'
  },
  {
    id: "perplexity-ai",
    name: "Perplexity AI (Yearly Price)",
    tagline: "Instant factual answers with sources.",
    description: "Ask anything and get precise answers with citations.",
    officialUrl: "https://www.perplexity.ai",
    image: "https://1000logos.net/wp-content/uploads/2024/08/Perplexity-Logo.png",
    marketPrice: 2000,
    ourPrice: 799,
    category: 'account'
  },
  {
    id: "netflix-premium",
    name: "Netflix Premium",
    tagline: "Unlimited HD/4K streaming.",
    description: "OTP based login",
    officialUrl: "https://www.netflix.com",
    image: "https://www.logoai.com/uploads/articles/2025/04/23/banner-1712644978-1745388914.jpg",
    marketPrice: 649,
    ourPrice: 149,
    category: 'ott'
  },
  {
    id: "prime-video",
    name: "Amazon Prime Video",
    tagline: "Latest movies & exclusive shows.",
    description: "Shared ID and Password based login",
    officialUrl: "https://www.primevideo.com",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXyLNwBktHQkq8BFxyOXLwmVMhCD2s3gbmYw&s",
    marketPrice: 499,
    ourPrice: 49,
    category: 'ott'
  },
  {
    id: "zee5-premium",
    name: "ZEE5 Premium (1080p) (Yearly Price)",
    tagline: "Latest movies & exclusive shows.",
    description: "Private Account on your number - 12 months subscription",
    officialUrl: "https://www.zee5.com",
    image: "https://pnghdpro.com/wp-content/themes/pnghdpro/download/social-media-and-brands/zee5-logo-hd.png",
    marketPrice: 499,
    ourPrice: 299,
    category: 'ott'
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
    category: 'ott'
  },
  {
    id: "jenni-ai",
    name: "Jenni AI",
    tagline: "Helps in assisting writing essays and articles.",
    description: "It Helps in assignment writing.",
    officialUrl: "https://app.jenni.ai/",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3UxmWxJPAKz272Dp3FxLnC2Z_w0cBORMM_w&s",
    marketPrice: 2000,
    ourPrice: 449,
    category: 'account'
  },
  {
    id: "canva-pro",
    name: "Canva Pro/EDU Account (Yearly Price)",
    tagline: "Design like a pro.",
    description: "Premium templates but brand kits are not available in EDU account of Canva.",
    officialUrl: "https://www.canva.com",
    image: "https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxo4K81Ei7WzcnqEk8W.MgwZFE_jBn46Q0eZmYS1jqh9hsP2yct.ANJrdxy.La13GX7IADGcPOztqti6H6DAjzvg-&format=source",
    marketPrice: 1500,
    ourPrice: 99,
    category: 'account'
  },
  {
    id: "request-new-tool",
    name: "Request a New Tool",
    tagline: "Tell us what you need.",
    description: "Message us your desired tool and we'll try to add it.",
    officialUrl: "#",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFOXhn7CwrVEhvT-lFg3YNbLWHoEEUpXZvIg&s",
    marketPrice: 0,
    ourPrice: 0,
    category: 'account'
  },
];

export const COMBO_TOOLS: ComboTool[] = [
  {
    id: "student-essentials",
    name: "Student Essentials Combo",
    tagline: "Everything you need for academic success.",
    description: "Get Turnitin Student + QuillBot Premium + Grammarly Premium in one discounted bundle.",
    tools: ["Turnitin-instructor", "QuillBot Premium", "Grammarly Premium"],
    image: "https://t4.ftcdn.net/jpg/05/36/10/23/360_F_536102364_DwSdM6aQ6nuS4wOGsZN3dncYZ0I0VKYP.jpg",
    marketPrice: 2000,
    ourPrice: 599
  },
  {
    id: "ai-writer-pro",
    name: "AI Writer Pro Combo",
    tagline: "Complete AI writing toolkit.",
    description: "ChatGPT Pro + StealthWriter + Perplexity AI for all your content needs.",
    tools: ["ChatGPT Pro", "StealthWriter", "Perplexity AI"],
    image: "https://t4.ftcdn.net/jpg/05/36/10/23/360_F_536102364_DwSdM6aQ6nuS4wOGsZN3dncYZ0I0VKYP.jpg",
    marketPrice: 5500,
    ourPrice: 2499
  },
  {
    id: "entertainment-bundle",
    name: "Entertainment Bundle",
    tagline: "Unlimited streaming at best price.",
    description: "Netflix Premium + Amazon Prime Video together.",
    tools: ["Netflix Premium", "Amazon Prime Video"],
    image: "https://t4.ftcdn.net/jpg/05/36/10/23/360_F_536102364_DwSdM6aQ6nuS4wOGsZN3dncYZ0I0VKYP.jpg",
    marketPrice: 499,
    ourPrice: 199
  },
  {
    id: "complete-package",
    name: "Complete Academic Package",
    tagline: "All tools, maximum savings.",
    description: "Get ALL our academic tools in one ultimate bundle. Turnitin, QuillBot, Grammarly, ChatGPT, and more!",
    tools: ["Customise as needed"],
    image: "https://t4.ftcdn.net/jpg/05/36/10/23/360_F_536102364_DwSdM6aQ6nuS4wOGsZN3dncYZ0I0VKYP.jpg",
    marketPrice: 12000,
    ourPrice: 1999
  }
];
