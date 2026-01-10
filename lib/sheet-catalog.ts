import type { ComboTool, Tool } from "@/lib/tools";
import type { DealItem } from "@/components/marketing/DealsSection";
import type { ReviewItem } from "@/components/marketing/ReviewsSection";

type SheetRow = Record<string, any>;

function toBool(v: any, fallback = false) {
  if (typeof v === "boolean") return v;
  const s = String(v ?? "").trim().toLowerCase();
  if (s === "true" || s === "yes" || s === "1") return true;
  if (s === "false" || s === "no" || s === "0") return false;
  return fallback;
}

function toNum(v: any, fallback = 0) {
  const n = Number(String(v ?? "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : fallback;
}

function planTermToPlanType(term?: string): Tool["planType"] {
  const t = String(term || "").toLowerCase();
  if (t.includes("year")) return "Year";
  if (t.includes("month")) return "Month";
  return "Month";
}

function accessTypeToAccountType(term?: string): Tool["accountType"] {
  const t = String(term || "").toLowerCase();
  if (t.includes("shared")) return "shared";
  return "private";
}

function categoryToToolCategory(cat?: string): Tool["category"] {
  const c = String(cat || "").toLowerCase();
  if (c.includes("report")) return "report";
  if (c.includes("ott")) return "ott";
  return "account";
}

export function toolsFromSheet(rows: SheetRow[]): Tool[] {
  return (rows || [])
    .filter((r) => toBool(r.active, true))
    .map((r) => {
      const tool: Tool = {
        id: String(r.id || "").trim(),
        name: String(r.title || "").trim(),
        tagline: String(r.tagline || "").trim(),
        description: String(r.description || "").trim(),
        officialUrl: String(r.officialUrl || "").trim(),
        image: String(r.imageUrl || "").trim(),
        marketPrice: toNum(r.mrp, 0),
        ourPrice: toNum(r.price, 0),
        category: categoryToToolCategory(r.category),
        planType: planTermToPlanType(r.planTerm),
        accountType: accessTypeToAccountType(r.accessType),
      };
      return tool;
    })
    .filter((t) => t.id && t.name && t.image)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function featuredToolsFromSheet(rows: SheetRow[], max = 5): Tool[] {
  const tools = toolsFromSheet(rows);
  // "featured" & "sortOrder" are optional.
  const featured = (rows || [])
    .filter((r) => toBool(r.active, true) && toBool(r.featured, false))
    .sort((a, b) => toNum(a.sortOrder, 999) - toNum(b.sortOrder, 999));

  const featuredIds = new Set(featured.map((r) => String(r.id || "").trim()));
  const top = tools.filter((t) => featuredIds.has(t.id)).slice(0, max);
  return top.length ? top : tools.slice(0, max);
}

export function combosFromSheet(rows: SheetRow[]): ComboTool[] {
  return (rows || [])
    .filter((r) => toBool(r.active, true))
    .map((r) => {
      const included = String(r.includedTools || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const combo: ComboTool = {
        id: String(r.id || "").trim(),
        name: String(r.title || "").trim(),
        tagline: String(r.description || "").trim(),
        description: String(r.description || "").trim(),
        tools: included,
        marketPrice: toNum(r.mrp, 0),
        ourPrice: toNum(r.price, 0),
        planType: planTermToPlanType(r.planTerm),
        image: String(r.imageUrl || "").trim(),
      };
      return combo;
    })
    .filter((c) => c.id && c.name && c.image)
    .sort((a, b) => toNum((rows.find(r=>String(r.id).trim()===a.id) as any)?.sortOrder, 999) - toNum((rows.find(r=>String(r.id).trim()===b.id) as any)?.sortOrder, 999));
}

export function dealsFromSheet(
  deals: SheetRow[],
  toolsRows: SheetRow[],
  combosRows: SheetRow[]
): DealItem[] {
  const toolMap = new Map(
    toolsFromSheet(toolsRows).map((t) => [t.id, t])
  );
  const comboMap = new Map(
    combosFromSheet(combosRows).map((c) => [c.id, c])
  );

  return (deals || [])
    .filter((r) => toBool(r.active, true))
    .map((r) => {
      const type = String(r.type || "").toUpperCase() as "TOOL" | "COMBO";
      const ref = String(r.refId || "").trim();
      const itemTitle =
        type === "COMBO" ? comboMap.get(ref)?.name : toolMap.get(ref)?.name;

      return {
        id: String(r.id || "").trim(),
        title: String(r.title || "").trim() || "Deal",
        flashText: String(r.flashText || "").trim() || undefined,
        dealPrice: toNum(r.dealPrice, 0),
        itemTitle: itemTitle || ref,
        itemType: type || "TOOL",
      } as DealItem;
    })
    .filter((d) => d.id && d.itemTitle && d.dealPrice > 0)
    .sort((a, b) => (a.id || "").localeCompare(b.id || ""));
}

export function reviewsFromSheet(rows: SheetRow[]): ReviewItem[] {
  return (rows || [])
    .filter((r) => toBool(r.active, true))
    .map((r) => ({
      id: String(r.id || "").trim(),
      imageUrl: String(r.imageUrl || "").trim(),
      caption: String(r.caption || "").trim() || undefined,
      rating: toNum(r.rating, 5),
      reviewerName: String(r.reviewerName || "").trim() || undefined,
      reviewText: String(r.reviewText || "").trim() || undefined,
    }))
    .filter((r) => r.id && r.imageUrl)
    .sort((a, b) => toNum((rows.find(x=>String(x.id).trim()===a.id) as any)?.sortOrder, 999) - toNum((rows.find(x=>String(x.id).trim()===b.id) as any)?.sortOrder, 999));
}
