import mongoose, { Schema, Model, Document } from 'mongoose';
import { Faq } from '@/lib/types';

export interface FaqDocument extends Document, Omit<Faq, 'id'> {
  _id: mongoose.Types.ObjectId;
}

const FaqSchema = new Schema<FaqDocument>(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    category: { type: String, default: 'general', trim: true },
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

export const FaqModel: Model<FaqDocument> =
  mongoose.models.Faq || mongoose.model<FaqDocument>('Faq', FaqSchema);

export default FaqModel;
