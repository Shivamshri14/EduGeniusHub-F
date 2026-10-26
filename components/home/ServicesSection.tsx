'use client';

const SERVICES = [
  {
    emoji: '🌐',
    title: 'App/Website Making',
    description: 'Professional websites and mobile apps for your business or project.',
    accent: 'from-orange-500/10 to-amber-500/10',
    ring: 'group-hover:border-orange-300 dark:group-hover:border-orange-500/40',
  },
  {
    emoji: '📍',
    title: 'Google Business Profile Setup',
    description: 'Get your business found on Google Search and Maps.',
    accent: 'from-blue-500/10 to-cyan-500/10',
    ring: 'group-hover:border-blue-300 dark:group-hover:border-blue-500/40',
  },
  {
    emoji: '📱',
    title: 'Social Media Post/Video Design',
    description: 'Eye-catching posts, reels and videos for your brand.',
    accent: 'from-pink-500/10 to-rose-500/10',
    ring: 'group-hover:border-pink-300 dark:group-hover:border-pink-500/40',
  },
  {
    emoji: '🎥',
    title: 'UGC Video Making',
    description: 'Authentic creator-style videos that build trust and drive sales.',
    accent: 'from-purple-500/10 to-violet-500/10',
    ring: 'group-hover:border-purple-300 dark:group-hover:border-purple-500/40',
  },
  {
    emoji: '🤖',
    title: 'WhatsApp Business/Bot Setup',
    description: 'WhatsApp Business setup with auto-replies and chatbot.',
    accent: 'from-emerald-500/10 to-green-500/10',
    ring: 'group-hover:border-emerald-300 dark:group-hover:border-emerald-500/40',
  },
  {
    emoji: '📄',
    title: 'Plagiarism & AI Check Report',
    description: 'Pre-submission plagiarism and AI-content check report, with scores shown as an estimate.',
    accent: 'from-amber-500/10 to-yellow-500/10',
    ring: 'group-hover:border-amber-300 dark:group-hover:border-amber-500/40',
  },
  {
    emoji: '📚',
    title: 'Thesis Formatting & Proofreading',
    description: 'Clean formatting, referencing and proofreading as per your university guidelines.',
    accent: 'from-indigo-500/10 to-blue-500/10',
    ring: 'group-hover:border-indigo-300 dark:group-hover:border-indigo-500/40',
  },
  {
    emoji: '✍️',
    title: 'Hand Written Assignments',
    description: 'Neat handwritten copies of your content, delivered on time.',
    accent: 'from-teal-500/10 to-emerald-500/10',
    ring: 'group-hover:border-teal-300 dark:group-hover:border-teal-500/40',
  },
  {
    emoji: '📊',
    title: 'PPT & Resume Making',
    description: 'Professional presentations and ATS-friendly resumes.',
    accent: 'from-violet-500/10 to-fuchsia-500/10',
    ring: 'group-hover:border-violet-300 dark:group-hover:border-violet-500/40',
  },
];

const WA_ICON = (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-current" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371.074-.57.074-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c0 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-24 px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-200/80 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-orange-700 shadow-sm backdrop-blur-sm dark:border-orange-500/30 dark:bg-slate-900 dark:text-orange-300">
            <span>✨ New Services</span>
          </div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Our Services
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base md:text-lg">
            Fast delivery. Quality work. One place for students and small businesses.
          </p>
        </div>

        {/* Service Cards Responsive Grid: 3 per row on desktop, 2 on tablet, 1 on mobile */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {SERVICES.map((service) => {
            const waUrl = `https://wa.me/918766253356?text=${encodeURIComponent(`Hi EduGenius Hub, I want details for ${service.title}`)}`;

            return (
              <div
                key={service.title}
                className={`group flex h-full flex-col justify-between rounded-3xl border border-orange-100 bg-white p-5 sm:p-6 shadow-md shadow-orange-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:shadow-none ${service.ring}`}
              >
                <div className="flex flex-1 flex-col">
                  {/* Emoji / Icon */}
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-orange-50/80 text-2xl sm:text-3xl shadow-sm ring-1 ring-orange-100/70 transition-transform duration-300 group-hover:scale-110 dark:bg-slate-800 dark:ring-slate-700">
                    <span role="img" aria-label={service.title}>
                      {service.emoji}
                    </span>
                  </div>

                  {/* Title in h3 for SEO */}
                  <h3 className="mt-4 text-lg font-black tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400 sm:text-xl">
                    {service.title}
                  </h3>

                  {/* One-line Description */}
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {service.description}
                  </p>
                </div>

                {/* Enquire on WhatsApp Button */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-sm shadow-emerald-600/20 transition-all duration-200 hover:scale-[1.02] hover:bg-[#1ebe5d] hover:shadow-md hover:shadow-emerald-600/30 active:scale-[0.98]"
                  >
                    {WA_ICON}
                    <span>Enquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Strip (below the cards) */}
        <div className="mt-8 sm:mt-10 rounded-[2rem] border border-orange-200/80 bg-gradient-to-br from-white via-orange-50/50 to-amber-50/50 p-6 text-center shadow-lg shadow-orange-900/5 dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900/90 sm:p-8">
          {/* Highlights */}
          <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200 sm:text-base md:text-lg">
            ⚡ Fast delivery <span className="mx-1.5 text-orange-400 sm:mx-2">|</span> 💯 Quality work <span className="mx-1.5 text-orange-400 sm:mx-2">|</span> 💬 DM us for prices
          </p>

          {/* Big Button */}
          <div className="mt-5">
            <a
              href="https://wa.me/918766253356"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] px-7 py-3.5 text-base font-black text-white shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:scale-[1.03] hover:bg-[#1ebe5d] active:scale-[0.98]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-current" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371.074-.57.074-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c0 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Contact Line */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 sm:text-sm">
            <a
              href="https://wa.me/918766253356"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              +91 8766253356
            </a>
            <span>|</span>
            <a
              href="https://www.edugeniushub.in"
              className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
            >
              www.edugeniushub.in
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
