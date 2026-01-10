"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumbs() {
  const pathname = usePathname();

  if (!pathname || pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = [
    { label: "Home", href: "/" },
  ];

  let currentPath = "";

  segments.forEach((segment) => {
    currentPath += `/${segment}`;

    // Capitalize label
    const label =
      segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

    breadcrumbs.push({
      label,
      href: currentPath,
    });
  });

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight size={16} className="text-slate-400" />
              )}

              {index === breadcrumbs.length - 1 ? (
                <span className="text-slate-900 dark:text-white font-medium flex items-center gap-1">
                  {index === 0 && <Home size={16} />}
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  {index === 0 && <Home size={16} />}
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
