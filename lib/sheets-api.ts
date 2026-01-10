// Server-side helpers to read data from the Google Apps Script API.
//
// ✅ Privacy: the Apps Script key is kept on the server (Vercel env vars)
// ✅ No CMS / no backend DB required

export type SheetTab =
  | "TOOLS"
  | "COMBOS"
  | "DEALS"
  | "REVIEWS"
  | "SITE_CONFIG"
  | "ORDERS";

type Env = {
  APPS_SCRIPT_URL?: string;
  APPS_SCRIPT_KEY?: string;
};

function getEnv(): Env {
  return {
    APPS_SCRIPT_URL: process.env.APPS_SCRIPT_URL,
    APPS_SCRIPT_KEY: process.env.APPS_SCRIPT_KEY,
  };
}

export async function fetchSheetTab<T = any>(tab: SheetTab): Promise<T[]> {
  const { APPS_SCRIPT_URL, APPS_SCRIPT_KEY } = getEnv();
  if (!APPS_SCRIPT_URL || !APPS_SCRIPT_KEY) {
    // If env vars are missing, return empty data instead of crashing build.
    return [];
  }

  const url = new URL(APPS_SCRIPT_URL);
  url.searchParams.set("tab", tab);
  url.searchParams.set("key", APPS_SCRIPT_KEY);

  const res = await fetch(url.toString(), {
    // Always fetch latest sheet values (no redeploy needed)
    cache: "no-store",
  });

  if (!res.ok) return [];

  const json = await res.json().catch(() => null);
  if (!json || !Array.isArray(json.data)) return [];
  return json.data as T[];
}

export async function fetchSiteConfig(): Promise<Record<string, string>> {
  const rows = await fetchSheetTab<{ key: string; value: string }>("SITE_CONFIG");
  const out: Record<string, string> = {};
  for (const r of rows) {
    if (!r?.key) continue;
    out[String(r.key)] = r?.value !== undefined ? String(r.value) : "";
  }
  return out;
}
