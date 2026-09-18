import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import ProductModel from '@/models/Product';
import { getLocalProducts } from '@/lib/localProducts';

// Generate url-safe slug from product name
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');
  const search = searchParams.get('search');
  const includeHidden = searchParams.get('include_hidden') === 'true';

  try {
    await connectToDatabase();

    const query: Record<string, any> = {};
    if (!includeHidden) {
      query.is_hidden = { $ne: true };
    }
    if (category && category !== 'all') {
      query.category = category;
    }
    if (featured === 'true') {
      query.is_featured = true;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const dbProducts = await ProductModel.find(query).sort({ sort_order: 1, createdAt: -1 }).lean();

    // If MongoDB is connected and has products, return them
    if (dbProducts && dbProducts.length > 0) {
      const formatted = dbProducts.map((p: any) => ({
        ...p,
        id: p._id?.toString() || p.id,
      }));
      return NextResponse.json({ products: formatted, source: 'mongodb' });
    }

    // Fallback: If MongoDB collection is empty, fall back to local products
    let fallback = getLocalProducts();
    if (category && category !== 'all') {
      fallback = fallback.filter((p) => p.category === category);
    }
    if (featured === 'true') {
      fallback = fallback.filter((p) => p.is_featured);
    }
    if (search) {
      const s = search.toLowerCase();
      fallback = fallback.filter(
        (p) => p.name.toLowerCase().includes(s) || (p.description ?? '').toLowerCase().includes(s)
      );
    }

    return NextResponse.json({ products: fallback, source: 'local_fallback', notice: 'Database is empty. Use Admin to seed or add products.' });
  } catch (err: any) {
    // If MongoDB is not configured or error connecting, return local products gracefully
    console.warn('MongoDB query failed, serving local fallback products:', err?.message);
    let fallback = getLocalProducts();
    if (category && category !== 'all') {
      fallback = fallback.filter((p) => p.category === category);
    }
    if (featured === 'true') {
      fallback = fallback.filter((p) => p.is_featured);
    }
    return NextResponse.json({
      products: fallback,
      source: 'local_fallback',
      dbError: err?.message,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    // Support single product creation or batch creation (e.g. from AI import)
    const items = Array.isArray(body) ? body : [body];
    const created: any[] = [];

    // Automatically calculate next sort_order so new products append AFTER all existing ones
    const highestSortProduct = await ProductModel.findOne().sort({ sort_order: -1 }).select('sort_order').lean();
    let currentMaxSort = (highestSortProduct?.sort_order ?? -1) + 1;

    for (const item of items) {
      if (!item.name || typeof item.name !== 'string') {
        continue;
      }

      let baseSlug = slugify(item.name) || 'product';
      let uniqueSlug = baseSlug;
      let counter = 1;

      while (await ProductModel.exists({ slug: uniqueSlug })) {
        uniqueSlug = `${baseSlug}-${counter}`;
        counter++;
      }

      const assignedSortOrder = item.sort_order !== undefined && item.sort_order !== null && !isNaN(Number(item.sort_order))
        ? Number(item.sort_order)
        : currentMaxSort++;

      const product = await ProductModel.create({
        name: item.name.trim(),
        slug: uniqueSlug,
        description: item.description || '',
        category: item.category || 'ai_tools',
        price: Number(item.price) || 0,
        market_price: item.market_price ? Number(item.market_price) : null,
        image_url: item.image_url || null,
        badge: item.badge || null,
        delivery_time: item.delivery_time || '5–15 min',
        is_instant: item.is_instant !== false,
        is_featured: Boolean(item.is_featured),
        is_hidden: Boolean(item.is_hidden),
        plan_type: item.plan_type || 'Monthly',
        account_type: item.account_type || null,
        sort_order: assignedSortOrder,
        features: Array.isArray(item.features) ? item.features : [],
        plans: Array.isArray(item.plans) ? item.plans : [],
        how_it_works: Array.isArray(item.how_it_works) ? item.how_it_works : [],
        important_notes: Array.isArray(item.important_notes) ? item.important_notes : [],
        stock_status: item.stock_status || 'in_stock',
      });

      created.push(product.toJSON());
    }

    return NextResponse.json(
      {
        success: true,
        count: created.length,
        products: created,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('Error creating product in MongoDB:', err);
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Failed to create product in database',
      },
      { status: 500 }
    );
  }
}
