import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import ReviewModel from '@/models/Review';
import { reviews as staticReviews } from '@/lib/reviews';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get('all') === 'true';

  try {
    await connectToDatabase();

    const query: Record<string, any> = {};
    if (!all) {
      query.is_active = true;
    }

    const reviews = await ReviewModel.find(query).sort({ sort_order: 1, createdAt: -1 }).lean();

    if (reviews && reviews.length > 0) {
      const formatted = reviews.map((r: any) => ({
        id: r._id?.toString() || r.id,
        name: r.name,
        role: r.role,
        quote: r.quote,
        image_url: r.image_url,
        imageUrl: r.image_url, // For backwards compatibility with ReviewsSection
        rating: r.rating || 5,
        sort_order: r.sort_order,
        is_active: r.is_active,
        created_at: r.createdAt,
      }));
      return NextResponse.json({ success: true, reviews: formatted, source: 'mongodb' });
    }

    // Fallback to static lib/reviews.ts
    const fallback = staticReviews.map((r, i) => ({
      id: r.id,
      name: r.name,
      role: null,
      quote: r.quote,
      image_url: r.imageUrl,
      imageUrl: r.imageUrl,
      rating: 5,
      sort_order: r.sortOrder ?? i,
      is_active: r.active,
    }));

    return NextResponse.json({ success: true, reviews: fallback, source: 'fallback' });
  } catch (err: any) {
    console.warn('MongoDB query for Reviews failed, serving fallback:', err?.message);
    const fallback = staticReviews.map((r, i) => ({
      id: r.id,
      name: r.name,
      role: null,
      quote: r.quote,
      image_url: r.imageUrl,
      imageUrl: r.imageUrl,
      rating: 5,
      sort_order: r.sortOrder ?? i,
      is_active: r.active,
    }));
    return NextResponse.json({ success: true, reviews: fallback, source: 'fallback', error: err?.message });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.name || !body.quote) {
      return NextResponse.json({ success: false, error: 'Name and quote are required' }, { status: 400 });
    }

    const review = await ReviewModel.create({
      name: body.name.trim(),
      role: body.role?.trim() || null,
      quote: body.quote.trim(),
      image_url: body.image_url || body.imageUrl || null,
      rating: Number(body.rating) || 5,
      sort_order: Number(body.sort_order) || 0,
      is_active: body.is_active !== undefined ? Boolean(body.is_active) : true,
    });

    return NextResponse.json({ success: true, message: 'Review created', review: review.toJSON() }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Failed to create review' }, { status: 500 });
  }
}
