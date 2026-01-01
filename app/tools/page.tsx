import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { WhatsAppBar } from "@/components/marketing/WhatsAppBar";
import { ToolCard } from "@/components/marketing/ToolCard";
import { getTools } from "@/lib/sanity";

export const revalidate = 0;

export default async function ToolsPage() {
  const tools = await getTools();

  const reportTools = tools.filter((t: any) => t.category === "report");
  const accountTools = tools.filter((t: any) => t.category === "account");
  const ottTools = tools.filter((t: any) => t.category === "ott");

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
                Browse our complete collection of {tools.length} premium subscription tools
              </p>
            </div>

            <div className="space-y-16">

              {/* REPORTS */}
              <Section title="Reports" subtitle="Plagiarism & AI Detection Reports" color="bg-blue-600">
                {reportTools.map((tool: any) => (
                  <ToolCard key={tool._id} tool={tool} />
                ))}
              </Section>

              {/* ACCOUNTS */}
              <Section title="Accounts & Subscriptions" subtitle="Premium Tools & Software Access" color="bg-green-600">
                {accountTools.map((tool: any) => (
                  <ToolCard key={tool._id} tool={tool} />
                ))}
              </Section>

              {/* OTT */}
              <Section title="OTT Platforms" subtitle="Streaming Services & Entertainment" color="bg-orange-600">
                {ottTools.map((tool: any) => (
                  <ToolCard key={tool._id} tool={tool} />
                ))}
              </Section>

            </div>
          </div>
        </section>
      </div>

      <Footer />
      <WhatsAppBar />
    </>
  );
}

/* ---------- Helper ---------- */
function Section({ title, subtitle, color, children }: any) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-slate-600 dark:text-slate-400">{subtitle}</p>
        <div className={`h-1 w-24 ${color} mt-3 rounded-full`} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {children}
      </div>
    </div>
  );
}
