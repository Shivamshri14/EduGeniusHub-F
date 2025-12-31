# Sanity CMS Setup Instructions

## Step 1: Set up Your Sanity Project

If you haven't already, run:
```bash
npm create sanity@latest -- --coupon codewithharry
```

Follow the prompts to create your Sanity project.

## Step 2: Add Schemas to Your Sanity Studio

1. Navigate to your Sanity Studio folder (usually `sanity/` in your project root)
2. Copy the schemas from `/sanity-schemas/` folder to your Sanity Studio's `schemas/` folder
3. Update your Sanity Studio's `sanity.config.ts` or `schema.ts` to import the schemas:

```typescript
import { schemaTypes } from './schemas';

export default defineConfig({
  // ... other config
  schema: {
    types: schemaTypes,
  },
});
```

## Step 3: Get Your Sanity Credentials

1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to "API" tab
4. Copy your **Project ID**
5. Under "Tokens", create a new token with **Editor** permissions
6. Copy the token

## Step 4: Update .env File

Update your `.env` file with your Sanity credentials:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_actual_token
```

## Step 5: Start Sanity Studio

```bash
cd sanity
npm run dev
```

Your Sanity Studio will run on `http://localhost:3333` (or another port).

## Step 6: Add Your First Tools

1. Open Sanity Studio (http://localhost:3333)
2. Click "Tool" to create a new tool
3. Fill in all the fields
4. Click "Publish"
5. Your tool is now live globally!

## Step 7: Deploy Sanity Studio (Optional)

To make your Sanity Studio accessible online:

```bash
cd sanity
npm run deploy
```

You'll get a URL like: `https://your-project.sanity.studio`

## Notes

- **No localStorage**: Your data is now stored in Sanity's cloud
- **Global Access**: Anyone visiting your website sees the same tools
- **Admin Panel**: Use Sanity Studio (not the Next.js admin) to manage content
- **Real-time Updates**: Changes in Sanity appear on your website immediately
