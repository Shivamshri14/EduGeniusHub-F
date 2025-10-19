import { TOOLS } from "@/lib/tools";
import { SITE } from "@/lib/config";
import { ToolCard } from "@/components/marketing/ToolCard";
import { Search } from "lucide-react";

export const metadata = {
  title: `Browse Tools - ${SITE.brand}`,
  description: `Explore ${TOOLS.length} premium subscription tools for students and professionals. Get instant access to AI tools, streaming services, and productivity software.`,
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Browse Premium Tools
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Discover {TOOLS.length} carefully selected tools to boost your productivity and creativity. Each tool comes with fast delivery and dedicated support.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {TOOLS.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          {TOOLS.length === 0 && (
            <div className="text-center py-20">
              <Search size={64} className="text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No Tools Available</h3>
              <p className="text-slate-600">Check back soon for new tools!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
