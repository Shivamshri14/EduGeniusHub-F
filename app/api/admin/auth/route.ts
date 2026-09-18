import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import AdminUserModel, { hashPassword } from '@/models/AdminUser';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password is required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB Atlas
    await connectToDatabase();

    // Check if any admin exists. If not, seed from environment variable if configured
    const adminCount = await AdminUserModel.countDocuments();
    if (adminCount === 0) {
      const initialUsername = process.env.ADMIN_USERNAME || 'admin';
      const initialPassword = process.env.ADMIN_PASSWORD || process.env.ADMIN_INITIAL_PASSWORD;
      if (initialPassword) {
        console.log('Seeding initial admin user in MongoDB Atlas from env configuration...');
        await AdminUserModel.create({
          username: initialUsername.toLowerCase().trim(),
          passwordHash: hashPassword(initialPassword),
          name: 'EduGenius Admin',
          role: 'superadmin',
        });
      }
    }

    // Look for admin by username or if password-only is provided, check any active admin
    const targetUsername = (username || process.env.ADMIN_USERNAME || '').toLowerCase().trim();
    let admin = targetUsername ? await AdminUserModel.findOne({ username: targetUsername }) : null;

    if (!admin && !username) {
      // If user only entered password, try finding matching admin
      const allAdmins = await AdminUserModel.find();
      admin = allAdmins.find((a) => a.passwordHash === hashPassword(password)) || null;
    }

    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    if (!admin.verifyPassword(password)) {
      return NextResponse.json(
        { success: false, error: 'Incorrect password' },
        { status: 401 }
      );
    }

    // Update last login timestamp in MongoDB
    admin.last_login = new Date();
    await admin.save();

    return NextResponse.json({
      success: true,
      token: 'admin_authenticated',
      user: {
        username: admin.username,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (err: any) {
    console.error('Error during admin authentication:', err);
    return NextResponse.json(
      { success: false, error: err?.message || 'Database authentication error' },
      { status: 500 }
    );
  }
}
