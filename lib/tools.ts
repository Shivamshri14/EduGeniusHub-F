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
  planType?: PlanType;          // ✅ FIXED (optional)
  accountType?: AccountType;    // ✅ FIXED (optional)
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

const DEFAULT_IMAGE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3HLwpgg_EEEqDYfucJ5ama3YWxNf8kjBm_Q&s";

export const TOOLS: Tool[] = [
  {
    id: "turnitin-plag",
    name: "Turnitin Plagiarism Report",
    tagline: "Plagiarism detection reports.",
    description: "Generate plagiarism detection of documents.",
    officialUrl: "https://turnitin.com",
    image: DEFAULT_IMAGE,
    marketPrice: 100,
    ourPrice: 60,
    category: "report",
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
    ourPrice: 120,
    category: "report",
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
    display: false,
  },
  {
    id: "turnitin-student",
    name: "Turnitin Student Account",
    tagline:
      "Check plagiarism like a pro. No ai report is genrated in student account",
    description:
      "Student account only for Plagisarism/Similarity checks.",
    officialUrl: "https://www.turnitin.com",
    image: DEFAULT_IMAGE,
    marketPrice: 1499,
    ourPrice: 799,
    category: "account",
    planType: "Monthly",
    accountType: "private",
    display: false,
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
    description: "Advanced grammar and clarity suggestions.",
    officialUrl: "https://www.grammarly.com",
    image: DEFAULT_IMAGE,
    marketPrice: 499,
    ourPrice: 249,
    category: "account",
    planType: "Monthly",
    accountType: "shared",
    display: true,
  },
  {
    id: "chatgpt-plus",
    name: "ChatGPT (Plus Access)",
    tagline: "Advanced AI for writing, coding, research.",
    description: "Access powerful AI tools.",
    officialUrl: "https://chat.openai.com",
    image: DEFAULT_IMAGE,
    marketPrice: 999,
    ourPrice: 399,
    category: "account",
    planType: "Monthly",
    accountType: "shared",
    display: true,
  },
  {
    id: "stealthwriter",
    name: "StealthWriter",
    tagline: "Make AI text look human-written.",
    description: "Humanize AI-generated text.",
    officialUrl: "https://app.stealthwriter.ai/auth/login",
    image: DEFAULT_IMAGE,
    marketPrice: 1500,
    ourPrice: 999,
    category: "account",
    planType: "Monthly",
    accountType: "shared",
    durationValue: 1,
    durationType: "months",
    display: true,
  },
  {
    id: "writehuman-ai",
    name: "Writehuman AI",
    tagline: "Make AI text look human-written.",
    description: "Humanize AI-generated text.",
    officialUrl: "https://writehuman.ai/",
    image: DEFAULT_IMAGE,
    marketPrice: 1499,
    ourPrice: 599,
    category: "account",
    planType: "Monthly",
    accountType: "shared",
    display: true,
  },
  {
    id: "perplexity-ai",
    name: "Perplexity AI",
    tagline: "Instant factual answers with sources.",
    description: "Get answers with citations.",
    officialUrl: "https://www.perplexity.ai",
    image: DEFAULT_IMAGE,
    marketPrice: 2000,
    ourPrice: 999,
    category: "account",
    planType: "Yearly",
    accountType: "private",
    display: true,
  },
  {
    id: "netflix-premium",
    name: "Netflix Premium",
    tagline: "Unlimited streaming.",
    description: "OTP login",
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
    tagline: "Movies & shows.",
    description: "Private account",
    officialUrl: "https://www.primevideo.com",
    image: DEFAULT_IMAGE,
    marketPrice: 499,
    ourPrice: 249,
    category: "ott",
    durationValue: 6,
    durationType: "months",
    planType: "Monthly",
    accountType: "private",
    display: true,
  },
];

export const COMBO_TOOLS: ComboTool[] = [
  {
    id: "student-essentials",
    name: "Student Essentials Combo",
    tagline: "Academic success bundle.",
    description: "Turnitin + QuillBot + Grammarly",
    tools: ["turnitin-student", "quillbot-premium", "grammarly-premium"], // ✅ FIXED
    image: DEFAULT_IMAGE,
    marketPrice: 2000,
    ourPrice: 999,
    planType: "Monthly",
  },
  {
    id: "ai-writer-pro",
    name: "AI Writer Pro Combo",
    tagline: "AI toolkit.",
    description: "ChatGPT + StealthWriter + Perplexity",
    tools: ["chatgpt-plus", "stealthwriter", "perplexity-ai"], // ✅ FIXED
    image: DEFAULT_IMAGE,
    marketPrice: 5500,
    ourPrice: 2499,
    planType: "Monthly",
  },
  {
    id: "entertainment-bundle",
    name: "Entertainment Bundle",
    tagline: "Streaming bundle.",
    description: "Netflix + Prime",
    tools: ["netflix-premium", "prime-video"], // ✅ FIXED
    image: DEFAULT_IMAGE,
    marketPrice: 499,
    ourPrice: 199,
    planType: "Monthly",
  },
];

export async function getTools(): Promise<Tool[]> {
  return TOOLS;
}

export async function getToolById(
  id: string
): Promise<Tool | ComboTool | undefined> {
  return (
    TOOLS.find((t) => t.id === id) ||
    COMBO_TOOLS.find((c) => c.id === id)
  );
}