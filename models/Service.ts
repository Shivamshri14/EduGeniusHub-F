import mongoose, { Schema, Model, Document } from 'mongoose';
import { ServiceItem } from '@/lib/types';

export interface ServiceDocument extends Document, Omit<ServiceItem, 'id'> {
  _id: mongoose.Types.ObjectId;
}

const ServiceSchema = new Schema<ServiceDocument>(
  {
    slug: { type: String, trim: true, default: null },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    items: { type: [String], default: [] },
    cta_text: { type: String, default: 'Inquire on WhatsApp', trim: true },
    cta_type: { type: String, default: 'whatsapp', trim: true },
    sort_order: { type: Number, default: 0 },
    is_active: { type: Boolean, default: true, index: true },
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

export const ServiceModel: Model<ServiceDocument> =
  mongoose.models.Service || mongoose.model<ServiceDocument>('Service', ServiceSchema);

export default ServiceModel;
