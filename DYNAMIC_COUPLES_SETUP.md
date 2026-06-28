# Dynamic Wedding Creation - Supabase Setup

## Overview

This feature allows users to create new weddings through a web UI instead of hardcoding them in `lib/data.ts`. Weddings are stored in a Supabase `couples` table and can be accessed alongside mock/demo couples.

## SQL Migrations

Run the following SQL in your Supabase SQL Editor to set up the `couples` table.

### Create `couples` table

```sql
create table couples (
  id uuid default gen_random_uuid() primary key,
  slug text not null unique,
  partner_a text not null,
  partner_b text not null,
  date text not null,
  venue text not null,
  template_id integer not null,
  rsvp_pin text not null,
  created_at timestamp default now(),
  constraint valid_template_id check (template_id >= 1 and template_id <= 15)
);

-- RLS Policies
create policy "Allow anon read" on couples for select to anon using (true);
create policy "Allow anon insert" on couples for insert to anon with check (true);
```

### Optional: Enable RLS for Security

```sql
alter table couples enable row level security;
```

## Setup Steps

1. **Go to Supabase**: https://app.supabase.com
2. **Select your project**
3. **Open SQL Editor**
4. **Create new query**
5. **Paste the SQL above**
6. **Click Run**

## Verification

You should now see the `couples` table in your **Table Editor**.

## How It Works

### User Flow
1. User visits homepage and clicks **"Create Your Wedding"** button
2. Fills out form with couple details, wedding info, and PIN
3. System generates a unique slug from partner names
4. Wedding is saved to the `couples` table
5. User is redirected to their new invitation at `/{slug}`

### Data Access Pattern
- **getCouple()** checks **mock data first** (for demo couples)
- Falls back to **database** for custom-created weddings
- This allows coexistence of demo and production data

## Form Fields

| Field | Type | Rules |
|-------|------|-------|
| Partner A | String | Required, 1+ chars |
| Partner B | String | Required, 1+ chars |
| Date | String | Required, e.g., "Saturday, June 14, 2026" |
| Venue | String | Required, e.g., "Galadari Hotel, Colombo" |
| Template ID | Integer | Required, 1-15 |
| RSVP PIN | String | Required, 4+ chars |

## Slug Generation

Slugs are auto-generated from partner names:
- **Input**: "John Doe" & "Jane Smith"
- **Slug**: `john-doe-jane-smith`
- **Slug is unique** - system prevents duplicates

## Features

✅ Create new weddings via UI
✅ Auto-generated unique slugs
✅ PIN protection for RSVP dashboard
✅ Choose from 15 template designs
✅ Works alongside existing demo weddings
✅ Full RSVP & seating support for custom weddings

## Pages & Routes

| Route | Purpose |
|-------|---------|
| `/create-wedding` | Wedding creation form |
| `/api/couples` | API to create/fetch couples |
| `/{slug}` | Invitation (works with DB couples) |
| `/rsvp/{slug}` | RSVP dashboard (works with DB couples) |
| `/rsvp/{slug}/seating` | Seating tool (works with DB couples) |

## API Endpoints

### GET `/api/couples`
Get all couples (DB + mock data).

**Response:**
```json
{
  "couples": [
    {
      "id": "uuid",
      "slug": "john-jane",
      "partner_a": "John",
      "partner_b": "Jane",
      "date": "Saturday, June 14, 2026",
      "venue": "Hotel, City",
      "template_id": 1,
      "rsvp_pin": "1234",
      "created_at": "2026-06-28T..."
    }
  ]
}
```

### GET `/api/couples?slug=john-jane`
Get specific couple.

**Response:**
```json
{
  "couple": { ... }
}
```

### POST `/api/couples`
Create new couple.

**Body:**
```json
{
  "partnerA": "John",
  "partnerB": "Jane",
  "date": "Saturday, June 14, 2026",
  "venue": "Hotel, City",
  "templateId": 1,
  "rsvpPin": "1234"
}
```

**Response (201 Created):**
```json
{
  "couple": { ... }
}
```

## Error Handling

| Error | Cause | Fix |
|-------|-------|-----|
| "Couple with this name already exists" | Slug collision | Use different names |
| "Invalid template ID" | Template 1-15 only | Choose from dropdown |
| "RSVP PIN must be 4+ chars" | PIN too short | Use longer PIN |
| "Could not create couple" | Database error | Check Supabase status |

## Testing

1. **Create a wedding** via `/create-wedding`
2. **View it** at `/{slug}`
3. **Test RSVP** at `/rsvp/{slug}` with PIN
4. **Set up seating** at `/rsvp/{slug}/seating`
5. **Export CSV** to verify data

## Production Notes

- **RLS is optional** - public inserts are allowed (low security, suitable for small weddings)
- **Consider adding authentication** if you want to prevent spam
- **Add rate limiting** to `/api/couples` POST endpoint
- **Validate all inputs** server-side (already done)
- **Test slug collision handling** before going live

## Future Enhancements

- User accounts to manage multiple weddings
- Edit wedding details after creation
- Delete/archive weddings
- Custom agenda templates
- Gallery image uploads
- Email notifications
