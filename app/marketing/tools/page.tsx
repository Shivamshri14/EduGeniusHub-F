import { getTools } from "@/lib/sanity";
import { ToolCard } from "@/components/marketing/ToolCard";
import { Search } from "lucide-react";

export const revalidate = 0;

export default async function ToolsPage() {
  const tools = await getTools();

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              Browse Premium Tools
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Discover {tools.length} carefully selected tools to boost your productivity and creativity. Each tool comes with fast delivery and dedicated support.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Prices are subject to change and may vary from time to time. Please contact us on WhatsApp for current pricing.
            </p>
          </div>

          {tools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Search size={64} className="text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No Tools Available</h3>
              <p className="text-slate-600">Add tools in Sanity Studio at /sanity</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
