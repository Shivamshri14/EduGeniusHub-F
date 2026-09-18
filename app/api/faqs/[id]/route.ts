import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import FaqModel from '@/models/Faq';
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
      return NextResponse.json({ success: false, error: 'Invalid FAQ ID' }, { status: 400 });
    }

    const updateData: Record<string, any> = {};
    if (body.question !== undefined) updateData.question = body.question.trim();
    if (body.answer !== undefined) updateData.answer = body.answer.trim();
    if (body.category !== undefined) updateData.category = body.category.trim();
    if (body.sort_order !== undefined) updateData.sort_order = Number(body.sort_order) || 0;
    if (body.is_active !== undefined) updateData.is_active = Boolean(body.is_active);

    const updated = await FaqModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
    if (!updated) {
      return NextResponse.json({ success: false, error: 'FAQ not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'FAQ updated',
      faq: { ...updated, id: (updated as any)._id?.toString() },
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
      return NextResponse.json({ success: false, error: 'Invalid FAQ ID' }, { status: 400 });
    }

    const deleted = await FaqModel.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'FAQ not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'FAQ deleted' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 });
  }
}
