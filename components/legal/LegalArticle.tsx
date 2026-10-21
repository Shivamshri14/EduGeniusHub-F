import Link from 'next/link';

export default function LegalArticle({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <article className="mx-auto max-w-3xl text-base leading-relaxed text-foreground">
        <p className="mb-4 text-sm">
          <Link href="/" className="underline underline-offset-2">
            Home
          </Link>
        </p>
        <h1 className="mb-6 text-3xl font-bold tracking-tight">{title}</h1>
        <div className="space-y-4">{children}</div>
      </article>
    </main>
  );
}
