# Demo Credentials - Edu Genius Hub

## Your Admin Account (Already Set Up!)

**Email**: `developer.shivam07@gmail.com`
**Password**: (Your existing password)
**Role**: Admin
**Phone**: +919876543210

### To Login as Admin:
1. Go to http://localhost:3000
2. Enter your email: `developer.shivam07@gmail.com`
3. Enter your password
4. You'll be redirected to the **Admin Dashboard**

---

## Create Demo Customer Account

Since Supabase auth requires actual signup, here's how to quickly create a demo customer:

### Option 1: Quick Register (30 seconds)

1. Open **Incognito/Private browser window**
2. Go to http://localhost:3000
3. Click **"Register"**
4. Fill in:
   - **Phone**: `9999888877` or `+919999888877`
   - **Email**: `customer@demo.com`
   - **Password**: `demo123456`
   - **Confirm Password**: `demo123456`
5. Click **"Create Account"**
6. Done! Now you can login as customer

### Option 2: Use SQL After Manual Registration

After you register via the app, run this in Supabase SQL Editor to give the customer a subscription:

```sql
-- Get the customer's user ID (replace email if different)
WITH customer_profile AS (
  SELECT id FROM profiles WHERE email = 'customer@demo.com'
)
-- Create customer record
INSERT INTO customers (full_name, phone, email, notes, profile_id)
SELECT
  'Demo Customer',
  '+919999888877',
  'customer@demo.com',
  'Demo account with Netflix subscription',
  id
FROM customer_profile
ON CONFLICT DO NOTHING
RETURNING *;

-- Create subscription for the customer
WITH customer_record AS (
  SELECT id FROM customers WHERE email = 'customer@demo.com'
),
netflix_plan AS (
  SELECT id FROM plans WHERE display_name = 'Netflix Private Plan' LIMIT 1
)
INSERT INTO subscriptions (customer_id, plan_id, start_date, end_date, status)
SELECT
  customer_record.id,
  netflix_plan.id,
  CURRENT_DATE,
  CURRENT_DATE + INTERVAL '30 days',
  'active'
FROM customer_record, netflix_plan
RETURNING *;

-- Add credentials for the subscription
WITH latest_subscription AS (
  SELECT s.id
  FROM subscriptions s
  JOIN customers c ON c.id = s.customer_id
  WHERE c.email = 'customer@demo.com'
  ORDER BY s.created_at DESC
  LIMIT 1
)
INSERT INTO credentials (subscription_id, login_id, password, notes)
SELECT
  id,
  'demo.netflix@example.com',
  'NetflixDemo2024',
  'Private Netflix account - Premium 4K plan'
FROM latest_subscription
RETURNING *;
```

---

## Test The Full Flow

### As Admin (You):

1. **Login**: http://localhost:3000
   - Email: `developer.shivam07@gmail.com`
   - Your password

2. **You should see**:
   - Admin Dashboard with stats
   - Navigation cards for Customers, Software, Assignments, Settings
   - Breadcrumb showing "Dashboard"

3. **Explore**:
   - View pre-loaded software (7 tools)
   - View plans (12 available plans)
   - Dashboard shows subscription statistics

### As Customer (After Creating Account):

1. **Login in Incognito**: http://localhost:3000
   - Email: `customer@demo.com`
   - Password: `demo123456`

2. **You should see**:
   - Customer Dashboard
   - Subscription stats (after you run the SQL to assign subscription)
   - Link to "My Credentials"

3. **View Credentials**:
   - Click "My Credentials" in navbar
   - See Netflix subscription details
   - View/copy login credentials
   - See expiry date (30 days from today)

---

## Quick Summary

| Account Type | Email | Password | Access |
|-------------|-------|----------|--------|
| **Admin (You)** | `developer.shivam07@gmail.com` | Your existing password | Full admin dashboard |
| **Customer** | Register via app | Your choice | Customer dashboard + credentials |

---

## Recommended Test Customer Details

When you register the customer account, use these consistent details:

- **Full Name**: Demo Customer
- **Phone**: `+919999888877` or just `9999888877`
- **Email**: `customer@demo.com`
- **Password**: `demo123456`

Then run the SQL above to give them a Netflix subscription with credentials.

---

## What You'll Be Able To Test

✅ **Admin Features**:
- Login as admin
- View dashboard with stats
- Access to all management sections
- See breadcrumb navigation

✅ **Customer Features**:
- Register new account
- Login as customer
- View personalized dashboard
- See subscription status
- View and copy credentials
- See expiry dates

✅ **Security**:
- Admin can't see customer credentials page (different navbar)
- Customer can only see their own subscriptions
- Passwords are hidden with show/hide toggle
- Copy-to-clipboard functionality

---

## Next Steps After Testing

Once you've tested with the demo accounts, you can:

1. **Build remaining admin pages** (see IMPLEMENTATION_GUIDE.md):
   - Customers management page
   - Software & Plans management
   - Assignments/Subscriptions page
   - Settings page

2. **Customize**:
   - Add your business logo
   - Update colors/branding
   - Configure WhatsApp links in settings

3. **Deploy**:
   - Your Supabase database is already live
   - Deploy to Vercel/Netlify
   - Share with your team

---

**Happy testing! 🚀**
