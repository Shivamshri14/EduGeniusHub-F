import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import AdminUserModel, { hashPassword } from '@/models/AdminUser';

// GET admin profile info
export async function GET() {
  try {
    await connectToDatabase();
    const admin = await AdminUserModel.findOne().sort({ created_at: 1 }).select('-passwordHash');
    if (!admin) {
      return NextResponse.json({
        user: { username: process.env.ADMIN_USERNAME || 'admin', name: 'EduGenius Admin', role: 'superadmin' },
      });
    }
    return NextResponse.json({ user: admin });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 });
  }
}

// PUT: Update admin username and/or password in MongoDB Atlas
export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { currentUsername, newUsername, newPassword, name } = body;

    let admin = await AdminUserModel.findOne({
      username: (currentUsername || process.env.ADMIN_USERNAME || 'admin').toLowerCase().trim(),
    });

    if (!admin) {
      admin = await AdminUserModel.findOne().sort({ created_at: 1 });
    }

    if (!admin) {
      // Create if none exists
      const fallbackPass = newPassword || process.env.ADMIN_PASSWORD;
      if (!fallbackPass) {
        return NextResponse.json({ success: false, error: 'Password is required' }, { status: 400 });
      }
      admin = await AdminUserModel.create({
        username: (newUsername || process.env.ADMIN_USERNAME || 'admin').toLowerCase().trim(),
        passwordHash: hashPassword(fallbackPass),
        name: name || 'EduGenius Admin',
        role: 'superadmin',
      });
      return NextResponse.json({
        success: true,
        message: 'Admin account created in MongoDB Atlas!',
        user: { username: admin.username, name: admin.name },
      });
    }

    if (newUsername && newUsername.trim()) {
      admin.username = newUsername.toLowerCase().trim();
    }
    if (newPassword && newPassword.trim()) {
      admin.passwordHash = hashPassword(newPassword.trim());
    }
    if (name && name.trim()) {
      admin.name = name.trim();
    }

    await admin.save();

    return NextResponse.json({
      success: true,
      message: 'Admin credentials successfully updated in MongoDB Atlas!',
      user: { username: admin.username, name: admin.name },
    });
  } catch (err: any) {
    console.error('Error updating admin profile in DB:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to update admin profile' },
      { status: 500 }
    );
  }
}
