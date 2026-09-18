import { NextRequest, NextResponse } from 'next/server';
import { parseMessageWithGemini } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawMessage = body?.message;
    const customPrompt = body?.customPrompt;

    if (!rawMessage || typeof rawMessage !== 'string' || rawMessage.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Please provide promotional message text to parse.' },
        { status: 400 }
      );
    }

    const result = await parseMessageWithGemini(rawMessage.trim(), customPrompt);

    return NextResponse.json({
      success: true,
      products: result.products,
      source: result.source,
      count: result.products.length,
      notice:
        result.source === 'smart-heuristic-fallback'
          ? 'Parsed using built-in heuristic parser. For maximum AI accuracy with Gemini 2.0 Flash, add GEMINI_API_KEY in your .env.local'
          : undefined,
    });
  } catch (err: any) {
    console.error('Error in AI parse route:', err);
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Failed to parse promotional message',
      },
      { status: 500 }
    );
  }
}
