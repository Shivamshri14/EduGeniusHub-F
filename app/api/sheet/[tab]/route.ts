import { NextResponse } from "next/server";
import { fetchSheetTab, type SheetTab } from "@/lib/sheets-api";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: { tab: string } }
) {
  const tab = String(params.tab || "").toUpperCase() as SheetTab;
  const allowed: SheetTab[] = [
    "TOOLS",
    "COMBOS",
    "DEALS",
    "REVIEWS",
    "SITE_CONFIG",
  ];

  if (!allowed.includes(tab)) {
    return NextResponse.json(
      { ok: false, error: "Invalid tab" },
      { status: 400 }
    );
  }

  const data = await fetchSheetTab(tab);
  return NextResponse.json({ ok: true, tab, data }, { status: 200 });
}
