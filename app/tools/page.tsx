"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { WhatsAppBar } from "@/components/marketing/WhatsAppBar";
import { ToolCard } from "@/components/marketing/ToolCard";
import { getTools } from "@/lib/storage";
import { Tool } from "@/lib/tools";
import { SITE } from "@/lib/config";

export default function ToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [reportTools, setReportTools] = useState<Tool[]>([]);
  const [accountTools, setAccountTools] = useState<Tool[]>([]);
  const [ottTools, setOttTools] = useState<Tool[]>([]);

  useEffect(() => {
    const allTools = getTools();
    setTools(allTools);
    setReportTools(allTools.filter(tool => tool.category === 'report'));
    setAccountTools(allTools.filter(tool => tool.category === 'account'));
    setOttTools(allTools.filter(tool => tool.category === 'ott'));
  }, []);

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
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Reports
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Plagiarism & AI Detection Reports
                  </p>
                  <div className="h-1 w-24 bg-blue-600 mt-3 rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {reportTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Accounts & Subscriptions
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Premium Tools & Software Access
                  </p>
                  <div className="h-1 w-24 bg-green-600 mt-3 rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {accountTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    OTT Platforms
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    Streaming Services & Entertainment
                  </p>
                  <div className="h-1 w-24 bg-orange-600 mt-3 rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {ottTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <WhatsAppBar />
    </>
  );
}
