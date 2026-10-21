import type { Metadata } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import ProductModel from '@/models/Product';
import { CANONICAL_ORIGIN, publicDescription, publicName } from '@/lib/publicCopy';

type Props = { params: { slug: string }; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const fallback: Metadata = {
    title: 'Product | EduGenius Hub',
    alternates: { canonical: `${CANONICAL_ORIGIN}/product/${params.slug}` },
  };

  try {
    await connectToDatabase();
    const product = await ProductModel.findOne({ slug: params.slug, is_hidden: { $ne: true } })
      .select('name description')
      .lean();
    if (!product) return fallback;
    const name = publicName(product.name);
    return {
      title: `${name} | EduGenius Hub`,
      description: publicDescription(product.description) || `${name} from EduGenius Hub. Order on WhatsApp.`,
      alternates: { canonical: `${CANONICAL_ORIGIN}/product/${params.slug}` },
    };
  } catch {
    return fallback;
  }
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
