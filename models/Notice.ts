import mongoose, { Schema, Model, Document } from 'mongoose';
import { NoticeItem } from '@/lib/types';

export interface NoticeDocument extends Document, Omit<NoticeItem, 'id' | 'start_date' | 'end_date'> {
  _id: mongoose.Types.ObjectId;
  start_date?: Date | null;
  end_date?: Date | null;
}

const NoticeSchema = new Schema<NoticeDocument>(
  {
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    badge: { type: String, default: null, trim: true },
    type: {
      type: String,
      enum: ['banner', 'alert', 'popup'],
      default: 'banner',
    },
    variant: {
      type: String,
      enum: ['primary', 'warning', 'info', 'success', 'destructive'],
      default: 'primary',
    },
    link: { type: String, default: null, trim: true },
    link_text: { type: String, default: null, trim: true },
    is_active: { type: Boolean, default: true, index: true },
    is_dismissible: { type: Boolean, default: true },
    sort_order: { type: Number, default: 0 },
    start_date: { type: Date, default: null },
    end_date: { type: Date, default: null },
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

export const NoticeModel: Model<NoticeDocument> =
  mongoose.models.Notice || mongoose.model<NoticeDocument>('Notice', NoticeSchema);

export default NoticeModel;
