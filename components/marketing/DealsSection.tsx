import { BadgePercent, Flame } from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";
import { waDirectLink } from "@/lib/whatsapp-message";

export type DealItem = {
  id: string;
  title: string;
  flashText?: string;
  dealPrice: number;
  itemTitle: string;
  itemType: "TOOL" | "COMBO";
};

export function DealsSection({
  deals,
  phoneE164,
}: {
  deals: DealItem[];
  phoneE164?: string;
}) {
  if (!deals?.length) return null;
  const shown = deals.slice(0, 2);

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-amber-200/30 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 dark:border-amber-400/20 p-6 md:p-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold">
                <Flame size={18} />
                <span>Deals of the Day</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-2">
                Limited offers (auto-updated from Google Sheet)
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Add / disable deals in the <b>DEALS</b> tab – no redeploy.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {shown.map((d) => (
              <div
                key={d.id}
                className="rounded-xl bg-white/70 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 p-5 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <BadgePercent size={18} className="text-amber-600 dark:text-amber-400" />
                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {d.title}
                    </div>
                  </div>
                  <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    {d.itemTitle}
                  </div>
                  {d.flashText && (
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {d.flashText}
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                    ₹{d.dealPrice}
                  </div>
                  <WhatsAppButton
                    href={waDirectLink(`Deal: ${d.itemTitle}`, d.dealPrice, phoneE164)}
                    label="Grab Deal"
                    className="mt-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
