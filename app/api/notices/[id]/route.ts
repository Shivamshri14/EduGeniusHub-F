import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import NoticeModel from '@/models/Notice';
import mongoose from 'mongoose';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid notice ID' }, { status: 400 });
    }

    const notice = await NoticeModel.findById(id).lean();
    if (!notice) {
      return NextResponse.json({ success: false, error: 'Notice not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      notice: { ...notice, id: (notice as any)._id?.toString() },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const { id } = params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: 'Invalid notice ID' }, { status: 400 });
    }

    const updateData: Record<string, any> = {};
    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.message !== undefined) updateData.message = body.message.trim();
    if (body.badge !== undefined) updateData.badge = body.badge ? body.badge.trim() : null;
    if (body.type !== undefined) updateData.type = body.type;
    if (body.variant !== undefined) updateData.variant = body.variant;
    if (body.link !== undefined) updateData.link = body.link ? body.link.trim() : null;
    if (body.link_text !== undefined) updateData.link_text = body.link_text ? body.link_text.trim() : null;
    if (body.is_active !== undefined) updateData.is_active = Boolean(body.is_active);
    if (body.is_dismissible !== undefined) updateData.is_dismissible = Boolean(body.is_dismissible);
    if (body.sort_order !== undefined) updateData.sort_order = Number(body.sort_order) || 0;
    if (body.start_date !== undefined) updateData.start_date = body.start_date ? new Date(body.start_date) : null;
    if (body.end_date !== undefined) updateData.end_date = body.end_date ? new Date(body.end_date) : null;

    const updated = await NoticeModel.findByIdAndUpdate(id, updateData, { new: true }).lean();

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Notice not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Notice updated successfully',
      notice: { ...updated, id: (updated as any)._id?.toString() },
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
      return NextResponse.json({ success: false, error: 'Invalid notice ID' }, { status: 400 });
    }

    const deleted = await NoticeModel.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Notice not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Notice deleted successfully',
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 });
  }
}
