import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { WhatsAppBar } from "@/components/marketing/WhatsAppBar";
import { ToolCard } from "@/components/marketing/ToolCard";
import { TOOLS } from "@/lib/tools";
import { SITE } from "@/lib/config";

export const metadata = {
  icons: {
    icon: '/file.ico', // use root path for files in public/ (public/file.ico)
  },
  title: `${SITE.brand}`,
  description: "Browse all premium subscription tools available at student-friendly prices.",
};

export default function ToolsPage() {
  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <div className="min-h-screen bg-white dark:bg-slate-900">
        <section className="py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                All Premium Tools
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400">
                Browse our complete collection of {TOOLS.length} premium subscription tools
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {TOOLS.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <WhatsAppBar />
    </>
  );
}
