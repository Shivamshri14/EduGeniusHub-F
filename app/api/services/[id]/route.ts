import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import ServiceModel from '@/models/Service';
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
      return NextResponse.json({ success: false, error: 'Invalid Service ID' }, { status: 400 });
    }

    const updateData: Record<string, any> = {};
    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.description !== undefined) updateData.description = body.description.trim();
    if (body.slug !== undefined) updateData.slug = body.slug ? body.slug.trim() : null;
    if (body.items !== undefined) {
      updateData.items = Array.isArray(body.items)
        ? body.items
        : typeof body.items === 'string'
        ? body.items.split('\n').filter((l: string) => l.trim().length > 0)
        : [];
    }
    if (body.cta_text !== undefined || body.ctaText !== undefined) {
      updateData.cta_text = (body.cta_text || body.ctaText || '').trim();
    }
    if (body.cta_type !== undefined || body.ctaType !== undefined) {
      updateData.cta_type = (body.cta_type || body.ctaType || '').trim();
    }
    if (body.sort_order !== undefined) updateData.sort_order = Number(body.sort_order) || 0;
    if (body.is_active !== undefined) updateData.is_active = Boolean(body.is_active);

    const updated = await ServiceModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Service updated',
      service: { ...updated, id: (updated as any)._id?.toString() },
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
      return NextResponse.json({ success: false, error: 'Invalid Service ID' }, { status: 400 });
    }

    const deleted = await ServiceModel.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Service deleted' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 });
  }
}
