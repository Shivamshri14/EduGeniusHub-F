import type { Metadata } from 'next';
import ProductsCatalog from './ProductsCatalog';
import { CANONICAL_ORIGIN } from '@/lib/publicCopy';

const titles: Record<string, string> = {
  reports: 'EduGenius reports',
  ai_tools: 'AI tool access',
  ott: 'OTT subscriptions',
  accounts: 'Accounts',
};

type Props = { searchParams?: { category?: string } };

export function generateMetadata({ searchParams }: Props): Metadata {
  const category = searchParams?.category || '';
  const label = titles[category];
  const title = label ? `${label} | EduGenius Hub` : 'Products | EduGenius Hub';
  const canonical = label
    ? `${CANONICAL_ORIGIN}/products?category=${category}`
    : `${CANONICAL_ORIGIN}/products`;

  return {
    title,
    description: 'Order reports, tool access, and subscriptions on WhatsApp. Each product shows its own price and delivery time.',
    alternates: { canonical },
  };
}

export default function ProductsPage() {
  return <ProductsCatalog />;
}
