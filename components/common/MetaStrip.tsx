"use client";

import { ShieldCheck, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

type MetaStripProps = {
  accountTypes?: string[];
  months?: number[];
  className?: string;
};

export function MetaStrip({ accountTypes, months, className }: MetaStripProps) {
  const accountLabel =
    accountTypes?.length ? accountTypes.join(" • ") : "Private Account";

  const monthLabel =
    months?.length
      ? months.map((m) => `${m}M`).join(" • ")
      : "1M";

  return (
    <div
      className={cn(
        "mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3",
        className
      )}
    >
      {/* Account type */}
      <div className="flex items-start gap-3 rounded-xl border border-slate-200/70 bg-slate-50 px-4 py-3 dark:border-slate-700/70 dark:bg-slate-900">
        <div className="h-9 w-9 rounded-lg bg-blue-600/10 flex items-center justify-center">
          <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>

        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Account Type
          </p>
          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
            {accountLabel}
          </p>
        </div>
      </div>

      {/* Months */}
      <div className="flex items-start gap-3 rounded-xl border border-slate-200/70 bg-slate-50 px-4 py-3 dark:border-slate-700/70 dark:bg-slate-900">
        <div className="h-9 w-9 rounded-lg bg-emerald-600/10 flex items-center justify-center">
          <CalendarDays className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        </div>

        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Plan Duration
          </p>
          <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
            {monthLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
