# Quick Start - Edu Genius Hub

Your full-stack subscription management system is now ready to use!

## ✅ What's Been Set Up

### Database (Supabase)
- ✅ All 7 tables created with RLS policies
- ✅ Indexes for performance optimization
- ✅ 7 software tools seeded (Netflix, ChatGPT, Grammarly, etc.)
- ✅ 12 plans created (private and shared options)
- ✅ Settings table initialized

### Application
- ✅ Environment variables configured
- ✅ Authentication system ready
- ✅ Admin dashboard (overview page)
- ✅ Customer dashboard with credentials page
- ✅ Login and registration pages
- ✅ Breadcrumb navigation
- ✅ Responsive design

## 🚀 Getting Started

### 1. Start the Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### 2. Register Your First Admin Account

1. Go to [http://localhost:3000](http://localhost:3000)
2. Click "Register"
3. Fill in the form:
   - **Phone**: Your WhatsApp number (e.g., +919876543210)
   - **Email**: Optional
   - **Password**: Create a secure password
4. Click "Create Account"

### 3. Make Yourself an Admin

**Option A: Using Supabase Dashboard (Recommended)**

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Table Editor** > **profiles**
4. Find your newly created profile
5. Click on the `role` field
6. Change from `customer` to `admin`
7. Press Enter or click the checkmark to save

**Option B: Using SQL**

1. Go to **SQL Editor** in Supabase Dashboard
2. Run this query (replace with your actual email or phone):

```sql
UPDATE profiles
SET role = 'admin'
WHERE phone = '+919876543210';  -- Replace with your phone
```

### 4. Login and Explore

1. Logout from your app
2. Login again with your credentials
3. You'll now be redirected to the **Admin Dashboard**!

## 📊 What You Can Do Now

### As Admin

1. **View Dashboard** - See stats for customers, software, subscriptions
2. **Manage Software** - The 7 pre-loaded tools are ready (Netflix, ChatGPT, etc.)
3. **View Plans** - 12 plans already created for different software
4. **Add Customers** - Create customer profiles
5. **Assign Subscriptions** - Link customers to software plans
6. **Add Credentials** - Provide login details for subscriptions

### As Customer (after admin assigns subscriptions)

1. **View Dashboard** - See active/expired subscription counts
2. **Access Credentials** - View login IDs and passwords
3. **Contact Admin** - WhatsApp direct link
4. **Copy Credentials** - Easy copy-to-clipboard functionality

## 🗂️ Pre-Loaded Software

Your database already includes:

1. **Netflix** - Private & Shared (4 screens)
2. **Perplexity** - Private & Shared (2 users)
3. **DeepSeek** - Private & Shared (3 users)
4. **ChatGPT** - Private only
5. **QuillBot** - Private & Shared (2 users)
6. **Grammarly** - Private & Shared (2 users)
7. **Turnitin** - Private only

## 📝 Next Steps

### Remaining Pages to Implement

For a complete admin experience, you'll want to implement these pages (see IMPLEMENTATION_GUIDE.md):

1. **Customers Management** (`/admindashboard/customers`)
   - CRUD operations for customers
   - Search and filter
   - Link customers to auth profiles

2. **Software Management** (`/admindashboard/software`)
   - Add/edit/delete software
   - Manage plans per software
   - Toggle active/inactive status

3. **Assignments** (`/admindashboard/assignments`)
   - Create subscriptions (assign plan to customer)
   - Set start/end dates
   - Add credentials
   - View/edit/delete assignments

4. **Settings** (`/admindashboard/settings`)
   - Configure admin email
   - Add Instagram URL
   - Set WhatsApp links

These can be implemented using the helper functions already created in `lib/supabase.ts`.

## 🧪 Testing the Flow

### Test Admin Flow

1. Login as admin
2. View the dashboard stats
3. Navigate using breadcrumbs
4. Try the navigation cards

### Test Customer Registration

1. Open incognito/private window
2. Register a new account (will be a customer by default)
3. Login and see customer dashboard
4. View "My Credentials" page (will be empty until admin assigns)

### Test Full Flow

1. **As Admin**: Create a customer record in Supabase directly:
   ```sql
   INSERT INTO customers (full_name, phone, email, profile_id)
   VALUES ('Test Customer', '+919999999999', 'test@test.com', 'your-customer-profile-id');
   ```

2. **As Admin**: Assign a subscription:
   ```sql
   INSERT INTO subscriptions (customer_id, plan_id, start_date, end_date, status)
   SELECT
     c.id,
     p.id,
     CURRENT_DATE,
     CURRENT_DATE + INTERVAL '30 days',
     'active'
   FROM customers c, plans p
   WHERE c.phone = '+919999999999'
   AND p.display_name = 'Netflix Private Plan'
   LIMIT 1;
   ```

3. **As Admin**: Add credentials:
   ```sql
   INSERT INTO credentials (subscription_id, login_id, password, notes)
   SELECT
     s.id,
     'test@netflix.com',
     'password123',
     'Private account - Full HD'
   FROM subscriptions s
   JOIN customers c ON c.id = s.customer_id
   WHERE c.phone = '+919999999999'
   LIMIT 1;
   ```

4. **As Customer**: Login and view credentials page

## 🔒 Security Features

- ✅ Row Level Security (RLS) on all tables
- ✅ Admin-only write access
- ✅ Customers can only read their own data
- ✅ Password masking with reveal toggle
- ✅ Secure authentication via Supabase Auth
- ✅ Environment variables for sensitive data

## 🐛 Troubleshooting

### "Cannot read properties of undefined"
- Make sure you're logged in
- Check browser console for errors
- Verify environment variables are set

### "No subscriptions found"
- Customer needs to be linked to subscriptions by admin
- Check that `profile_id` in `customers` table matches auth user ID

### Build errors
```bash
# Clear and rebuild
rm -rf .next
npm run build
```

## 📚 Documentation

- **README.md** - Complete project documentation
- **SETUP.md** - Detailed setup instructions
- **IMPLEMENTATION_GUIDE.md** - Guide for remaining features

## 🎉 Success!

Your Edu Genius Hub subscription management system is now operational. Start by logging in as an admin and exploring the dashboard!

For questions or issues, refer to the README.md or implementation guide.

---

**Happy managing! 🚀**
