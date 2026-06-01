-- Towns Auto — initial schema
-- Run this in the Supabase SQL editor (or via the Supabase CLI) on a fresh project.

-- =========================================================================
-- Tables
-- =========================================================================

create table if not exists public.vehicles (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  year            int  not null,
  make            text not null,
  model           text not null,
  trim            text,
  body_type       text not null default 'Sedan',
  price           numeric not null,
  down_payment    numeric,
  mileage         int  not null default 0,
  condition       text not null default 'Very Good',
  fuel_type       text not null default 'Gasoline',
  transmission    text not null default 'Automatic',
  drivetrain      text,
  exterior_color  text,
  interior_color  text,
  vin             text,
  description     text not null default '',
  features        text[] not null default '{}',
  images          text[] not null default '{}',
  warranty        text default '90-Day Warranty',
  is_featured     boolean not null default false,
  is_sold         boolean not null default false,
  created_at      timestamptz not null default now()
);

create index if not exists vehicles_created_at_idx on public.vehicles (created_at desc);
create index if not exists vehicles_is_sold_idx on public.vehicles (is_sold);

-- Customer leads (contact / reserve / buy / test-drive requests)
create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  type          text not null default 'contact',
  name          text not null,
  email         text not null,
  phone         text not null,
  message       text,
  vehicle_id    uuid references public.vehicles (id) on delete set null,
  vehicle_label text,
  created_at    timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);

-- Financing pre-qualification applications
create table if not exists public.financing_applications (
  id                  uuid primary key default gen_random_uuid(),
  full_name           text not null,
  email               text not null,
  phone               text not null,
  employment_status   text not null,
  annual_income       numeric,
  desired_vehicle     text,
  down_payment_budget numeric,
  notes               text,
  created_at          timestamptz not null default now()
);

create index if not exists financing_created_at_idx on public.financing_applications (created_at desc);

-- =========================================================================
-- Row Level Security
-- =========================================================================

alter table public.vehicles enable row level security;
alter table public.leads enable row level security;
alter table public.financing_applications enable row level security;

-- Vehicles: anyone can read; only authenticated staff can write.
drop policy if exists "vehicles_public_read" on public.vehicles;
create policy "vehicles_public_read"
  on public.vehicles for select
  using (true);

drop policy if exists "vehicles_staff_write" on public.vehicles;
create policy "vehicles_staff_write"
  on public.vehicles for all
  to authenticated
  using (true)
  with check (true);

-- Leads: anyone (anon) can submit; only staff can read.
drop policy if exists "leads_public_insert" on public.leads;
create policy "leads_public_insert"
  on public.leads for insert
  to anon, authenticated
  with check (true);

drop policy if exists "leads_staff_read" on public.leads;
create policy "leads_staff_read"
  on public.leads for select
  to authenticated
  using (true);

-- Financing applications: anyone can submit; only staff can read.
drop policy if exists "financing_public_insert" on public.financing_applications;
create policy "financing_public_insert"
  on public.financing_applications for insert
  to anon, authenticated
  with check (true);

drop policy if exists "financing_staff_read" on public.financing_applications;
create policy "financing_staff_read"
  on public.financing_applications for select
  to authenticated
  using (true);

-- =========================================================================
-- Storage bucket for vehicle photos
-- =========================================================================

insert into storage.buckets (id, name, public)
values ('vehicle-photos', 'vehicle-photos', true)
on conflict (id) do nothing;

drop policy if exists "vehicle_photos_public_read" on storage.objects;
create policy "vehicle_photos_public_read"
  on storage.objects for select
  using (bucket_id = 'vehicle-photos');

drop policy if exists "vehicle_photos_staff_write" on storage.objects;
create policy "vehicle_photos_staff_write"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'vehicle-photos')
  with check (bucket_id = 'vehicle-photos');
