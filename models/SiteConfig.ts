import mongoose, { Schema, Model, Document } from 'mongoose';
import { SiteConfigData } from '@/lib/types';

export interface SiteConfigDocument extends Document, Omit<SiteConfigData, 'id'> {
  _id: mongoose.Types.ObjectId;
}

const SiteConfigSchema = new Schema<SiteConfigDocument>(
  {
    brand: { type: String, default: 'EduGenius Hub', trim: true },
    phone_display: { type: String, default: '+91 87662 53356', trim: true },
    phone_e164: { type: String, default: '918766253356', trim: true },
    whatsapp_community_url: {
      type: String,
      default: 'https://chat.whatsapp.com/FtMZUM8Ql41IkUXSmw3pBU',
      trim: true,
    },
    instagram_url: {
      type: String,
      default: 'https://www.instagram.com/edugenius.hub1',
      trim: true,
    },
    reports_delivered: { type: String, default: '12000+', trim: true },
    students_served: { type: String, default: '5000+', trim: true },
    satisfaction: { type: String, default: '99%', trim: true },
    response_time: { type: String, default: '< 2 mins', trim: true },
    hero_headline: { type: String, default: 'What do you need today?', trim: true },
    hero_subheadline: {
      type: String,
      default: 'Academic Reports, AI Tools, Premium Accounts & OTT Subscriptions — all in one place.',
      trim: true,
    },
    reseller_title: {
      type: String,
      default: 'Are you a reseller? Looking for a similar website like us?',
      trim: true,
    },
    reseller_description: {
      type: String,
      default: 'DM now and get your own premium tools website. Perfect for resellers who want to sell premium subscriptions.',
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_: any, ret: any) => {
        ret.id = ret._id?.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const SiteConfigModel: Model<SiteConfigDocument> =
  mongoose.models.SiteConfig || mongoose.model<SiteConfigDocument>('SiteConfig', SiteConfigSchema);

export default SiteConfigModel;
