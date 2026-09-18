import { NextResponse } from 'next/server';
import { checkMongoConnection } from '@/lib/mongodb';
import ProductModel from '@/models/Product';

export async function GET() {
  const mongoStatus = await checkMongoConnection();
  const geminiConfigured = Boolean(
    process.env.GEMINI_API_KEY &&
      process.env.GEMINI_API_KEY.trim() !== '' &&
      process.env.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY'
  );

  let productCount = 0;
  if (mongoStatus.connected) {
    try {
      productCount = await ProductModel.countDocuments();
    } catch {
      productCount = 0;
    }
  }

  return NextResponse.json({
    mongodb: {
      ...mongoStatus,
      productCount,
    },
    gemini: {
      configured: geminiConfigured,
      model: 'gemini-2.0-flash',
    },
  });
}
