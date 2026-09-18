import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import ReviewModel from '@/models/Review';
import mongoose from 'mongoose';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid Review ID' }, { status: 400 });
    }

    const updateData: Record<string, any> = {};
    if (body.name !== undefined) updateData.name = body.name.trim();
    if (body.role !== undefined) updateData.role = body.role ? body.role.trim() : null;
    if (body.quote !== undefined) updateData.quote = body.quote.trim();
    if (body.image_url !== undefined || body.imageUrl !== undefined) {
      updateData.image_url = (body.image_url || body.imageUrl || '').trim() || null;
    }
    if (body.rating !== undefined) updateData.rating = Number(body.rating) || 5;
    if (body.sort_order !== undefined) updateData.sort_order = Number(body.sort_order) || 0;
    if (body.is_active !== undefined) updateData.is_active = Boolean(body.is_active);

    const updated = await ReviewModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Review updated',
      review: { ...updated, id: (updated as any)._id?.toString() },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid Review ID' }, { status: 400 });
    }

    const deleted = await ReviewModel.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Review deleted' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 });
  }
}
