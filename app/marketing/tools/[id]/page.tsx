import Image from "next/image";
import { notFound } from "next/navigation";
import { getTools, getToolById } from "@/lib/sanity";
import { SITE } from "@/lib/config";
import { waDirectLink } from "@/lib/whatsapp";
import { MessageCircle, ExternalLink, CheckCircle } from "lucide-react";

export async function generateStaticParams() {
  try {
    const tools = await getTools();
    if (!tools || tools.length === 0) {
      return [{ id: 'placeholder' }];
    }
    return tools.map((tool: any) => ({
      id: tool.id,
    }));
  } catch (error) {
    return [{ id: 'placeholder' }];
  }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const tool = await getToolById(params.id);

    if (!tool) {
      return {
        title: `Tool Not Found - ${SITE.brand}`,
      };
    }

    return {
      title: `${tool.name} - ${SITE.brand}`,
      description: tool.description,
    };
  } catch (error) {
    return {
      title: `Tool Not Found - ${SITE.brand}`,
    };
  }
}

export default async function ToolDetailPage({ params }: { params: { id: string } }) {
  let tool;
  try {
    tool = await getToolById(params.id);
  } catch (error) {
    notFound();
  }

  if (!tool) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 sm:h-96 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={tool.image}
                alt={tool.name}
                fill
                className="object-contain p-8"
              />
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
                {tool.name}
              </h1>
              <p className="text-2xl text-blue-600 mb-6">
                {tool.tagline}
              </p>
              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                {tool.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href={waDirectLink(tool.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg"
                >
                  <MessageCircle size={24} />
                  <span>Enquire on WhatsApp</span>
                </a>
                <a
                  href={tool.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-xl hover:bg-slate-50 transition-colors font-semibold text-lg"
                >
                  <ExternalLink size={24} />
                  <span>Official Site</span>
                </a>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h3 className="font-bold text-lg text-slate-900 mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">Instant delivery via WhatsApp</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">Verified and working credentials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">24/7 customer support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-slate-700">Affordable pricing for students</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Contact us on WhatsApp and we'll get you set up within minutes. Our team is ready to help!
          </p>
          <a
            href={waDirectLink(tool.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg"
          >
            <MessageCircle size={24} />
            <span>Message Us Now</span>
          </a>
        </div>
      </section>
    </div>
  );
}
