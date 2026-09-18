import { Product, ProductPlan, ProductCategory } from './types';

export interface ParsedProductCandidate {
  name: string;
  slug?: string;
  description: string;
  category: ProductCategory;
  price: number;
  market_price?: number | null;
  badge?: 'best_seller' | 'instant_delivery' | 'available_now' | 'limited_slots' | null;
  delivery_time: string;
  is_instant: boolean;
  plan_type: string;
  account_type?: 'shared' | 'private' | 'invite' | 'key' | null;
  features: string[];
  plans: ProductPlan[];
  how_it_works: string[];
  important_notes: string[];
  stock_status: 'in_stock' | 'limited' | 'out_of_stock';
}

export const DEFAULT_GEMINI_PROMPT = `
You are an expert e-commerce catalog parser for EduGeniusHub (www.edugeniushub.com), an online store selling digital tools, student accounts, AI tool access, Turnitin reports, OTT subscriptions, and academic services.

Analyze the promotional WhatsApp/Telegram message and extract all products into a JSON array of objects conforming to this schema:
[
  {
    "name": "Product Name",
    "description": "Engaging description explaining what it is and its main benefits",
    "category": "reports" | "ai_tools" | "ott" | "services" | "accounts",
    "price": number (lowest plan price or single item price in INR, integer),
    "market_price": number or null (market / official price if mentioned),
    "badge": "best_seller" | "instant_delivery" | "available_now" | "limited_slots" | null,
    "delivery_time": "5–15 min" | "Instant" | "30–60 min" | "1–2 hours",
    "is_instant": boolean,
    "plan_type": "Monthly" | "Yearly" | "One-time" | "Per Report" | "Credits" | "Inquiry",
    "account_type": "shared" | "private" | "invite" | "key" | null,
    "features": ["Bullet point feature 1", "Bullet point feature 2", ...],
    "plans": [
      {
        "name": "Plan 1 / 30$ / Standard",
        "price": number in INR,
        "original_price": number or null,
        "duration": "Monthly" | "1 Month" | "Yearly" | "One-time" | null,
        "limits": "e.g. 20 Requests/Day, 5000 Words/Req or null",
        "details": "e.g. Instant Activation, Own Gmail or null"
      }
    ],
    "how_it_works": ["Step 1...", "Step 2..."],
    "important_notes": ["Note or warning 1...", "Note 2..."],
    "stock_status": "in_stock" | "limited" | "out_of_stock"
  }
]

CRITICAL RULES:
1. Multi-product messages (e.g. Daily Specials listing Turnitin, QuillBot, ChatGPT, Netflix):
   - Separate into individual product objects for each tool/service.
2. Single product with multiple tiers (e.g. StealthWriter with Plan 1, Plan 2, Plan 3, Plan 4, OR Cursor AI with 30$, 50$, 80$, 100$):
   - Keep as ONE product with "plans" array containing all the tiers.
   - The main "price" field must be the lowest tier price (e.g. 699 or 349).
3. If price is "DM Only" or not given, set price to 0 and plan_type to "Inquiry".
4. Extract features clearly (remove emojis from text).
5. Extract how it works and important notes/guidelines (e.g. word limits, front page removal instructions, shared account warnings).
6. Categories:
   - "reports" for Turnitin plagiarism, AI detection, combos, Drillbit.
   - "ai_tools" for Claude, Cursor, StealthWriter, ChatGPT, QuillBot, Grammarly, Perplexity, Jenni.
   - "ott" for Netflix, Prime Video, ZEE5, SonyLIV.
   - "services" for Thesis/Dissertation writing, AI Humanization services.
   - "accounts" for Student packs, Canva Pro invite.
7. Return ONLY valid JSON array. No markdown fences, no explanatory text.
`;

export const GEMINI_SYSTEM_PROMPT = DEFAULT_GEMINI_PROMPT;

/**
 * Parses promotional message using Google Gemini 2.0 / 3.5 Flash API (100% Free Tier)
 */
export async function parseMessageWithGemini(
  rawText: string,
  customPrompt?: string
): Promise<{
  success: boolean;
  products: ParsedProductCandidate[];
  source: 'gemini-3.5-flash' | 'smart-heuristic-fallback';
  rawResponse?: string;
  error?: string;
}> {
  const apiKey = process.env.GEMINI_API_KEY;
  const activePrompt = customPrompt && customPrompt.trim() ? customPrompt.trim() : DEFAULT_GEMINI_PROMPT;

  if (apiKey && apiKey.trim() !== '' && apiKey !== 'YOUR_GEMINI_API_KEY') {
    const CANDIDATE_MODELS = [
      'gemini-3.5-flash',
      'gemini-3.6-flash',
      'gemini-3.8-flash',
      'gemini-2.5-flash',
      'gemini-flash-latest',
      'gemini-2.0-flash',
    ];

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${activePrompt}\n\nHere is the promotional message to parse:\n\n${rawText}`,
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.1,
      },
    };

    for (const modelName of CANDIDATE_MODELS) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          console.warn(`Gemini model ${modelName} returned status ${res.status}, trying next model...`);
          continue;
        }

        const data = await res.json();
        const contentText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!contentText) {
          continue;
        }

        const parsedJson = JSON.parse(contentText);
        const productList = Array.isArray(parsedJson) ? parsedJson : [parsedJson];

      // Normalize products
      const normalizedProducts: ParsedProductCandidate[] = productList.map((p: any) => ({
        name: String(p.name || 'Untitled Product').trim(),
        description: String(p.description || '').trim(),
        category: (['reports', 'ai_tools', 'ott', 'services', 'accounts'].includes(p.category)
          ? p.category
          : 'ai_tools') as ProductCategory,
        price: Number(p.price) || 0,
        market_price: p.market_price ? Number(p.market_price) : null,
        badge: p.badge || (p.price > 0 ? 'available_now' : null),
        delivery_time: p.delivery_time || '5–15 min',
        is_instant: p.is_instant !== false,
        plan_type: p.plan_type || 'Monthly',
        account_type: p.account_type || null,
        features: Array.isArray(p.features) ? p.features.map(String) : [],
        plans: Array.isArray(p.plans)
          ? p.plans.map((pl: any) => ({
              name: String(pl.name || 'Standard'),
              price: Number(pl.price) || 0,
              original_price: pl.original_price ? Number(pl.original_price) : null,
              duration: pl.duration ? String(pl.duration) : null,
              limits: pl.limits ? String(pl.limits) : null,
              details: pl.details ? String(pl.details) : null,
            }))
          : [],
        how_it_works: Array.isArray(p.how_it_works) ? p.how_it_works.map(String) : [],
        important_notes: Array.isArray(p.important_notes) ? p.important_notes.map(String) : [],
        stock_status: p.stock_status === 'limited' || p.stock_status === 'out_of_stock'
          ? p.stock_status
          : 'in_stock',
      }));

        return {
          success: true,
          products: normalizedProducts,
          source: 'gemini-3.5-flash',
        };
      } catch (err: any) {
        console.warn(`Gemini model ${modelName} failed:`, err?.message);
        continue;
      }
    }
  }

  // If all remote models fail or no Gemini key is set, use smart heuristic parser
  const fallbackProducts = parseWithHeuristics(rawText);
  return {
    success: true,
    products: fallbackProducts,
    source: 'smart-heuristic-fallback',
  };
}

/**
 * Smart Heuristic Fallback Parser:
 * Intelligently recognizes tiers, prices (₹, $), plans, and features from raw promo messages
 * even when offline or before Gemini API key is configured.
 */
export function parseWithHeuristics(raw: string): ParsedProductCandidate[] {
  const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
  const textLower = raw.toLowerCase();

  // Case A: Single product with multiple plans (e.g. StealthWriter or Cursor credits)
  const isMultiPlanProduct =
    (raw.includes('Plans Available') ||
      raw.includes('Credit Bundles') ||
      /plan\s*\d/i.test(raw) ||
      /\$\d+[\s\S]*₹\d+/i.test(raw)) &&
    !raw.includes('Today\'s Special') &&
    !raw.includes('OTT Subscriptions');

  if (isMultiPlanProduct) {
    const firstLine = lines[0] || 'Premium Digital Product';
    const cleanedTitle = firstLine.replace(/^[^\w]+|[^\w]+$/g, '').replace(/–.*$/, '').trim();

    let category: ProductCategory = 'ai_tools';
    if (textLower.includes('turnitin') || textLower.includes('plagiarism')) category = 'reports';
    else if (textLower.includes('netflix') || textLower.includes('prime') || textLower.includes('ott')) category = 'ott';
    else if (textLower.includes('thesis') || textLower.includes('writing')) category = 'services';

    const features: string[] = [];
    const howItWorks: string[] = [];
    const notes: string[] = [];
    const plans: ProductPlan[] = [];

    let inHowItWorks = false;
    let inNotes = false;

    for (const line of lines) {
      if (/how it works/i.test(line)) {
        inHowItWorks = true;
        inNotes = false;
        continue;
      }
      if (/important|warning|before sending/i.test(line)) {
        inNotes = true;
        inHowItWorks = false;
        continue;
      }
      if (/dm:|www\.|edugeniushub/i.test(line)) continue;

      if (inHowItWorks && (line.startsWith('*') || line.startsWith('-') || line.startsWith('•'))) {
        howItWorks.push(line.replace(/^[*•-]\s*/, ''));
        continue;
      }
      if (inNotes && (line.startsWith('*') || line.startsWith('-') || line.startsWith('•') || line.startsWith('⚠️') || line.startsWith('💡'))) {
        notes.push(line.replace(/^[⚠️💡*•-]\s*/, ''));
        continue;
      }

      // Detect Plan lines: e.g. "Plan 1 – ₹699" or "30$ 349/-"
      const planMatch = line.match(/(Plan\s*\d+.*?)[–:\-]\s*₹?\s*([\d,]+)/i);
      const creditMatch = line.match(/(\d+\$?)\s*[:–\-]?\s*₹?\s*(\d+)[\/\-]*/i);

      if (planMatch) {
        const price = parseInt(planMatch[2].replace(/,/g, ''), 10);
        plans.push({
          name: planMatch[1].replace(/^[💠*•-]\s*/, '').trim(),
          price: price,
          duration: 'Monthly',
        });
      } else if (creditMatch && creditMatch[1].includes('$')) {
        const price = parseInt(creditMatch[2], 10);
        plans.push({
          name: `${creditMatch[1]} Usage Credit`,
          price: price,
          duration: '1 Month',
        });
      } else if (line.startsWith('✅') || line.startsWith('✔️') || line.startsWith('✨')) {
        features.push(line.replace(/^[✅✔️✨*•-]\s*/, ''));
      }
    }

    const lowestPrice = plans.length > 0 ? Math.min(...plans.map((p) => p.price)) : 699;

    return [
      {
        name: cleanedTitle || 'Software Premium Plan',
        description: lines.find((l) => l.length > 20 && !l.startsWith('✅') && !l.startsWith('💠')) ||
          'Premium access with instant activation and dedicated customer support.',
        category,
        price: lowestPrice,
        market_price: Math.round(lowestPrice * 1.5),
        badge: textLower.includes('limited') ? 'limited_slots' : 'instant_delivery',
        delivery_time: 'Instant Activation',
        is_instant: true,
        plan_type: 'Monthly',
        account_type: textLower.includes('shared') ? 'shared' : textLower.includes('own gmail') ? 'private' : null,
        features: features.length > 0 ? features : ['Instant Delivery', 'Private Access', '24/7 Support'],
        plans: plans,
        how_it_works: howItWorks,
        important_notes: notes,
        stock_status: 'in_stock',
      },
    ];
  }

  // Case B: Multi-product list (e.g. Daily Specials or list of tools)
  const products: ParsedProductCandidate[] = [];
  let currentSection = 'ai_tools';

  for (const line of lines) {
    if (/report/i.test(line)) currentSection = 'reports';
    else if (/ott|netflix|prime/i.test(line)) currentSection = 'ott';
    else if (/service|thesis/i.test(line)) currentSection = 'services';
    else if (/tool|chatgpt|quillbot|grammarly/i.test(line)) currentSection = 'ai_tools';

    // Match lines like: "Plagiarism Report – ₹120" or "QuillBot Premium – ₹149" or "Netflix – ₹149"
    const itemMatch = line.match(/(?:✅|✔️|🎪|🎦|🤖|✍️|📑)?\s*([A-Za-z0-9\s()+\-]+?)\s*[–—:\-]\s*₹?\s*(\d+)(?:\/(\w+))?/);
    if (itemMatch && itemMatch[1].trim().length > 2) {
      const name = itemMatch[1].trim();
      const price = parseInt(itemMatch[2], 10);
      const cycle = itemMatch[3] ? itemMatch[3] : currentSection === 'reports' ? 'One-time' : 'Monthly';

      let cat: ProductCategory = 'ai_tools';
      if (/turnitin|report|plagiarism|ai detection/i.test(name)) cat = 'reports';
      else if (/netflix|prime|zee5|sonyliv/i.test(name)) cat = 'ott';
      else if (/thesis|dissertation|humanization/i.test(name)) cat = 'services';

      products.push({
        name,
        description: `Official ${name} with fast delivery and guaranteed uptime.`,
        category: cat,
        price,
        market_price: Math.round(price * 1.6),
        badge: price > 300 ? 'best_seller' : 'available_now',
        delivery_time: cat === 'reports' ? '30–60 min' : '5–15 min',
        is_instant: cat !== 'reports',
        plan_type: cycle,
        account_type: name.toLowerCase().includes('shared') ? 'shared' : null,
        features: ['Instant Fulfillment', 'Full Validity Guarantee', 'Dedicated WhatsApp Support'],
        plans: [
          {
            name: `${name} Standard`,
            price,
            duration: cycle,
          },
        ],
        how_it_works: ['Send requirement on WhatsApp', 'Complete payment', 'Receive credentials/report in minutes'],
        important_notes: [],
        stock_status: 'in_stock',
      });
    }
  }

  // If nothing matched, create one clean general product candidate
  if (products.length === 0) {
    const firstLine = lines[0] || 'Special Digital Tool';
    products.push({
      name: firstLine.replace(/^[^\w]+|[^\w]+$/g, ''),
      description: lines.slice(1, 3).join(' ') || 'High performance digital subscription with guaranteed access.',
      category: 'ai_tools',
      price: 299,
      market_price: 499,
      badge: 'best_seller',
      delivery_time: '5–15 min',
      is_instant: true,
      plan_type: 'Monthly',
      account_type: 'private',
      features: ['24/7 Access', 'Fast Delivery', 'Support via WhatsApp'],
      plans: [],
      how_it_works: ['Order via WhatsApp', 'Instant Setup'],
      important_notes: [],
      stock_status: 'in_stock',
    });
  }

  return products;
}
