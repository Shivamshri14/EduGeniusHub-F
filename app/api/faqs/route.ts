import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import FaqModel from '@/models/Faq';
import { FAQS } from '@/lib/faqs';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get('all') === 'true';

  try {
    await connectToDatabase();

    const query: Record<string, any> = {};
    if (!all) {
      query.is_active = true;
    }

    const faqs = await FaqModel.find(query).sort({ sort_order: 1, createdAt: 1 }).lean();

    if (faqs && faqs.length > 0) {
      const formatted = faqs.map((f: any) => ({
        id: f._id?.toString() || f.id,
        question: f.question,
        answer: f.answer,
        category: f.category,
        sort_order: f.sort_order,
        is_active: f.is_active,
        created_at: f.createdAt,
      }));
      return NextResponse.json({ success: true, faqs: formatted, source: 'mongodb' });
    }

    // Fallback to static lib/faqs.ts if database is empty
    const fallback = FAQS.map((f, i) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
      category: 'general',
      sort_order: i,
      is_active: true,
    }));

    return NextResponse.json({ success: true, faqs: fallback, source: 'fallback' });
  } catch (err: any) {
    console.warn('MongoDB query for FAQs failed, serving fallback:', err?.message);
    const fallback = FAQS.map((f, i) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
      category: 'general',
      sort_order: i,
      is_active: true,
    }));
    return NextResponse.json({ success: true, faqs: fallback, source: 'fallback', error: err?.message });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.question || !body.answer) {
      return NextResponse.json({ success: false, error: 'Question and answer are required' }, { status: 400 });
    }

    const faq = await FaqModel.create({
      question: body.question.trim(),
      answer: body.answer.trim(),
      category: body.category || 'general',
      sort_order: Number(body.sort_order) || 0,
      is_active: body.is_active !== undefined ? Boolean(body.is_active) : true,
    });

    return NextResponse.json({ success: true, message: 'FAQ created', faq: faq.toJSON() }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message || 'Failed to create FAQ' }, { status: 500 });
  }
}
