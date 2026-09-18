import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import ServiceModel from '@/models/Service';
import { services as staticServices, customRequirement } from '@/lib/services';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get('all') === 'true';

  try {
    await connectToDatabase();

    const query: Record<string, any> = {};
    if (!all) {
      query.is_active = true;
    }

    const services = await ServiceModel.find(query).sort({ sort_order: 1, createdAt: 1 }).lean();

    if (services && services.length > 0) {
      const formatted = services.map((s: any) => ({
        id: s._id?.toString() || s.id,
        slug: s.slug,
        title: s.title,
        description: s.description,
        items: s.items || [],
        cta_text: s.cta_text || 'Inquire on WhatsApp',
        cta_type: s.cta_type || 'whatsapp',
        ctaText: s.cta_text || 'Inquire on WhatsApp',
        ctaType: s.cta_type || 'whatsapp',
        sort_order: s.sort_order,
        is_active: s.is_active,
        created_at: s.createdAt,
      }));
      return NextResponse.json({ success: true, services: formatted, source: 'mongodb' });
    }

    // Fallback to static lib/services.ts
    const fallbackList = [
      ...staticServices.map((s) => ({
        id: s.id,
        slug: s.id,
        title: s.title,
        description: s.description,
        items: s.items,
        cta_text: s.ctaText,
        cta_type: s.ctaType,
        ctaText: s.ctaText,
        ctaType: s.ctaType,
        sort_order: s.sortOrder,
        is_active: s.active,
      })),
      {
        id: 'custom-requirement',
        slug: 'custom-requirement',
        title: customRequirement.title,
        description: customRequirement.description,
        items: [],
        cta_text: customRequirement.ctaText,
        cta_type: customRequirement.ctaType,
        ctaText: customRequirement.ctaText,
        ctaType: customRequirement.ctaType,
        sort_order: customRequirement.sortOrder,
        is_active: customRequirement.active,
      },
    ];

    return NextResponse.json({ success: true, services: fallbackList, source: 'fallback' });
  } catch (err: any) {
    console.warn('MongoDB query for Services failed, serving fallback:', err?.message);
    const fallbackList = [
      ...staticServices.map((s) => ({
        id: s.id,
        slug: s.id,
        title: s.title,
        description: s.description,
        items: s.items,
        cta_text: s.ctaText,
        cta_type: s.ctaType,
        ctaText: s.ctaText,
        ctaType: s.ctaType,
        sort_order: s.sortOrder,
        is_active: s.active,
      })),
      {
        id: 'custom-requirement',
        slug: 'custom-requirement',
        title: customRequirement.title,
        description: customRequirement.description,
        items: [],
        cta_text: customRequirement.ctaText,
        cta_type: customRequirement.ctaType,
        ctaText: customRequirement.ctaText,
        ctaType: customRequirement.ctaType,
        sort_order: customRequirement.sortOrder,
        is_active: customRequirement.active,
      },
    ];
    return NextResponse.json({ success: true, services: fallbackList, source: 'fallback', error: err?.message });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.title || !body.description) {
      return NextResponse.json({ success: false, error: 'Title and description are required' }, { status: 400 });
    }

    const items = Array.isArray(body.items)
      ? body.items
      : typeof body.items === 'string'
      ? body.items.split('\n').filter((l: string) => l.trim().length > 0)
      : [];

    const service = await ServiceModel.create({
      title: body.title.trim(),
      slug: body.slug ? body.slug.trim() : null,
      description: body.description.trim(),
      items,
      cta_text: body.cta_text?.trim() || body.ctaText?.trim() || 'Inquire on WhatsApp',
      cta_type: body.cta_type?.trim() || body.ctaType?.trim() || 'whatsapp',
      sort_order: Number(body.sort_order) || 0,
      is_active: body.is_active !== undefined ? Boolean(body.is_active) : true,
    });

    return NextResponse.json({ success: true, message: 'Service created', service: service.toJSON() }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Failed to create service' }, { status: 500 });
  }
}
