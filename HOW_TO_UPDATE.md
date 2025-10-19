# How to Update Your EduGenius Hub Website

This guide explains how to update various parts of your website easily.

---

## 1. Update Phone Number, Instagram, or WhatsApp Community

**File to edit:** `/lib/config.ts`

```typescript
export const SITE = {
  brand: "EduGenius Hub",
  phoneDisplay: "+91 87662 53356",        // Change this to your display number
  phoneE164: "918766253356",              // Change this (country code + number, no +)
  whatsappCommunityUrl: "https://chat.whatsapp.com/FtMZUM8Ql41IkUXSmw3pBU",  // Your community link
  instagramUrl: "https://www.instagram.com/edugeniushub",  // Your Instagram URL
};
```

**Steps:**
1. Open `/lib/config.ts`
2. Update the values you want to change
3. Save the file
4. Run `npm run build` to rebuild the site

---

## 2. Add or Remove Tools

**File to edit:** `/lib/tools.ts`

### To Add a New Tool:

1. **First, add the tool image:**
   - Place your tool's image in `/public/tools/` folder
   - Name it something like `newtool.png` or `newtool.jpg`
   - Recommended size: 400x400 pixels or similar square format

2. **Then add the tool to the list:**

```typescript
export const TOOLS: Tool[] = [
  // ... existing tools ...
  {
    id: "your-new-tool",                    // Unique ID (lowercase, use hyphens)
    name: "Your Tool Name",                  // Display name
    tagline: "Short catchy description.",    // One-line tagline
    description: "Longer description explaining what this tool does.",  // Full description
    officialUrl: "https://tooltool.com",     // Official website
    image: "/tools/newtool.png"              // Path to your image in /public/tools/
  },
];
```

### To Remove a Tool:

Simply delete the entire tool object from the `TOOLS` array in `/lib/tools.ts`.

### Example - Adding Spotify Premium:

```typescript
{
  id: "spotify-premium",
  name: "Spotify Premium",
  tagline: "Unlimited music streaming.",
  description: "Ad-free music with offline downloads and high quality audio.",
  officialUrl: "https://www.spotify.com",
  image: "/tools/spotify.png"
},
```

**Steps:**
1. Add image to `/public/tools/spotify.png`
2. Add the tool object to `/lib/tools.ts`
3. Save the file
4. Run `npm run build`

---

## 3. Add Customer Review Screenshots

**Where to add images:** `/public/reviews/` folder

**Steps:**

1. **Create the reviews folder** (if it doesn't exist):
   ```bash
   mkdir -p public/reviews
   ```

2. **Add your screenshot images:**
   - Save your WhatsApp/Instagram review screenshots as:
     - `/public/reviews/review1.jpg`
     - `/public/reviews/review2.jpg`
     - `/public/reviews/review3.jpg`
   - Recommended format: JPG or PNG
   - Recommended size: 800x600 pixels or landscape orientation

3. **The website will automatically use these images!** The placeholders on the homepage will be replaced with your actual review screenshots.

**Current placeholder locations:**
- Home page shows 3 review cards with placeholders
- Once you add the images to `/public/reviews/`, they will automatically appear

**Optional: Edit review text:**
If you want to change the review quotes, edit `/app/page.tsx` and find the review section (around line 181-223):

```typescript
<p className="text-slate-700 dark:text-slate-300 leading-relaxed italic mb-4">
  "Fast delivery and excellent support! Got my ChatGPT subscription within 5 minutes."
</p>
<p className="text-sm text-slate-500 dark:text-slate-400 font-medium">- Student from Delhi</p>
```

---

## 4. Dark/Light Theme Toggle

✅ **Already implemented!** The theme toggle is working on the entire website including:
- Navbar (top of page)
- Footer (bottom of page)
- All page content
- All cards and components

The toggle button (moon/sun icon) is in the top navigation bar on both desktop and mobile.

Your theme preference is automatically saved and remembered when you visit again.

---

## Quick Reference - File Locations

| What to Update | File Location |
|----------------|---------------|
| Phone/Instagram/Community | `/lib/config.ts` |
| Add/Remove Tools | `/lib/tools.ts` |
| Tool Images | `/public/tools/` |
| Review Screenshots | `/public/reviews/` |
| Home Page Content | `/app/page.tsx` |
| Tools Page | `/app/tools/page.tsx` |
| Contact Page | `/app/contact/page.tsx` |

---

## After Making Changes

Always run this command to rebuild the site:
```bash
npm run build
```

This ensures all your changes are compiled and ready for production.

---

## Need Help?

If you need to make other customizations not covered here, you can:
1. Check the file structure in the project
2. Most content is in `/app/` and `/components/` folders
3. Styling uses Tailwind CSS classes
