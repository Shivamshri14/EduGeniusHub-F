import type { MetadataRoute } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import ProductModel from '@/models/Product';
import { CANONICAL_ORIGIN } from '@/lib/publicCopy';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/products', '/contact', '/terms', '/privacy', '/refund-policy', '/disclaimer'].map(
    (path) => ({
      url: `${CANONICAL_ORIGIN}${path || '/'}`,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.7,
    })
  );

  try {
    await connectToDatabase();
    const products = await ProductModel.find({ is_hidden: { $ne: true } })
      .select('slug updatedAt')
      .lean();
    const productRoutes = products
      .filter((product) => product.slug)
      .map((product) => ({
        url: `${CANONICAL_ORIGIN}/product/${product.slug}`,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
    return [...staticRoutes, ...productRoutes];
  } catch {
    return staticRoutes;
  }
}
