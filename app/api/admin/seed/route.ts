import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import ProductModel from '@/models/Product';
import FaqModel from '@/models/Faq';
import ServiceModel from '@/models/Service';
import ReviewModel from '@/models/Review';
import SiteConfigModel from '@/models/SiteConfig';
import NoticeModel from '@/models/Notice';
import { TOOLS } from '@/lib/tools';
import { FAQS } from '@/lib/faqs';
import { services as staticServices, customRequirement } from '@/lib/services';
import { reviews as staticReviews } from '@/lib/reviews';
import { TESTIMONIALS, TRUST_STATS } from '@/lib/testimonials';
import { SITE } from '@/lib/config';
import { heroContent, resellerContent } from '@/lib/homeContent';

const CATEGORY_MAP: Record<string, 'reports' | 'accounts' | 'ai_tools' | 'ott' | 'services'> = {
  report: 'reports',
  account: 'ai_tools',
  ott: 'ott',
};

const BADGE_MAP: Record<string, 'best_seller' | 'instant_delivery' | 'available_now' | 'limited_slots'> = {
  'turnitin-plag': 'best_seller',
  'turnitin-ai': 'best_seller',
  'turnitin-combo': 'instant_delivery',
  'chatgpt-plus': 'best_seller',
  'netflix-premium': 'best_seller',
  'quillbot-premium': 'available_now',
  'grammarly-premium': 'available_now',
  'paperpal': 'available_now',
  'jenni-ai': 'available_now',
  'perplexity-ai': 'available_now',
  'prime-video': 'limited_slots',
  'zee5-premium': 'available_now',
  'sonyliv-premium': 'available_now',
};

const FEATURED = ['turnitin-plag', 'turnitin-combo', 'chatgpt-plus', 'netflix-premium', 'quillbot-premium', 'grammarly-premium'];

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json().catch(() => ({}));
    const force = Boolean(body.force);

    const report: Record<string, any> = {};

    // 1. Seed Products
    const productCount = await ProductModel.countDocuments();
    if (productCount === 0 || force) {
      if (force) await ProductModel.deleteMany({});

      const productDocs = TOOLS.map((t, index) => {
        const cat = CATEGORY_MAP[t.category] || 'ai_tools';
        return {
          name: t.name,
          slug: t.id,
          description: t.description || `Official ${t.name} with instant delivery and dedicated support.`,
          category: cat,
          price: t.ourPrice,
          market_price: t.marketPrice,
          image_url: null,
          badge: BADGE_MAP[t.id] || null,
          delivery_time: t.category === 'report' ? '30–60 min' : '5–15 min',
          is_instant: t.category !== 'report',
          is_featured: FEATURED.includes(t.id),
          is_hidden: !(t.display ?? true),
          plan_type: t.planType || 'Monthly',
          account_type: t.accountType || null,
          sort_order: index,
          features: [
            'Instant WhatsApp Fulfillment',
            '100% Guaranteed Validity',
            'Dedicated Customer Support',
            t.accountType === 'shared' ? 'Shared profile with private pin' : 'Private access',
          ],
          plans: [
            {
              name: `${t.planType || 'Standard'} Plan`,
              price: t.ourPrice,
              original_price: t.marketPrice,
              duration: t.planType || 'Monthly',
            },
          ],
          how_it_works: [
            'Choose your tool or plan',
            'Connect on WhatsApp to confirm details',
            'Receive credentials or report in minutes',
          ],
          important_notes: t.accountType === 'shared' ? ['Shared account: please do not modify account settings'] : [],
          stock_status: 'in_stock',
        };
      });

      await ProductModel.insertMany(productDocs);
      report.products = `Seeded ${productDocs.length} products`;
    } else {
      report.products = `Skipped: ${productCount} products already exist`;
    }

    // 2. Seed FAQs
    const faqCount = await FaqModel.countDocuments();
    if (faqCount === 0 || force) {
      if (force) await FaqModel.deleteMany({});
      const faqDocs = FAQS.map((f, i) => ({
        question: f.question,
        answer: f.answer,
        category: 'general',
        sort_order: i,
        is_active: true,
      }));
      await FaqModel.insertMany(faqDocs);
      report.faqs = `Seeded ${faqDocs.length} FAQs`;
    } else {
      report.faqs = `Skipped: ${faqCount} FAQs already exist`;
    }

    // 3. Seed Services
    const serviceCount = await ServiceModel.countDocuments();
    if (serviceCount === 0 || force) {
      if (force) await ServiceModel.deleteMany({});
      const serviceDocs = [
        ...staticServices.map((s, i) => ({
          slug: s.id,
          title: s.title,
          description: s.description,
          items: s.items,
          cta_text: s.ctaText,
          cta_type: s.ctaType,
          sort_order: s.sortOrder ?? i,
          is_active: s.active,
        })),
        {
          slug: 'custom-requirement',
          title: customRequirement.title,
          description: customRequirement.description,
          items: [
            'Custom Subscriptions',
            'Bulk Account Requests',
            'Dedicated Project Support',
          ],
          cta_text: customRequirement.ctaText,
          cta_type: customRequirement.ctaType,
          sort_order: customRequirement.sortOrder ?? 10,
          is_active: customRequirement.active,
        },
      ];
      await ServiceModel.insertMany(serviceDocs);
      report.services = `Seeded ${serviceDocs.length} services`;
    } else {
      report.services = `Skipped: ${serviceCount} services already exist`;
    }

    // 4. Seed Reviews & Testimonials
    const reviewCount = await ReviewModel.countDocuments();
    if (reviewCount === 0 || force) {
      if (force) await ReviewModel.deleteMany({});
      const reviewDocs = [
        ...staticReviews.map((r, i) => ({
          name: r.name,
          role: 'Verified Customer',
          quote: r.quote,
          image_url: r.imageUrl,
          rating: 5,
          sort_order: r.sortOrder ?? i,
          is_active: r.active,
        })),
        ...TESTIMONIALS.map((t, i) => ({
          name: t.name,
          role: t.role,
          quote: t.quote,
          image_url: null,
          rating: t.rating || 5,
          sort_order: 10 + i,
          is_active: true,
        })),
      ];
      await ReviewModel.insertMany(reviewDocs);
      report.reviews = `Seeded ${reviewDocs.length} reviews`;
    } else {
      report.reviews = `Skipped: ${reviewCount} reviews already exist`;
    }

    // 5. Seed Site Settings / Config
    const configExists = await SiteConfigModel.findOne();
    if (!configExists || force) {
      if (force) await SiteConfigModel.deleteMany({});
      await SiteConfigModel.create({
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
      });
      report.settings = 'Seeded default site configuration';
    } else {
      report.settings = 'Skipped: Site configuration already exists';
    }

    // 6. Seed Welcome Notice / Announcement Banner if none exist
    const noticeCount = await NoticeModel.countDocuments();
    if (noticeCount === 0 || force) {
      if (force) await NoticeModel.deleteMany({});
      await NoticeModel.create({
        title: 'Instant Delivery via WhatsApp',
        message: 'Get Turnitin Plagiarism & AI Reports within 10–20 minutes! Order directly via WhatsApp.',
        badge: '🔥 SPECIAL OFFER',
        type: 'banner',
        variant: 'primary',
        link: '/products?category=reports',
        link_text: 'View Reports',
        is_active: true,
        is_dismissible: true,
        sort_order: 0,
      });
      report.notices = 'Seeded welcome active notice banner';
    } else {
      report.notices = `Skipped: ${noticeCount} notices already exist`;
    }

    return NextResponse.json({
      success: true,
      message: 'MongoDB database seed completed successfully!',
      report,
    });
  } catch (err: any) {
    console.error('Error seeding database:', err);
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Failed to seed MongoDB Atlas',
      },
      { status: 500 }
    );
  }
}
