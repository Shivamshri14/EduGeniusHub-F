import mongoose, { Schema, Model, Document } from 'mongoose';
import { ReviewItemData } from '@/lib/types';

export interface ReviewDocument extends Document, Omit<ReviewItemData, 'id'> {
  _id: mongoose.Types.ObjectId;
}

const ReviewSchema = new Schema<ReviewDocument>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, default: null, trim: true },
    quote: { type: String, required: true, trim: true },
    image_url: { type: String, default: null, trim: true },
    rating: { type: Number, default: 5, min: 1, max: 5 },
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

export const ReviewModel: Model<ReviewDocument> =
  mongoose.models.Review || mongoose.model<ReviewDocument>('Review', ReviewSchema);

export default ReviewModel;
