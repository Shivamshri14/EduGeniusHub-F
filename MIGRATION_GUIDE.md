# Sanity CMS Migration Guide

This project has been migrated to use Sanity CMS as the single source of truth for tools and combo packages.

## Prerequisites

1. **Create a Sanity Account**
   - Visit https://www.sanity.io/
   - Sign up or log in
   - Create a new project

2. **Get Your Sanity Credentials**
   - Go to https://www.sanity.io/manage
   - Select your project
   - Copy your **Project ID**
   - Go to Settings > API > Tokens
   - Create a new token with **Editor** permissions
   - Copy the token

## Setup Instructions

### Step 1: Configure Environment Variables

Edit your `.env` file and add your Sanity credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-12-31
SANITY_API_TOKEN=your_token_here
```

Replace:
- `your_project_id_here` with your actual Sanity Project ID
- `your_token_here` with your actual Sanity API Token

### Step 2: Install Dependencies

```bash
npm install --legacy-peer-deps
```

Note: The `--legacy-peer-deps` flag is needed due to React version conflicts with Sanity v5.

### Step 3: Run Migration Script

This will upload all existing tools and combo packages to Sanity:

```bash
npm run migrate
```

The script will:
- Check your Sanity configuration
- Upload all 18 tools to Sanity
- Upload all 4 combo packages to Sanity
- Skip any duplicates if you run it multiple times

### Step 4: Access Sanity Studio

Start your development server:

```bash
npm run dev
```

Then visit: **http://localhost:3000/sanity**

You can now:
- View all your tools and combos
- Edit existing items
- Add new tools and combo packages
- Publish changes

### Step 5: Build and Deploy

```bash
npm run build
```

## What Changed?

### Removed Files
- `/lib/tools-data.ts` - Old hardcoded tool data (data moved to migration script)
- Tool/combo management from `/lib/storage.ts` - Now only handles customer data

### Updated Files
- `/app/page.tsx` - Now fetches from Sanity
- `/app/tools/page.tsx` - Now fetches from Sanity
- `/app/marketing/tools/page.tsx` - Now fetches from Sanity
- `/lib/sanity.ts` - Updated with proper queries
- `/lib/storage.ts` - Removed tool/combo functions, kept customer management

### New Files
- `/scripts/migrate-to-sanity.ts` - Migration script to upload data
- `/sanity/schemaTypes/tool.ts` - Tool schema
- `/sanity/schemaTypes/combo.ts` - Combo schema

## Sanity Schema

### Tool Schema
- name (string)
- slug (slug)
- tagline (string)
- description (text)
- officialUrl (url)
- imageUrl (url)
- marketPrice (number)
- ourPrice (number)
- category (report | account | ott)
- active (boolean)

### Combo Schema
- name (string)
- slug (slug)
- tagline (string)
- description (text)
- tools (array of strings)
- imageUrl (url)
- marketPrice (number)
- ourPrice (number)
- active (boolean)

## Managing Content

### Adding a New Tool
1. Go to http://localhost:3000/sanity
2. Click "Tool" in the sidebar
3. Click "Create new Tool"
4. Fill in all required fields
5. Click "Publish"

### Adding a Combo Package
1. Go to http://localhost:3000/sanity
2. Click "Combo Package" in the sidebar
3. Click "Create new Combo Package"
4. Fill in all required fields
5. Click "Publish"

### Editing/Deleting
- Click on any tool or combo to edit
- Use the menu (•••) to delete items

## Troubleshooting

### "Cannot read properties of null (reading 'fetch')"
This means Sanity is not configured. Make sure you:
1. Added your credentials to `.env`
2. Restarted your dev server after updating `.env`

### Migration Script Fails
Make sure:
1. Your `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
2. Your `SANITY_API_TOKEN` has write permissions
3. You ran `npm install --legacy-peer-deps` first

### Changes Not Showing
1. Check if documents are published in Sanity Studio
2. Try refreshing the page (data is fetched on each page load with `revalidate = 0`)

## Admin Panel

The admin panel (`/admin`) still uses localStorage for customer management. Tools and combos are managed exclusively through Sanity Studio.

## Production Deployment

Before deploying to production:
1. Ensure all environment variables are set in your hosting platform
2. Run `npm run build` to verify everything compiles
3. Deploy both the Next.js app and access Sanity Studio at `yourdomain.com/sanity`
