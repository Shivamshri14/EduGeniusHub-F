import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';
import ProductModel from '@/models/Product';

interface RouteParams {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const { id } = params;

    let product = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      product = await ProductModel.findById(id).lean();
    }
    if (!product) {
      product = await ProductModel.findOne({ slug: id }).lean();
    }

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({
      product: {
        ...product,
        id: (product as any)._id?.toString() || (product as any).id,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const { id } = params;
    const body = await request.json();

    let query: any = {};
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { _id: id };
    } else {
      query = { slug: id };
    }

    const updated = await ProductModel.findOneAndUpdate(
      query,
      {
        $set: {
          name: body.name,
          description: body.description,
          category: body.category,
          price: Number(body.price),
          market_price: body.market_price ? Number(body.market_price) : null,
          image_url: body.image_url,
          badge: body.badge,
          delivery_time: body.delivery_time,
          is_instant: body.is_instant,
          is_featured: body.is_featured,
          is_hidden: body.is_hidden,
          plan_type: body.plan_type,
          account_type: body.account_type,
          sort_order: Number(body.sort_order) || 0,
          features: body.features || [],
          plans: body.plans || [],
          how_it_works: body.how_it_works || [],
          important_notes: body.important_notes || [],
          stock_status: body.stock_status || 'in_stock',
        },
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      product: updated.toJSON(),
    });
  } catch (err: any) {
    console.error('Error updating product:', err);
    return NextResponse.json({ error: err?.message || 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    await connectToDatabase();
    const { id } = params;

    let query: any = {};
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { _id: id };
    } else {
      query = { slug: id };
    }

    const deleted = await ProductModel.findOneAndDelete(query);
    if (!deleted) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
      id,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed to delete product' }, { status: 500 });
  }
}
