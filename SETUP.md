# Quick Setup Guide - Edu Genius Hub

Follow these steps to get your Edu Genius Hub subscription management system up and running.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier is fine)
- Git (optional, for version control)

## Step-by-Step Setup

### 1. Supabase Project Setup (5 minutes)

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: "edu-genius-hub"
   - Database Password: (generate a strong password)
   - Region: (choose closest to your users)
5. Click "Create new project" and wait for it to initialize (~2 minutes)

### 2. Get Supabase Credentials (1 minute)

1. Once your project is ready, click "Project Settings" (gear icon in sidebar)
2. Go to "API" section
3. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

### 3. Configure Environment Variables (1 minute)

1. In your project root, create a file named `.env.local`
2. Add these lines (replace with your actual values):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Save the file

### 4. Run Database Migrations (3 minutes)

**Option A: Using Supabase Dashboard (Recommended)**

1. Go to your Supabase project dashboard
2. Click "SQL Editor" in the left sidebar
3. Click "New query"
4. Open `supabase/migrations/001_initial_schema.sql` in your code editor
5. Copy the entire contents
6. Paste into the Supabase SQL Editor
7. Click "Run" button (bottom right)
8. Wait for success message
9. Repeat steps 3-7 for `supabase/migrations/002_seed_data.sql`

**Option B: Using Supabase CLI**

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### 5. Install Dependencies & Run (2 minutes)

```bash
# Install packages
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Create Admin Account (2 minutes)

1. Click "Register" button
2. Fill in the form:
   - Phone: Your WhatsApp number (e.g., +919876543210)
   - Email: (optional)
   - Password: Create a secure password
3. Click "Create Account"
4. You'll be redirected to login

**Make this user an admin:**

1. Go to Supabase Dashboard
2. Click "Authentication" > "Users"
3. Find your newly created user
4. Click on the user row
5. Go to "Table Editor" > "profiles"
6. Find the profile with same ID as your user
7. Click on the `role` cell
8. Change from `customer` to `admin`
9. Save (click checkmark or press Enter)
10. Logout and login again to your app

You're now an admin! 🎉

## Verification Checklist

After setup, verify everything works:

- [ ] Can register a new account
- [ ] Can login with registered account
- [ ] Admin sees admin dashboard with stats
- [ ] Can see seeded software (Netflix, ChatGPT, etc.)
- [ ] Can navigate between pages with breadcrumbs
- [ ] No console errors in browser DevTools

## Common Issues & Solutions

### "Connection to database failed"
- Check your `.env.local` file has correct values
- Verify Supabase project is not paused (Dashboard > Settings)
- Restart dev server after changing .env files

### "Invalid login credentials"
- Make sure you registered first before trying to login
- Phone number must match exactly (including country code)
- Try registering with a different phone/email

### "Permission denied" errors
- RLS policies might not be set up correctly
- Re-run the migrations
- Check Supabase logs: Dashboard > Logs > Postgres Logs

### Build errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### "Cannot find module" errors
- Make sure all imports use `@/` for absolute paths
- TypeScript errors? Run: `npm run typecheck`

## Next Steps

1. **Add More Admins** (Optional)
   - Register new users
   - Change their role to `admin` in profiles table

2. **Configure Site Settings**
   - Login as admin
   - Go to Settings page (when implemented)
   - Add Instagram URL, WhatsApp links

3. **Add Your Software**
   - Go to Software Management
   - Add your actual software subscriptions
   - Create plans (private/shared)

4. **Add Customers**
   - Go to Customer Management
   - Add customer details
   - Assign subscriptions

5. **Test Customer Flow**
   - Register as a customer
   - Login and view dashboard
   - Verify you can see assigned credentials

## Development Tips

### Useful Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Type checking
npm run typecheck

# Format code (if prettier configured)
npm run format

# View Supabase logs
supabase logs postgres
```

### Hot Reloading

The dev server supports hot reloading:
- Save any file to see changes instantly
- No need to restart server for code changes
- Refresh browser if styles don't update

### Database Changes

If you need to modify the database:

1. Make changes in Supabase SQL Editor
2. Test thoroughly
3. Save working SQL to a new migration file
4. Document in migration comments

### Adding New Features

1. Update types in `lib/types.ts`
2. Add helper functions in `lib/supabase.ts`
3. Create new page in `app/` directory
4. Add route to breadcrumbs
5. Test with real data

## Production Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Import Project"
4. Select your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click "Deploy"
7. Wait for deployment to complete
8. Visit your live URL!

### Post-Deployment

1. Test all features on production URL
2. Create admin user on production
3. Add real customer data
4. Monitor Supabase usage in dashboard
5. Set up custom domain (optional)

## Backup & Maintenance

### Database Backups

Supabase automatically backs up your database:
- Free tier: Daily backups (7 days retention)
- Pro tier: Point-in-time recovery

Manual backup:
1. Dashboard > Database > Backups
2. Click "Create backup"

### Monitoring

Check these regularly:
- Supabase Dashboard > Database > Connections
- Dashboard > Storage > Usage
- Dashboard > Auth > User signups
- Vercel Analytics (if deployed)

## Support & Resources

- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **GitHub Issues**: Report bugs in your repository

## Security Checklist

Before going live:
- [ ] All RLS policies are enabled
- [ ] Admin users are verified and trusted
- [ ] Environment variables are not committed to git
- [ ] `.env.local` is in `.gitignore`
- [ ] Customer passwords are hashed (handled by Supabase Auth)
- [ ] HTTPS is enabled (automatic on Vercel)
- [ ] No API keys in client-side code

## Success Metrics

Track these KPIs:
- Number of active customers
- Number of active subscriptions
- Subscription renewal rate
- Customer support requests
- Average subscription duration

---

**Need help?** Contact your development team or refer to the detailed README.md
