export type PlanType = "Monthly" | "Yearly";
export type AccountType = "private" | "shared" | "mail access";
export type DurationValue = number;
export type DurationType = "months" | "years";

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
  durationValue?: DurationValue;
  durationType?: DurationType;
  display?: boolean;
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
  displayCombo?: boolean;
};

const DEFAULT_IMAGE = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3HLwpgg_EEEqDYfucJ5ama3YWxNf8kjBm_Q&s";

export const TOOLS: Tool[] = [
  {
    id: "turnitin-plag",
    name: "Turnitin Plagiarism Report",
    tagline: "Plagiarism detection reports.",
    description: "Generate plagiarism detection of documents.",
    officialUrl: "https://turnitin.com",
    image: DEFAULT_IMAGE,
    marketPrice: 100,
    ourPrice: 40,
    category: "report",
    planType: "Monthly",
    accountType: "private",
    display: true,
  },
  {
    id: "turnitin-combo",
    name: "Turnitin Plagiarism and Ai Report",
    tagline: "Plagiarism & AI detection reports.",
    description: "Generate plagiarism/AI detection of documents.",
    officialUrl: "https://turnitin.com",
    image: DEFAULT_IMAGE,
    marketPrice: 250,
    ourPrice: 150,
    category: "report",
    planType: "Monthly",
    accountType: "private",
    display: true,
  },
  {
    id: "drillbit",
    name: "DrillBit Plagiarism Report",
    tagline: "Plagiarism & AI detection reports.",
    description: "Generate plagiarism/AI detection of documents.",
    officialUrl: "https://drillbitplagiarism.com",
    image: DEFAULT_IMAGE,
    marketPrice: 500,
    ourPrice: 299,
    category: "report",
    planType: "Monthly",
    accountType: "private",
    display: false,
  },
  {
    id: "turnitin-student",
    name: "Turnitin Student Account",
    tagline:
      "Check plagiarism like a pro. No ai report is genrated in student account",
    description:
      "Student account only for Plagisarism/Similarity checks. Simple and reliable for academic work.",
    officialUrl: "https://www.turnitin.com",
    image: DEFAULT_IMAGE,
    marketPrice: 1499,
    ourPrice: 799,
    category: "account",
    planType: "Monthly",
    accountType: "private",
    display: true,
  },
  {
    id: "quillbot-premium",
    name: "QuillBot Premium",
    tagline: "Paraphrase, summarize, write faster.",
    description: "Premium rewriting modes, summarizer, and grammar tools.",
    officialUrl: "https://quillbot.com",
    image: DEFAULT_IMAGE,
    marketPrice: 499,
    ourPrice: 149,
    category: "account",
    planType: "Monthly",
    accountType: "shared",
    display: true,
  },
  {
    id: "grammarly-premium",
    name: "Grammarly Premium",
    tagline: "Fix grammar & enhance clarity.",
    description:
      "Advanced grammar, tone, and clarity suggestions for writing that impresses.",
    officialUrl: "https://www.grammarly.com",
    image: DEFAULT_IMAGE,
    marketPrice: 499,
    ourPrice: 299,
    category: "account",
    planType: "Monthly",
    accountType: "shared",
    display: true,
  },
  {
    id: "chatgpt-plus",
    name: "ChatGPT (Plus Access)",
    tagline: "Advanced AI for writing, coding, research.",
    description: "Access powerful AI to draft, code, analyze, and brainstorm.",
    officialUrl: "https://chat.openai.com",
    image: DEFAULT_IMAGE,
    marketPrice: 999,
    ourPrice: 299,
    category: "account",
    planType: "Monthly",
    accountType: "shared",
    display: true,
  },
  {
    id: "stealthwriter",
    name: "StealthWriter",
    tagline: "Make AI text look human-written.",
    description: "Humanize AI-generated text to bypass style detectors.",
    officialUrl: "https://app.stealthwriter.ai/auth/login",
    image: DEFAULT_IMAGE,
    marketPrice: 1500,
    ourPrice: 999,
    category: "account",
    planType: "Monthly",
    accountType: "shared",
    durationValue: 3,
    durationType: "months",
    display: true,
  },
  {
    id: "writehuman-ai",
    name: "Writehuman AI",
    tagline: "Make AI text look human-written.",
    description: "Humanize AI-generated text to bypass style detectors.",
    officialUrl: "https://writehuman.ai/",
    image: DEFAULT_IMAGE,
    marketPrice: 1499,
    ourPrice: 449,
    category: "account",
    planType: "Monthly",
    accountType: "shared",
    display: true,
  },
  {
    id: "perplexity-ai",
    name: "Perplexity AI",
    tagline: "Instant factual answers with sources.",
    description: "Ask anything and get precise answers with citations.",
    officialUrl: "https://www.perplexity.ai",
    image: DEFAULT_IMAGE,
    marketPrice: 2000,
    ourPrice: 799,
    category: "account",
    planType: "Yearly",
    accountType: "shared",
    display: true,
  },
  {
    id: "netflix-premium",
    name: "Netflix Premium",
    tagline: "Unlimited HD/4K streaming.",
    description: "OTP based login",
    officialUrl: "https://www.netflix.com",
    image: DEFAULT_IMAGE,
    marketPrice: 649,
    ourPrice: 149,
    category: "ott",
    planType: "Monthly",
    accountType: "shared",
    display: true,
  },
  {
    id: "prime-video",
    name: "Amazon Prime Video",
    tagline: "Latest movies & exclusive shows.",
    description: "Shared ID and Password based login",
    officialUrl: "https://www.primevideo.com",
    image: DEFAULT_IMAGE,
    marketPrice: 499,
    ourPrice: 49,
    category: "ott",
    planType: "Monthly",
    accountType: "shared",
    display: true,
  },
  {
    id: "zee5-premium",
    name: "ZEE5 Premium (1080p)",
    tagline: "Latest movies & exclusive shows.",
    description: "Private Account on your number - 12 months subscription",
    officialUrl: "https://www.zee5.com",
    image: DEFAULT_IMAGE,
    marketPrice: 499,
    ourPrice: 299,
    category: "ott",
    planType: "Yearly",
    accountType: "private",
    display: true,
  },
  {
    id: "sonyliv-premium",
    name: "Sony Liv Premium (4K)",
    tagline: "Latest movies & exclusive shows.",
    description: "Private Account on your number - 12 months subscription",
    officialUrl: "https://www.sonyliv.com",
    image: DEFAULT_IMAGE,
    marketPrice: 499,
    ourPrice: 299,
    category: "ott",
    planType: "Yearly",
    accountType: "private",
    display: true,
  },
  {
    id: "jenni-ai",
    name: "Jenni AI",
    tagline: "Helps in assisting writing essays and articles.",
    description: "It Helps in assignment writing.",
    officialUrl: "https://app.jenni.ai/",
    image: DEFAULT_IMAGE,
    marketPrice: 2000,
    ourPrice: 449,
    category: "account",
    planType: "Monthly",
    accountType: "shared",
    display: true,
  },
  {
    id: "canva-pro",
    name: "Canva Pro/EDU Account",
    tagline: "Design like a pro.",
    description:
      "Premium templates but brand kits are not available in EDU account of Canva.",
    officialUrl: "https://www.canva.com",
    image: DEFAULT_IMAGE,
    marketPrice: 1500,
    ourPrice: 99,
    category: "account",
    planType: "Yearly",
    accountType: "shared",
    display: true,
  },
  {
    id: "request-new-tool",
    name: "Request a New Tool",
    tagline: "Tell us what you need.",
    description: "Message us your desired tool and we'll try to add it.",
    officialUrl: "#",
    image: DEFAULT_IMAGE,
    marketPrice: 0,
    ourPrice: 0,
    category: "account",
    planType: "Monthly",
    accountType: "private",
    display: true,
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
    image: DEFAULT_IMAGE,
    marketPrice: 2000,
    ourPrice: 999,
    planType: "Monthly",
    displayCombo: false,
  },
  {
    id: "ai-writer-pro",
    name: "AI Writer Pro Combo",
    tagline: "Complete AI writing toolkit.",
    description:
      "ChatGPT Pro + StealthWriter + Perplexity AI for all your content needs.",
    tools: ["ChatGPT Pro", "StealthWriter", "Perplexity AI"],
    image: DEFAULT_IMAGE,
    marketPrice: 5500,
    ourPrice: 2499,
    planType: "Monthly",
    displayCombo: false,
  },
  {
    id: "entertainment-bundle",
    name: "Entertainment Bundle",
    tagline: "Unlimited streaming at best price.",
    description: "Netflix Premium + Amazon Prime Video together.",
    tools: ["Netflix Premium", "Amazon Prime Video"],
    image: DEFAULT_IMAGE,
    marketPrice: 499,
    ourPrice: 199,
    planType: "Monthly",
    displayCombo: false,
  },
  {
    id: "complete-package",
    name: "Complete Academic Package",
    tagline: "All tools, maximum savings.",
    description:
      "Get ALL our academic tools in one ultimate bundle. Turnitin, QuillBot, Grammarly, ChatGPT, and more!",
    tools: ["Customise as needed"],
    image: DEFAULT_IMAGE,
    marketPrice: 12000,
    ourPrice: 1999,
    planType: "Monthly",
    displayCombo: false,
  },
];

export async function getTools(): Promise<Tool[]> {
  return TOOLS;
}

export async function getToolById(
  id: string
): Promise<Tool | ComboTool | undefined> {
  return TOOLS.find((t) => t.id === id) || COMBO_TOOLS.find((c) => c.id === id);
}
