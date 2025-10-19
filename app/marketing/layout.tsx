import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { WhatsAppBar } from "@/components/marketing/WhatsAppBar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <main className="min-h-screen pb-20 md:pb-0">
        {children}
      </main>
      <Footer />
      <WhatsAppBar />
    </>
  );
}
