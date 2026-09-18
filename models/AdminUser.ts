import mongoose, { Schema, Model, Document } from 'mongoose';
import crypto from 'crypto';

export interface AdminUserDocument extends Document {
  username: string;
  passwordHash: string;
  name: string;
  role: string;
  last_login?: Date;
  created_at: Date;
  updated_at: Date;
  verifyPassword(password: string): boolean;
}

// Simple deterministic hash for admin passwords
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password.trim()).digest('hex');
}

const AdminUserSchema = new Schema<AdminUserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: 'Admin',
    },
    role: {
      type: String,
      default: 'superadmin',
    },
    last_login: {
      type: Date,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

AdminUserSchema.methods.verifyPassword = function (password: string): boolean {
  const hash = hashPassword(password);
  return this.passwordHash === hash;
};

export const AdminUserModel: Model<AdminUserDocument> =
  mongoose.models.AdminUser || mongoose.model<AdminUserDocument>('AdminUser', AdminUserSchema);

export default AdminUserModel;
