-- Towns Auto — customer reviews
-- Run this in the Supabase SQL editor after 0001_init.sql.

create table if not exists public.reviews (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  location     text,
  rating       int  not null default 5 check (rating between 1 and 5),
  quote        text not null,
  avatar_url   text,
  is_published boolean not null default true,
  is_featured  boolean not null default false,
  sort_order   int  not null default 0,
  created_at   timestamptz not null default now()
);

create index if not exists reviews_published_idx on public.reviews (is_published);
create index if not exists reviews_featured_idx on public.reviews (is_featured);

alter table public.reviews enable row level security;

-- Public can read published reviews; staff can read everything.
drop policy if exists "reviews_public_read" on public.reviews;
create policy "reviews_public_read"
  on public.reviews for select
  to anon
  using (is_published = true);

drop policy if exists "reviews_staff_read" on public.reviews;
create policy "reviews_staff_read"
  on public.reviews for select
  to authenticated
  using (true);

-- Only authenticated staff can create/update/delete reviews.
drop policy if exists "reviews_staff_write" on public.reviews;
create policy "reviews_staff_write"
  on public.reviews for all
  to authenticated
  using (true)
  with check (true);

-- Storage bucket for reviewer avatars
insert into storage.buckets (id, name, public)
values ('review-avatars', 'review-avatars', true)
on conflict (id) do nothing;

drop policy if exists "review_avatars_public_read" on storage.objects;
create policy "review_avatars_public_read"
  on storage.objects for select
  using (bucket_id = 'review-avatars');

drop policy if exists "review_avatars_staff_write" on storage.objects;
create policy "review_avatars_staff_write"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'review-avatars')
  with check (bucket_id = 'review-avatars');
