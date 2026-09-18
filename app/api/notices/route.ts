import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import NoticeModel from '@/models/Notice';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get('all') === 'true';

  try {
    await connectToDatabase();

    const query: Record<string, any> = {};
    if (!all) {
      query.is_active = true;
      const now = new Date();
      query.$and = [
        { $or: [{ start_date: null }, { start_date: { $lte: now } }] },
        { $or: [{ end_date: null }, { end_date: { $gte: now } }] },
      ];
    }

    const notices = await NoticeModel.find(query)
      .sort({ sort_order: 1, createdAt: -1 })
      .lean();

    const formatted = notices.map((n: any) => ({
      ...n,
      id: n._id?.toString() || n.id,
    }));

    return NextResponse.json({
      success: true,
      notices: formatted,
      count: formatted.length,
    });
  } catch (err: any) {
    console.warn('Failed to fetch notices from DB:', err?.message);
    return NextResponse.json({
      success: false,
      notices: [],
      error: err?.message || 'Database connection error',
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.title || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Title and message are required' },
        { status: 400 }
      );
    }

    const notice = await NoticeModel.create({
      title: body.title.trim(),
      message: body.message.trim(),
      badge: body.badge?.trim() || null,
      type: body.type || 'banner',
      variant: body.variant || 'primary',
      link: body.link?.trim() || null,
      link_text: body.link_text?.trim() || null,
      is_active: body.is_active !== undefined ? Boolean(body.is_active) : true,
      is_dismissible: body.is_dismissible !== undefined ? Boolean(body.is_dismissible) : true,
      sort_order: Number(body.sort_order) || 0,
      start_date: body.start_date ? new Date(body.start_date) : null,
      end_date: body.end_date ? new Date(body.end_date) : null,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Notice created successfully',
        notice: notice.toJSON(),
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('Error creating notice:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to create notice' },
      { status: 500 }
    );
  }
}
