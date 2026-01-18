"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TOOLS, COMBO_TOOLS } from "@/lib/catalog";
import { categories } from "@/lib/categories";
import ToolGrid from "@/components/tools/ToolGrid";
import ComboGrid from "@/components/combos/ComboGrid";
import { Search, Home as HomeIcon, ChevronRight } from "lucide-react";

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTools = useMemo(() => {
    let filtered = TOOLS.filter((tool) => tool.id !== "request-new-tool");

    if (selectedCategory !== "all") {
      filtered = filtered.filter((tool) => tool.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          tool.tagline.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const groupedTools = useMemo(() => {
    const groups: { [key: string]: typeof TOOLS } = {};

    if (selectedCategory === "all") {
      categories.slice(1).forEach((cat) => {
        groups[cat.label] = filteredTools.filter(
          (tool) => tool.category === cat.value
        );
      });
    } else {
      groups[selectedCategory] = filteredTools;
    }

    return groups;
  }, [filteredTools, selectedCategory]);

  return (
    <main className="min-h-screen bg-background">
      <div className="border-b border-border bg-card py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
              <HomeIcon className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Tools</span>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-foreground">
              Browse All Tools
            </h1>
            <p className="text-muted-foreground">
              Find the perfect tool or combo for your needs
            </p>
            <p className="mt-2 text-sm text-yellow-600 dark:text-yellow-400">
              ⚠️ Note: Prices may change from time to time. Please confirm the current price before purchasing.
            </p>
          </div>

          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.value ? "default" : "outline"}
                  onClick={() =>
                    setSelectedCategory(cat.id === "all" ? "all" : cat.value)
                  }
                  className={
                    selectedCategory === cat.value || (selectedCategory === "all" && cat.id === "all")
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : ""
                  }
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>

          {selectedCategory === "all" && searchQuery === "" && (
            <>
              {COMBO_TOOLS.filter((combo) => combo.displayCombo !== false).length > 0 && (
                <section className="mb-16">
                  <h2 className="mb-6 text-2xl font-bold text-foreground">
                    Combo Deals
                  </h2>
                  <ComboGrid combos={COMBO_TOOLS.filter((combo) => combo.displayCombo !== false)} />
                </section>
              )}

              {Object.entries(groupedTools).map(
                ([category, tools]) =>
                  tools.length > 0 && (
                    <section key={category} className="mb-16">
                      <h2 className="mb-6 text-2xl font-bold text-foreground">
                        {category}
                      </h2>
                      <ToolGrid tools={tools} />
                    </section>
                  )
              )}
            </>
          )}

          {(selectedCategory !== "all" || searchQuery !== "") && (
            <ToolGrid
              tools={filteredTools}
              emptyMessage="No tools found matching your criteria"
            />
          )}
        </div>
      </div>
    </main>
  );
}
