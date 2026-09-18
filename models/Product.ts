import mongoose, { Schema, Model, Document } from 'mongoose';
import { Product as ProductType, ProductPlan } from '@/lib/types';

export interface ProductDocument extends Document, Omit<ProductType, 'id'> {
  _id: mongoose.Types.ObjectId;
}

const ProductPlanSchema = new Schema<ProductPlan>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    original_price: { type: Number, default: null },
    duration: { type: String, default: null },
    limits: { type: String, default: null },
    details: { type: String, default: null },
  },
  { _id: false }
);

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true, unique: true },
    description: { type: String, default: '' },
    category: {
      type: String,
      enum: ['reports', 'accounts', 'ai_tools', 'ott', 'services'],
      default: 'ai_tools',
      index: true,
    },
    price: { type: Number, required: true, min: 0 },
    market_price: { type: Number, default: null },
    image_url: { type: String, default: null },
    badge: {
      type: String,
      enum: ['best_seller', 'instant_delivery', 'available_now', 'limited_slots', null],
      default: null,
    },
    delivery_time: { type: String, default: '5–15 min' },
    is_instant: { type: Boolean, default: true },
    is_featured: { type: Boolean, default: false, index: true },
    is_hidden: { type: Boolean, default: false, index: true },
    plan_type: { type: String, default: 'Monthly' },
    account_type: { type: String, default: null },
    sort_order: { type: Number, default: 0 },
    features: { type: [String], default: [] },
    plans: { type: [ProductPlanSchema], default: [] },
    how_it_works: { type: [String], default: [] },
    important_notes: { type: [String], default: [] },
    stock_status: {
      type: String,
      enum: ['in_stock', 'limited', 'out_of_stock'],
      default: 'in_stock',
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

// Prevent re-compilation of model in Next.js hot-reload
export const ProductModel: Model<ProductDocument> =
  mongoose.models.Product || mongoose.model<ProductDocument>('Product', ProductSchema);

export default ProductModel;
