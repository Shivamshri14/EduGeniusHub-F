"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Chrome as Home } from "lucide-react";
import { TOOLS } from "@/lib/tools";

export function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = [
    { label: "Home", href: "/" }
  ];

  let currentPath = "";

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    let label = segment.charAt(0).toUpperCase() + segment.slice(1);

    if (segment === "tools" && index === 0) {
      label = "Tools";
    } else if (segments[index - 1] === "tools") {
      const tool = TOOLS.find(t => t.id === segment);
      if (tool) {
        label = tool.name;
      }
    } else if (segment === "contact") {
      label = "Contact";
    }

    breadcrumbs.push({
      label,
      href: currentPath
    });
  });

  return (
    <nav aria-label="Breadcrumb" className="bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight size={16} className="text-slate-400" />
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-slate-900 font-medium flex items-center gap-1">
                  {index === 0 && <Home size={16} />}
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1"
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
