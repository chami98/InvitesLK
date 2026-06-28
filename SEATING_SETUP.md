# Seating Arrangement Tool - Supabase Setup

## SQL Migrations

Run the following SQL in your Supabase SQL Editor to create the required tables and policies.

### 1. Create `seating_tables` table

```sql
create table seating_tables (
  id uuid default gen_random_uuid() primary key,
  couple_slug text not null,
  table_number integer not null,
  capacity integer not null check (capacity >= 1 and capacity <= 20),
  created_at timestamp default now(),
  constraint seating_tables_couple_slug_table_number_unique unique (couple_slug, table_number)
);

-- RLS Policy: Allow anon read for any couple
create policy "Allow anon read" on seating_tables for select to anon using (true);

-- RLS Policy: Allow anon insert
create policy "Allow anon insert" on seating_tables for insert to anon with check (true);

-- RLS Policy: Allow anon delete
create policy "Allow anon delete" on seating_tables for delete to anon using (true);
```

### 2. Create `guest_seating` table

```sql
create table guest_seating (
  id uuid default gen_random_uuid() primary key,
  rsvp_id uuid not null references rsvp_responses(id) on delete cascade,
  seating_table_id uuid not null references seating_tables(id) on delete cascade,
  guest_name text not null,
  couple_slug text not null,
  created_at timestamp default now(),
  constraint guest_seating_rsvp_id_unique unique (rsvp_id)
);

-- RLS Policy: Allow anon read for any couple
create policy "Allow anon read" on guest_seating for select to anon using (true);

-- RLS Policy: Allow anon insert
create policy "Allow anon insert" on guest_seating for insert to anon with check (true);

-- RLS Policy: Allow anon delete
create policy "Allow anon delete" on guest_seating for delete to anon using (true);

-- RLS Policy: Allow anon update
create policy "Allow anon update" on guest_seating for update to anon using (true) with check (true);
```

## Steps to Setup

1. Go to your Supabase project: https://app.supabase.com
2. Navigate to the **SQL Editor**
3. Click **New Query**
4. Copy and paste both SQL blocks above
5. Click **Run** to execute

## Verification

You should now see two new tables in your **Table Editor**:
- `seating_tables`
- `guest_seating`

The seating arrangement tool should now be fully functional!

## Features

✅ Create multiple seating tables with custom capacities
✅ Drag-and-drop guest assignment
✅ Visual table layout with guest count
✅ Remove guests from tables
✅ Delete tables
✅ Export seating chart as CSV
✅ PIN-protected access (inherits from RSVP dashboard)

## Access

The seating tool is available at: `/rsvp/[coupleSlug]/seating`

There's a **"Seating"** button in the RSVP Dashboard header that links to it.
