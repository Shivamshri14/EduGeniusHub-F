import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import ProductModel from '@/models/Product';
import { TOOLS } from '@/lib/tools';

const CATEGORY_MAP: Record<string, 'reports' | 'accounts' | 'ai_tools' | 'ott' | 'services'> = {
  report: 'reports',
  account: 'ai_tools',
  ott: 'ott',
};

const BADGE_MAP: Record<string, 'best_seller' | 'instant_delivery' | 'available_now' | 'limited_slots'> = {
  'turnitin-plag': 'best_seller',
  'turnitin-ai': 'best_seller',
  'turnitin-combo': 'instant_delivery',
  'chatgpt-plus': 'best_seller',
  'netflix-premium': 'best_seller',
  'quillbot-premium': 'available_now',
  'grammarly-premium': 'available_now',
  'paperpal': 'available_now',
  'jenni-ai': 'available_now',
  'perplexity-ai': 'available_now',
  'prime-video': 'limited_slots',
  'zee5-premium': 'available_now',
  'sonyliv-premium': 'available_now',
};

const FEATURED = ['turnitin-plag', 'turnitin-combo', 'chatgpt-plus', 'netflix-premium', 'quillbot-premium', 'grammarly-premium'];

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json().catch(() => ({}));
    const force = Boolean(body.force);

    const existingCount = await ProductModel.countDocuments();
    if (existingCount > 0 && !force) {
      return NextResponse.json({
        success: false,
        message: `Database already has ${existingCount} products. Pass { force: true } to overwrite or add new products.`,
        existingCount,
      });
    }

    if (force) {
      await ProductModel.deleteMany({});
    }

    const docs = TOOLS.map((t, index) => {
      const cat = CATEGORY_MAP[t.category] || 'ai_tools';
      return {
        name: t.name,
        slug: t.id,
        description: t.description || `Official ${t.name} with instant delivery and dedicated support.`,
        category: cat,
        price: t.ourPrice,
        market_price: t.marketPrice,
        image_url: null,
        badge: BADGE_MAP[t.id] || null,
        delivery_time: t.category === 'report' ? '30–60 min' : '5–15 min',
        is_instant: t.category !== 'report',
        is_featured: FEATURED.includes(t.id),
        is_hidden: !(t.display ?? true),
        plan_type: t.planType || 'Monthly',
        account_type: t.accountType || null,
        sort_order: index,
        features: [
          'Instant WhatsApp Fulfillment',
          '100% Guaranteed Validity',
          'Dedicated Customer Support',
          t.accountType === 'shared' ? 'Shared profile with private pin' : 'Private access',
        ],
        plans: [
          {
            name: `${t.planType || 'Standard'} Plan`,
            price: t.ourPrice,
            original_price: t.marketPrice,
            duration: t.planType || 'Monthly',
          },
        ],
        how_it_works: [
          'Choose your tool or plan',
          'Connect on WhatsApp to confirm details',
          'Receive credentials or report in minutes',
        ],
        important_notes: t.accountType === 'shared' ? ['Shared account: please do not modify account settings'] : [],
        stock_status: 'in_stock',
      };
    });

    await ProductModel.insertMany(docs);

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${docs.length} products to MongoDB Atlas!`,
      count: docs.length,
    });
  } catch (err: any) {
    console.error('Error seeding database:', err);
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Failed to seed MongoDB Atlas',
      },
      { status: 500 }
    );
  }
}
