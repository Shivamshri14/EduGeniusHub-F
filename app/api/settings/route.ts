import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import SiteConfigModel from '@/models/SiteConfig';
import { SITE } from '@/lib/config';
import { TRUST_STATS } from '@/lib/testimonials';
import { resellerContent, heroContent } from '@/lib/homeContent';

export async function GET() {
  try {
    await connectToDatabase();

    const config = await SiteConfigModel.findOne().lean();

    if (config) {
      return NextResponse.json({
        success: true,
        settings: {
          ...config,
          id: (config as any)._id?.toString(),
        },
        source: 'mongodb',
      });
    }

    // Default fallback from lib/config.ts, lib/testimonials.ts, lib/homeContent.ts
    const fallback = {
      brand: SITE.brand,
      phone_display: SITE.phoneDisplay,
      phone_e164: SITE.phoneE164,
      whatsapp_community_url: SITE.whatsappCommunityUrl,
      instagram_url: SITE.instagramUrl,
      reports_delivered: TRUST_STATS.reports_delivered,
      students_served: TRUST_STATS.students_served,
      satisfaction: TRUST_STATS.satisfaction,
      response_time: TRUST_STATS.response_time,
      hero_headline: heroContent.headline,
      hero_subheadline: heroContent.subheadline,
      reseller_title: resellerContent.title,
      reseller_description: resellerContent.description,
    };

    return NextResponse.json({ success: true, settings: fallback, source: 'fallback' });
  } catch (err: any) {
    console.warn('MongoDB query for settings failed, serving fallback:', err?.message);
    const fallback = {
      brand: SITE.brand,
      phone_display: SITE.phoneDisplay,
      phone_e164: SITE.phoneE164,
      whatsapp_community_url: SITE.whatsappCommunityUrl,
      instagram_url: SITE.instagramUrl,
      reports_delivered: TRUST_STATS.reports_delivered,
      students_served: TRUST_STATS.students_served,
      satisfaction: TRUST_STATS.satisfaction,
      response_time: TRUST_STATS.response_time,
      hero_headline: heroContent.headline,
      hero_subheadline: heroContent.subheadline,
      reseller_title: resellerContent.title,
      reseller_description: resellerContent.description,
    };
    return NextResponse.json({ success: true, settings: fallback, source: 'fallback', error: err?.message });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();

    let config = await SiteConfigModel.findOne();

    const fields = [
      'brand',
      'phone_display',
      'phone_e164',
      'whatsapp_community_url',
      'instagram_url',
      'reports_delivered',
      'students_served',
      'satisfaction',
      'response_time',
      'hero_headline',
      'hero_subheadline',
      'reseller_title',
      'reseller_description',
    ];

    const updateData: Record<string, any> = {};
    for (const field of fields) {
      if (body[field] !== undefined) {
        updateData[field] = typeof body[field] === 'string' ? body[field].trim() : body[field];
      }
    }

    if (!config) {
      config = await SiteConfigModel.create({
        brand: updateData.brand || SITE.brand,
        phone_display: updateData.phone_display || SITE.phoneDisplay,
        phone_e164: updateData.phone_e164 || SITE.phoneE164,
        whatsapp_community_url: updateData.whatsapp_community_url || SITE.whatsappCommunityUrl,
        instagram_url: updateData.instagram_url || SITE.instagramUrl,
        reports_delivered: updateData.reports_delivered || TRUST_STATS.reports_delivered,
        students_served: updateData.students_served || TRUST_STATS.students_served,
        satisfaction: updateData.satisfaction || TRUST_STATS.satisfaction,
        response_time: updateData.response_time || TRUST_STATS.response_time,
        hero_headline: updateData.hero_headline || heroContent.headline,
        hero_subheadline: updateData.hero_subheadline || heroContent.subheadline,
        reseller_title: updateData.reseller_title || resellerContent.title,
        reseller_description: updateData.reseller_description || resellerContent.description,
      });
    } else {
      Object.assign(config, updateData);
      await config.save();
    }

    return NextResponse.json({
      success: true,
      message: 'Site configuration updated successfully',
      settings: config.toJSON(),
    });
  } catch (err: any) {
    console.error('Error updating site config:', err);
    return NextResponse.json({ success: false, error: err?.message || 'Failed to update settings' }, { status: 500 });
  }
}
