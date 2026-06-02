# Towns Auto

A modern used-car dealership website built with **Next.js (App Router)**,
**Tailwind CSS v4**, and **Supabase**, designed to deploy on **Netlify**.

## Features

- Public site: Home, Inventory (search + filters), Vehicle details, Financing,
  Reviews, About, Contact, and Payment Info pages.
- Lead capture: contact, reservation, and financing pre-qualification forms save
  to Supabase. (No card or bank details are ever collected on the site.)
- Admin dashboard at `/admin`: add/edit/delete vehicles, upload photos to
  Supabase Storage, and view incoming leads & financing requests.
- SEO: per-page metadata, sitemap, and robots.
- Works out of the box with bundled **sample inventory** even before Supabase is
  connected, so you can preview it immediately.

## 1. Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Without Supabase configured, the site shows sample
cars and forms are disabled (with a friendly notice).

## 2. Connect Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In the dashboard, open **SQL Editor** and run, in order:
   - [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql) —
     vehicles, leads, financing tables, security policies, photo storage bucket.
   - [`supabase/migrations/0002_reviews.sql`](supabase/migrations/0002_reviews.sql) —
     customer reviews table + avatar storage bucket.
3. Copy `.env.example` to `.env.local` and fill in your keys from
   **Project Settings → API**:

   ```bash
   cp .env.example .env.local
   ```

4. (Optional) Load sample data. Either run the seed script for vehicles:

   ```bash
   npm run seed
   ```

   …or paste the generated SQL files into the Supabase SQL editor (no keys
   needed): [`supabase/seed.sql`](supabase/seed.sql) for vehicles and
   [`supabase/seed-reviews.sql`](supabase/seed-reviews.sql) for 24 reviews.

5. Create an admin login: in Supabase, go to **Authentication → Users → Add
   user**, set an email and password. Use those to sign in at `/admin/login`.

Restart `npm run dev` after editing `.env.local`.

## 3. Customize for the business

- Edit [`src/lib/site-config.ts`](src/lib/site-config.ts) — business name, phone,
  email, address, hours, and service areas. Everything else updates from there.
- Replace the sample reviews in `src/app/(site)/reviews/page.tsx`.
- Add real vehicles and photos through the `/admin` dashboard.

## Email notifications via SMTP (optional but recommended)

When a customer submits any form (reserve, buy, finance, contact, financing),
an email alert is sent to your admin inbox over SMTP.

**Using Gmail:**
1. On the Google account (`kelvinej191@gmail.com`), enable **2-Step
   Verification**.
2. Go to **Google Account → Security → App passwords**, create one for "Mail",
   and copy the 16-character password.
3. Add to `.env.local` (and Netlify → Environment variables):

   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=kelvinej191@gmail.com
   SMTP_PASS=your-16-char-app-password
   EMAIL_FROM=Towns Auto <kelvinej191@gmail.com>
   NOTIFY_EMAIL=kelvinej191@gmail.com
   ```

Any SMTP provider works (Zoho, Outlook, your host, SendGrid SMTP, etc.) — just
set the matching `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS`. Use
`SMTP_PORT=465` for SSL.

If SMTP isn't configured, forms still work and save normally — they just don't
send an email. (Note: some serverless hosts restrict outbound SMTP; Netlify
Functions allow it, but if delivery ever fails, an API-based provider is the
fallback.)

## 4. Deploy to Netlify

1. Push this repo to GitHub.
2. In Netlify, **Add new site → Import from Git** and pick the repo.
   Netlify auto-detects Next.js (build: `npm run build`).
3. Under **Site settings → Environment variables**, add the same three variables
   from `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).
4. Deploy. Once live, set `url` in `src/lib/site-config.ts` to your real domain
   for correct SEO/sitemap links.

## Tech notes

- Forms use React Server Actions (`src/app/actions.ts`).
- Row Level Security: anyone can read vehicles and submit leads; only
  authenticated admins can write inventory or read leads.
- The service-role key is server-only and used solely by the seed script.

## Project structure

```
src/
  app/
    (site)/          Public pages + layout (header/footer)
    admin/           Admin login + dashboard (route group "(panel)")
    actions.ts       Public form server actions
  components/        UI + forms + admin form
  lib/
    site-config.ts   Business details (edit me)
    supabase/        Browser, server, and admin clients
    vehicles.ts      Data access (Supabase + sample fallback)
    sample-vehicles.ts
supabase/
  migrations/        SQL schema + RLS + storage bucket
scripts/seed.ts      Loads sample inventory into Supabase
```
