# EduGenius Hub — repo audit v2

Date: 21 Oct 2026. Scope: this checkout of `main` from `https://github.com/Shivamshri14/EduGeniusHub-F.git`, plus the live-site facts you measured the same day. No application code was changed for this audit.

Stop here for review. Phases 1–7 are not started.

## 1. What this repo actually is

| Piece | Fact in this repo |
| --- | --- |
| Framework | Next.js **13.5.1**, App Router (`app/`). Lockfile resolves the same version. |
| UI | React **18.2.0**, TypeScript **5.2.2**, Tailwind CSS **3.3.3**, shadcn/Radix under `components/ui/`. |
| Font | `next/font` Google **Inter** in `app/layout.tsx`. |
| Database driver | Mongoose **9.10.1** (MongoDB driver ~7.6). |
| NestJS | **Not in this repo.** No `@nestjs/*` dependency, no Nest module, no second API service. |
| Tests / CI | None. No Playwright, no axe, no GitHub Actions. |
| Lint on build | `next.config.js` sets `eslint.ignoreDuringBuilds: true`. |
| Images | `images.unoptimized: true`. No `next/image` pipeline, no AVIF/WebP config. |
| Package name | `package.json` name is `nextjs`, version `0.1.0`. |

`tsconfig.json` is strict, `jsx: preserve`, path alias `@/*`.

Route group `app/(routes)/` does not appear in the URL. Pages that exist:

| URL | File | Rendering |
| --- | --- | --- |
| `/` | `app/page.tsx` | Server `redirect("/home")` (307). Matches the live site. |
| `/home` | `app/(routes)/home/page.tsx` | Server page that renders a client `HomePage`. |
| `/products` | `app/(routes)/products/page.tsx` | Client page. Catalog is fetched in the browser from `/api/products`. |
| `/product/[slug]` | `app/(routes)/product/[slug]/page.tsx` | Client page. Not `/p/[slug]`. |
| `/contact` | `app/(routes)/contact/page.tsx` | Client page. |
| `/admin` | `app/(routes)/admin/page.tsx` | Client page, linked from the footer. |
| `/tools` | `app/(routes)/tools/page.tsx` | Extra page. Not in the live URL list you measured. |

These URLs are **not** in the repo, so they 404 here the same way they 404 on the live site: `/about`, `/services`, `/pricing`, `/privacy`, `/terms`, `/refund`, `/refund-policy`, `/disclaimer`, `/sitemap.xml`. There is no `app/robots.ts`, no `public/robots.txt`, and no sitemap. The live `robots.txt` 307 to a noindex HTML shell is a host/platform response, not a file in this repo.

There is no `metadataBase`, no canonical, no `openGraph.images`, and no JSON-LD. `app/layout.tsx` sets `og:url` to `https://www.edugeniushub.com`. Footer text and `mailto:support@edugeniushub.com` also use `.com`. You measured `.com` as not responding and `.in` as the host that serves the site.

## 2. NestJS

It does not live anywhere in this checkout. The HTTP API is Next.js Route Handlers under `app/api/`.

Stated stack includes NestJS. This repo cannot “keep” it, because it was never added. Adding a Nest service now would be a second framework beside Next.js. Recommendation: leave the API as Route Handlers. Do not introduce NestJS for this site.

## 3. Database layer

Connection: `lib/mongodb.ts` reads `MONGODB_URI`, caches the Mongoose connection on `globalThis`, and uses `serverSelectionTimeoutMS: 5000`. There is no `dbName` option in code. The database name is whatever path is in the URI. The URI in local `.env.local` points at database `edugeniushub` on Atlas cluster `cluster0.qgwpwxp.mongodb.net`.

A connection check from this machine (19 Oct 2026, same URI) listed these collections: `products`, `services`, `notices`, `faqs`, `reviews`, `siteconfigs`, `adminusers`. Product count at that time was 12. That is this environment, not a claim about what Hostinger’s process sees.

### Mongoose models that exist

| Model | File | Role today |
| --- | --- | --- |
| Product | `models/Product.ts` | Catalog. Category is a string enum: `reports`, `accounts`, `ai_tools`, `ott`, `services`. |
| Service | `models/Service.ts` | Academic/service blurbs. `is_active`, `sort_order`. |
| Notice | `models/Notice.ts` | Banner/alert/popup. Closest thing to an announcement. Has `start_date` / `end_date`. |
| Faq | `models/Faq.ts` | FAQ. |
| Review | `models/Review.ts` | Name, role, quote, rating, image. No date field, no product, no proof, no source. |
| SiteConfig | `models/SiteConfig.ts` | Phone, WhatsApp community, Instagram, hero, reseller blurb, and the four stat strings. |
| AdminUser | `models/AdminUser.ts` | Username + SHA-256 password hash. |

### Types with no model and no collection

`lib/types.ts` defines `Lead`, `Customer`, and `Order`. Nothing writes them to MongoDB. CRM data is `localStorage` in `utils/crmStorage.ts` (`egu_crm_customers`), so it exists only in that browser.

### v1 models you named, against this repo

| v1 model | Status |
| --- | --- |
| Product | Exists, partial. Missing SEO title/description, WhatsApp prefill template, `publishAt` / `expireAt`, compare-at source note, billing-period enum, real stock count. `sort_order` exists. `is_hidden` exists. `market_price` exists with no “real prior price” note. `delivery_time` is one string, default `'5–15 min'`. |
| Service | Exists, partial. No price, plans, images, SEO, slug uniqueness, hide/re-list dates, or WhatsApp template. |
| Category | **Missing.** Labels are hardcoded arrays in `lib/categories.ts` and `app/(routes)/products/page.tsx`. Product category is an enum, not a document you can reorder. |
| Announcement | **Partial.** `Notice` covers a banner. It is not a first-class announcement with home-section ordering. |
| Coupon | **Missing.** |
| Lead | **Missing** as a model. Type only, plus browser CRM. |

There is no audit-log collection. There is no `revalidatePath` / `revalidateTag` anywhere. Public pages load the catalog with `fetch('/api/products')` after hydration, so a DB write shows up on the next client fetch, not through ISR.

`GET /api/products?include_hidden=true` returns hidden products with no auth check.

If MongoDB is empty or down, `GET /api/products` falls back to `lib/localProducts.ts`, which is built from the hardcoded `TOOLS` list.

## 4. How the site is deployed

**Live site (your 21 Oct measurement, not inferred from this repo):** `edugeniushub.in` responds with `x-powered-by: Next.js`, `platform: hostinger`, `server: hcdn`. `edugeniushub.com` does not respond.

**This repo:**

- No `vercel.json`, no `.vercel/`, no Hostinger config file.
- `netlify.toml` runs `npx next build` and enables `@netlify/plugin-nextjs`. That is a second host config, not evidence that Netlify is production.
- `next.config.js` does not set `output: 'export'`, so this app is a Node server, not a static export. That matches a Next.js process behind Hostinger’s CDN (`hcdn`).
- GitHub repo “About” text mentions `edu-genius-hub-f.vercel.app`. This checkout has no Vercel project wiring, and you measured production on Hostinger. Treat the Vercel URL as a leftover description, not the current host.

### One host

**Use Hostinger as the only production host.** `edugeniushub.in` is already serving this Next.js app there. Do not also deploy to Vercel or Netlify.

Before Phase 2, confirm Hostinger is running `next start` (Node), not a cached static snapshot. Phase 2 needs `revalidatePath` / `revalidateTag` so an admin save is public in under 10 seconds without a redeploy. If that Node process cannot do on-demand revalidation, move the **whole** site to Vercel in one cut and drop Hostinger. Do not run two hosts.

`netlify.toml` and the `@netlify/plugin-nextjs` dependency should be removed when you approve a later phase, so the repo stops implying a second host.

## 5. What is hardcoded

Links that match the ones you said to keep are in `lib/config.ts` and as defaults on `SiteConfig`. The footer does **not** use those for Instagram.

| Item | Where | Value in code |
| --- | --- | --- |
| WhatsApp | `lib/config.ts`, also hardcoded again in `SiteFooter.tsx`, `WhatsAppFloatingButton.tsx`, `product/[slug]/page.tsx` | `https://wa.me/918766253356` |
| Community | `lib/config.ts` | `https://chat.whatsapp.com/FtMZUM8Ql41IkUXSmw3pBU` |
| Instagram (intended) | `lib/config.ts`, `SiteConfig` default | `https://www.instagram.com/edugenius.hub1` |
| Instagram (rendered in footer) | `components/navigation/SiteFooter.tsx` line 5 | `https://www.instagram.com/turnitin__plagiarism` |
| Email | Footer | `support@edugeniushub.com` |
| Public brand URL | Footer and `og:url` | `www.edugeniushub.com` |

`APPS_SCRIPT_URL` and `APPS_SCRIPT_KEY` are in `.env.local` and are not read by any file.

### Stats and trust copy (unverifiable)

| Claim | Where |
| --- | --- |
| `5000+`, `12000+`, `99%`, `< 2 mins` | `lib/testimonials.ts` `TRUST_STATS`; `models/SiteConfig.ts` defaults; `components/admin/AdminSiteSettingsTab.tsx` placeholders |
| “Trusted by 5000+ students”, “Join 5000+ students”, “Connect with 5000+ students” | `app/(routes)/home/HomePage.tsx` |
| Meta and OG “Trusted by 5000+ students” | `app/layout.tsx` |
| “Support online now”, “Under 2 minutes” | `SiteFooter.tsx` |
| “Online Now” / “Replies in < 2 mins” | `WhatsAppFloatingButton.tsx`, `utils/support.ts` |
| “Instant Delivery”, “24/7 Support”, “Verified Reports” | `lib/homeContent.ts` |

`utils/support.ts` forces online status from **9:00–23:00 in the server/browser local clock**, with copy “Fulfillment in 5–15 mins” or “Delivered within 1–2 hours in the morning”. That clock is not IST-specific.

### Delivery times that disagree

| Copy | File |
| --- | --- |
| Product default `5–15 min` | `models/Product.ts` |
| `5–15 mins` vs `1–2 hours in the morning` | `utils/support.ts` |
| `Replies in < 2 mins` | `WhatsAppFloatingButton.tsx` |
| Seed banner “within 10–20 minutes” | `app/api/admin/seed/route.ts` |
| Contact FAQ “5–30 minutes” and “up to 24 hours” | `app/(routes)/contact/ContactPage.tsx` |
| “Instant Delivery” | `lib/homeContent.ts` |

### “Official”, trademarks, templated descriptions

- `lib/gemini.ts` fallback description: ``Official ${name} with fast delivery and guaranteed uptime.``
- Seed fallback: ``Official ${t.name} with instant delivery and dedicated support.``
- Seed features include `100% Guaranteed Validity`.
- `app/(routes)/products/page.tsx`: “Official Digital Access at Student Prices”.
- `lib/productImages.ts`: badge text `Official Access`; artwork ids `turnitin-plag`, `turnitin-ai`.
- `lib/tools.ts`: Turnitin tool ids and `officialUrl: "https://turnitin.com"`.
- `components/tools/ToolDialog.tsx`: button “Official Site”.
- `app/layout.tsx` title/description/keywords name Turnitin, ChatGPT, Netflix, QuillBot.
- Admin promo template in `app/(routes)/admin/page.tsx` includes “Official Value”.
- Footer brand blurb: “Turnitin reports, AI tools, OTT subscriptions”.
- No Turnitin logo file was found under `public/` (`logo.jpg`, `hero-monitor.webp`, `public/assets/`). Titles, slugs, and alt text in code still use the Turnitin name (`lib/tools.ts` ids, product artwork keywords, layout keywords).

### Testimonials

Two hardcoded sets, both seeded into `reviews` by `POST /api/admin/seed`:

- `lib/testimonials.ts`: Rahul S. (Delhi), Priya M. (Mumbai), Ankit V. (Pune), Sneha K. (Bangalore), Deepak R. (Hyderabad), Kavya T. (Chennai). Quotes name Turnitin, QuillBot, Grammarly, ChatGPT Plus, Netflix, Prime Video, Paperpal. No dates.
- `lib/reviews.ts`: “Student from Delhi”, “PhD Scholar, Mumbai”, “Working Professional”. No dates.

`components/reviews/` can render these. They are anonymous or first-name-plus-initial, with cities, and they are not tied to an order.

### Prices and catalog source

`lib/tools.ts` is a static price list (`marketPrice` / `ourPrice`) for reports, AI tools, and OTT. `lib/deals.ts`, `lib/localProducts.ts`, and the seed route copy that list into MongoDB, including `original_price: t.marketPrice` with no source note. `lib/services.ts` hardcodes academic-writing and related service cards. `lib/faqs.ts` hardcodes FAQs. `lib/homeContent.ts` hardcodes hero and reseller copy.

Public category labels are fixed in the products page (`Turnitin Reports`, `AI Tools & API`, and so on). A separate `lib/categories.ts` uses different ids (`report` / `account` / `ott`).

### Enum labels in the UI

`components/tools/ToolCard.tsx`, `ToolDialog.tsx`, and `FeaturedToolsCarousel.tsx` render `tool.category.toUpperCase()`, which produces strings like `AI_TOOLS` when the value contains an underscore, and `REPORT` / `ACCOUNT` / `OTT` for the tool enum. Product badges are shown with `badge.replace('_', ' ')` (only the first underscore), so `limited_slots` becomes “limited slots” and `best_seller` becomes “best seller”. `ProductCard.tsx` maps `limited_slots` to the label “Limited Slots” with no stock count.

### Legal footer

In this repo the three legal labels are Next.js `<Link>`s, and **every href is `/home`** (`SiteFooter.tsx`). They are not plain text nodes, and they are not legal pages. Your live audit saw them as text. This checkout does not match that detail; the deployed build may differ. Either way, `/terms`, `/privacy`, `/refund-policy`, and `/disclaimer` do not exist.

There is no CMS page model, no grievance officer field, and no trademark disclaimer.

### Theme and mobile chrome

`app/layout.tsx`: `defaultTheme="dark"` and `enableSystem`. First visit with no saved theme is dark. A light OS theme can still switch it. There is a `ThemeToggle` in the navbar.

`components/whatsapp/ConditionalWhatsApp.tsx` mounts `WhatsAppFloatingButton` (`fixed bottom-4 right-4 z-50`) on public pages. There is no sticky two-button bottom bar. `LiveActivityNotification` is a fixed toast. Together those are the overlap you saw on the mobile bottom bar.

Some icon buttons have `aria-label` (footer social, navbar menu, carousel, notice dismiss, the floating WhatsApp button). Many admin and product icon buttons do not. That was not fully enumerated; Phase 7 should treat “every icon button” as open work.

### Share

`/product/[slug]` copies the URL with `navigator.clipboard`. It does not call `navigator.share`, and it does not attach an image file.

### Media

No Cloudinary, S3, or Vercel Blob client. Product images are a URL string or files in `public/`. `public/` currently has `logo.jpg`, `hero-monitor.webp`, and `public/assets/`.

## 6. Admin auth

UI: `/admin` (`app/(routes)/admin/page.tsx`). The footer links to it with a lock icon. There is no `noindex` on that route in this repo.

Login: `POST /api/admin/auth`.

- Body: `username`, `password`. Username defaults to `ADMIN_USERNAME` or `admin`.
- If the `adminusers` collection is empty, the route creates a user from `ADMIN_PASSWORD` or `ADMIN_INITIAL_PASSWORD`.
- Password check is unsalted SHA-256 (`models/AdminUser.ts`). No bcrypt/argon2, no salt.
- Success JSON is `{ token: "admin_authenticated", user }`. The token is that fixed string, not a signed session.
- The page stores `sessionStorage.egh_admin_auth = "true"` and the user JSON. Nothing is an httpOnly cookie. Refreshing on another device, or calling the API without that browser flag, is not blocked by the server.
- No `middleware.ts`. No rate limit on login or on any write.

These write routes do not check a session, cookie, or password:

- `POST /api/admin/seed` (body `{ force: true }` deletes and reseeds products, FAQs, services, reviews, site config, and notices)
- `POST/PUT/DELETE` products, services, reviews, notices, FAQs
- `PUT /api/settings`
- `PUT /api/admin/profile` (can set a new password; falls back to `ADMIN_PASSWORD`)
- `POST /api/admin/ai-parse` (uses `GEMINI_API_KEY` on the server; the key is not sent to the client, but the route is public)

`GET /api/admin/status` is also public. It reports whether MongoDB is up and whether a Gemini key is configured.

Admin UI that exists today: product create/edit/hide, notices, FAQs, reviews, services, site settings (including the stat fields), and a Gemini “paste a promo message and parse products” tool (`/api/admin/ai-parse`). There is no drag-and-drop reorder, no duplicate button, no one-click re-list with new dates, no coupon UI, no lead pipeline, and no audit log. `sort_order` can be sent on create; the public list sorts by it. The admin page is one large client component (about 2,000 lines) plus tab components. Phone layout was not verified in this audit.

Gemini today: `lib/gemini.ts` calls `generativelanguage.googleapis.com` with `fetch`, not `@google/genai`. Model ids are hardcoded (`gemini-3.5-flash`, `gemini-3.6-flash`, `gemini-3.8-flash`, `gemini-2.5-flash`, `gemini-flash-latest`, `gemini-2.0-flash`). Several of those names are guesses. There is no `GEMINI_TEXT_MODEL` / `GEMINI_IMAGE_MODEL`, no streaming, no debounce, no image generation, no cost cap, and no prompt log. If the key is missing, it falls back to a heuristic parser that still emits “Official …” descriptions.

## 7. Env vars this code actually reads

| Variable | Used |
| --- | --- |
| `MONGODB_URI` | Yes. Required for any DB call. |
| `GEMINI_API_KEY` | Yes, server-only, in `lib/gemini.ts`. |
| `ADMIN_PASSWORD` | Yes. Seeds the first admin and is a profile-update fallback. |
| `ADMIN_USERNAME` | Optional. Default `admin`. |
| `ADMIN_INITIAL_PASSWORD` | Optional alias of `ADMIN_PASSWORD`. |
| `APPS_SCRIPT_URL`, `APPS_SCRIPT_KEY` | Present in `.env.local` only. No reader. |

There is no `.env.example`. `.env.local` is gitignored. Do not commit it.

Not present, and required by later phases: `GEMINI_TEXT_MODEL`, `GEMINI_IMAGE_MODEL`, `GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID`, analytics ids, storage keys.

## 8. v1 item map

“Done” means the behavior already matches the later phase. “Partial” means a field or screen exists and still fails the acceptance bar.

| Item | Status | Note |
| --- | --- | --- |
| Next.js + TypeScript + MongoDB | Done | Versions in §1. NestJS is absent. |
| App Router public pages for home, products, contact, admin | Done | Home is `/` → `/home`, not a direct `/`. |
| Product / service / notice / FAQ / review / site settings in MongoDB | Partial | Models exist. Category, coupon, lead, CMS page, audit log do not. |
| Admin edit of products, services, notices, reviews, FAQs, settings | Partial | UI and routes exist. Writes are unauthenticated. No drag-and-drop, duplicate, or re-list. |
| Hide product | Partial | `is_hidden` works. Hidden items are still available via `include_hidden=true` with no auth. |
| `sort_order` | Partial | Stored and used in queries. No drag-and-drop. |
| One `delivery_time` string | Partial | Field exists. Global promises elsewhere contradict it. |
| Site settings for WhatsApp, community, Instagram, email, hero | Partial | Phone, community, Instagram, hero are on `SiteConfig`. Email is hardcoded. Footer Instagram ignores settings and uses `turnitin__plagiarism`. |
| Gemini server key | Partial | Key stays on the server. SDK, model env, streaming suggest, image gen, rate limit, and cost log are missing. |
| WhatsApp deep links | Partial | Correct number and community URL exist, and are also hardcoded in several components. |
| Remove fake stats, “Official”, anonymous reviews | Missing | Still in source and in seed data. |
| EduGenius report names, no Turnitin branding in titles/URLs/alt | Missing | Turnitin names, ids, and the second Instagram handle are in source. |
| Legal pages and real footer links | Missing | Three labels point at `/home`. |
| Trademark disclaimer, grievance officer | Missing | |
| Hide `/admin` from the public footer, noindex, rate limit | Missing | Footer link is present. No middleware, no rate limit. |
| `/c/[slug]` and `/p/[slug]`, 301 from `/products?category=` | Missing | Current detail URL is `/product/[slug]`. Category is a query string. |
| On-demand revalidation | Missing | Client fetch only. |
| Audit log | Missing | |
| Promo images and Web Share with a file | Missing | Copy-link only. No media store. |
| Sticky two-button bottom bar, no floating bubble | Missing | Floating widget is what ships. |
| Light default theme | Missing | Default is dark. |
| `/build`, portfolio, quote form, Lead pipeline | Missing | |
| Google reviews or verified-order reviews | Missing | Hardcoded and seeded quotes only. |
| Canonical host, sitemap, robots, JSON-LD, per-page OG image | Missing | |
| Analytics events | Missing | `utils/visitorTracker.ts` writes visits to `localStorage` only. |
| Accessibility CI | Missing | |
| `.env.example`, `docs/ADMIN_GUIDE.md` | Missing | |

## 9. Suggested order after you approve

No code until you say so.

1. **Phase 1 in this Next.js app, still on Hostinger.** Delete unverifiable claims, fix report naming and the footer disclaimer, add CMS legal pages, one delivery line per product, and lock down `/admin` (httpOnly session, rate limit, noindex, footer link removed). Treat the open write APIs as part of this phase, not as a later nice-to-have.
2. **Phase 2.** Add the missing models (Category, Coupon, Lead, CmsPage, AuditLog). Extend Product and Service. Revalidation only after the Hostinger Node check in §4.
3. **Phases 3–7** as written in your brief. Do not add NestJS. Do not add a second host.

## 10. Acceptance for this phase

`docs/REPO_AUDIT_V2.md` is the only file added. Application code was not changed.
