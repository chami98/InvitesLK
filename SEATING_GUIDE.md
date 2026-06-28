# 🎭 Seating Arrangement Tool - Complete Guide

## Overview

The Seating Arrangement Tool is a drag-and-drop interface for assigning guests to tables. It integrates seamlessly with your RSVP system and provides export capabilities for venue coordination.

## What's New

### Files Added
- `components/SeatingChart.tsx` - Main seating UI component
- `app/rsvp/[coupleSlug]/seating/page.tsx` - Seating page
- `app/api/seating/tables/route.ts` - Table management API
- `app/api/seating/assign/route.ts` - Guest assignment API

### Files Modified
- `lib/supabase.ts` - Added `SeatingTable` and `GuestSeating` types
- `app/rsvp/[coupleSlug]/page.tsx` - Added "Seating" button to RSVP dashboard

## Setup Instructions

### Step 1: Run Supabase SQL Migrations

Go to your Supabase project dashboard and open the **SQL Editor**.

Create a new query and copy-paste the following SQL:

```sql
-- Create seating_tables table
create table seating_tables (
  id uuid default gen_random_uuid() primary key,
  couple_slug text not null,
  table_number integer not null,
  capacity integer not null check (capacity >= 1 and capacity <= 20),
  created_at timestamp default now(),
  constraint seating_tables_couple_slug_table_number_unique unique (couple_slug, table_number)
);

-- RLS Policies for seating_tables
create policy "Allow anon read" on seating_tables for select to anon using (true);
create policy "Allow anon insert" on seating_tables for insert to anon with check (true);
create policy "Allow anon delete" on seating_tables for delete to anon using (true);

-- Create guest_seating table
create table guest_seating (
  id uuid default gen_random_uuid() primary key,
  rsvp_id uuid not null references rsvp_responses(id) on delete cascade,
  seating_table_id uuid not null references seating_tables(id) on delete cascade,
  guest_name text not null,
  couple_slug text not null,
  created_at timestamp default now(),
  constraint guest_seating_rsvp_id_unique unique (rsvp_id)
);

-- RLS Policies for guest_seating
create policy "Allow anon read" on guest_seating for select to anon using (true);
create policy "Allow anon insert" on guest_seating for insert to anon with check (true);
create policy "Allow anon delete" on guest_seating for delete to anon using (true);
create policy "Allow anon update" on guest_seating for update to anon using (true) with check (true);
```

Click **Run** to execute all queries.

### Step 2: Verify Tables

In your Supabase dashboard, go to **Table Editor** and verify you see:
- ✅ `seating_tables`
- ✅ `guest_seating`

### Step 3: Access the Tool

The seating tool is now available at:
```
http://localhost:3000/rsvp/[coupleSlug]/seating
```

**Example:** `http://localhost:3000/rsvp/damsarani-supun/seating`

You'll need your RSVP PIN (same PIN from the main RSVP dashboard).

## How to Use

### Creating Tables

1. Navigate to the Seating page from the RSVP Dashboard
2. Set a **Table Capacity** (default: 8 guests, max: 20)
3. Click **Add Table**
4. Tables are numbered automatically

### Assigning Guests

1. View the **"Unassigned Guests"** section at the bottom
2. **Drag** a guest name from the unassigned list
3. **Drop** them onto a table card
4. Guest appears in the table immediately

### Managing Assignments

- **Remove guest**: Click the **×** button on a guest card
- **Delete table**: Click the trash icon on a table header
- **View capacity**: Each table shows current occupancy (e.g., "3 / 8 guests")

### Exporting Seating Charts

1. Click **Export CSV** button
2. File downloads as `seating-[coupleSlug]-[date].csv`
3. Contains: Table number, Capacity, Guest list

Use the CSV to:
- Share with caterers
- Create place cards
- Print for venue staff
- Coordinate with vendors

## Features

✅ **Drag-and-drop interface** - Intuitive guest assignment
✅ **Real-time updates** - Changes save immediately
✅ **Table management** - Create, delete, customize capacity
✅ **Capacity tracking** - Visual occupancy indicators
✅ **CSV export** - Print-friendly seating lists
✅ **PIN-protected** - Same security as RSVP dashboard
✅ **Responsive design** - Works on mobile, tablet, desktop
✅ **Smart filtering** - Only shows attending guests

## Data Model

### seating_tables
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| couple_slug | TEXT | Links to couple |
| table_number | INTEGER | Unique per couple |
| capacity | INTEGER | 1-20 guests |
| created_at | TIMESTAMP | Auto-generated |

### guest_seating
| Field | Type | Notes |
|-------|------|-------|
| id | UUID | Primary key |
| rsvp_id | UUID | Links to RSVP response |
| seating_table_id | UUID | Links to table |
| guest_name | TEXT | Cached for quick display |
| couple_slug | TEXT | Links to couple |
| created_at | TIMESTAMP | Auto-generated |

## API Endpoints

### GET `/api/seating/tables`
Get all seating tables for a couple.

**Query params:** `coupleSlug`

**Response:**
```json
{
  "tables": [
    {
      "id": "uuid",
      "couple_slug": "damsarani-supun",
      "table_number": 1,
      "capacity": 8,
      "created_at": "2026-06-28T..."
    }
  ]
}
```

### POST `/api/seating/tables`
Create a new seating table.

**Body:**
```json
{
  "coupleSlug": "damsarani-supun",
  "tableNumber": 1,
  "capacity": 8
}
```

### DELETE `/api/seating/tables`
Delete a seating table.

**Query params:** `tableId`

### GET `/api/seating/assign`
Get all guest seating assignments for a couple.

**Query params:** `coupleSlug`

### POST `/api/seating/assign`
Assign or unassign a guest to/from a table.

**Body:**
```json
{
  "coupleSlug": "damsarani-supun",
  "rsvpId": "uuid",
  "tableId": "uuid" // omit or null to unassign
}
```

## Tips & Tricks

1. **Bulk assign**: Create all tables first, then drag guests one by one
2. **Capacity planning**: Divide total attending guests by average table capacity
3. **VIP tables**: Create a smaller table for family members
4. **Mixed groups**: Drag multiple guests to the same table carefully
5. **Last-minute changes**: Drag guests around anytime before the wedding
6. **Export before printing**: Generate CSV a few days before the event

## Troubleshooting

### Tables not loading?
- Check Supabase SQL migrations ran successfully
- Verify tables exist in Supabase Table Editor
- Try refreshing the page

### Can't drag guests?
- Ensure guest has RSVP status of "attending" or "maybe"
- "Not attending" guests don't appear in seating
- Guests already assigned appear in a specific table, not unassigned list

### Export not working?
- Ensure your browser allows downloads
- Check that CSV file opened (may download to Downloads folder)
- Try a different browser if issues persist

### PIN gate not working?
- Use the same PIN from the RSVP dashboard
- PIN is case-sensitive
- Check sessionStorage is enabled in browser settings

## Future Enhancements

Potential features to add later:
- 📊 Table layout visualizer (visual floor plan)
- 👥 Print place cards (guest name cards)
- 📋 Dietary restrictions by table
- 🔄 Swap guests between tables
- 🎯 Smart assignment (group by party, meal preference)
- 📧 Email seating confirmations to guests
- 🎨 Customizable table names (e.g., "Garden", "Terrace")

## Questions?

If you encounter issues:
1. Check the Supabase logs for error details
2. Verify tables and policies are created correctly
3. Test with a sample guest assignment first
4. Check browser console for JavaScript errors

Happy seating! 🎉
