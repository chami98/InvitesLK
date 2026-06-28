# Admin Panel Setup - Wedding Management

## Overview

The admin panel is a protected area where you can create and manage wedding invitations. Access is controlled via a PIN stored in environment variables.

## Setup Instructions

### 1. Set Admin PIN in Environment Variables

Add this to your `.env.local` file:

```bash
NEXT_PUBLIC_ADMIN_PIN=your-secure-pin-here
```

**Choose a secure PIN:**
- Minimum 4 characters recommended
- Can be numeric or alphanumeric
- Example: `NEXT_PUBLIC_ADMIN_PIN=1234` or `NEXT_PUBLIC_ADMIN_PIN=secure-admin-pin`

### 2. Restart Your Dev Server

```bash
npm run dev
```

After restart, the admin PIN will be active.

### 3. Access Admin Panel

Navigate to: **http://localhost:3000/admin**

You'll be prompted for the admin PIN. Enter the PIN you set in `.env.local`.

## Admin Features

### Dashboard (`/admin`)
- Overview of admin functions
- Quick access to create and manage weddings

### Create Wedding (`/admin/create-wedding`)
- Form to create new wedding invitations
- Fields:
  - Partner A & B names
  - Wedding date
  - Venue
  - Template selection (1-15)
  - RSVP PIN (for guest dashboard access)
- Auto-generates unique slug from partner names
- Prevents duplicate weddings

### Manage Weddings (`/admin/weddings`)
- View all created weddings
- See wedding details (date, venue, template)
- Quick access links:
  - 👁️ View invitation
  - 🔗 View RSVP dashboard
  - 🗑️ Delete wedding (coming soon)

## How It Works

### Authentication Flow

```
User visits /admin
     ↓
AdminAuthGate checks sessionStorage
     ↓
If not authenticated:
  → Show PIN login form
  → User enters PIN
  → Validate against NEXT_PUBLIC_ADMIN_PIN
  → Store "admin_auth" in sessionStorage
  → Grant access
```

### Session Management

- **Duration:** Session-based (until browser closes)
- **Storage:** Browser sessionStorage
- **Logout:** Click "Logout" button in header
  - Clears session
  - Redirects to home page

## Security Considerations

### Current Implementation
- PIN stored in environment variables (public, but config)
- Session-based authentication
- No database authentication
- Simple but suitable for small deployments

### Production Recommendations
- 🔐 Use stronger PINs (16+ characters)
- 🔐 Add rate limiting to prevent brute force
- 🔐 Implement user accounts with passwords
- 🔐 Use JWT tokens for session management
- 🔐 Add audit logging for wedding creation
- 🔐 Use HTTPS only
- 🔐 Add CAPTCHA to login form

## Environment Variables

### Required
```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key
NEXT_PUBLIC_ADMIN_PIN=your-admin-pin
```

### Examples
```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://abc123.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
NEXT_PUBLIC_ADMIN_PIN=1234
```

## Workflow

### Creating a Wedding

1. Go to `/admin`
2. Click "Create Wedding"
3. Fill out the form:
   - Names (Partner A & B)
   - Date (formatted)
   - Venue
   - Template (1-15)
   - RSVP PIN (for guests accessing dashboard)
4. Click "Create Wedding"
5. Redirected to the new invitation

### Managing Weddings

1. Go to `/admin/weddings`
2. View all created weddings
3. Click 👁️ to view the invitation
4. Click 🔗 to access RSVP dashboard
5. Click 🗑️ to delete (coming soon)

### Guest Experience

Guests access:
- **Invitation:** `/{slug}` (public)
- **RSVP:** `/rsvp/{slug}` (requires PIN from admin)
- **No admin access** - only view invitation and submit RSVP

## Tips

- **Secure PIN:** Use a PIN that's hard to guess but easy to remember
- **Backup:** Store your PIN securely somewhere safe
- **Multiple PINs:** Current implementation uses one PIN for all admins
- **PIN Changes:** To change PIN, update `.env.local` and restart server

## Troubleshooting

### "Invalid admin PIN"
- Check `.env.local` has correct `NEXT_PUBLIC_ADMIN_PIN`
- Verify dev server restarted after adding PIN
- Ensure no extra spaces in PIN

### Admin page not loading
- Check admin PIN is set in `.env.local`
- Clear browser cache
- Check browser console for errors

### Wedding creation fails
- Verify Supabase tables exist (run migrations)
- Check Supabase keys in `.env.local`
- Verify couple slug doesn't already exist

## API Endpoints

### POST `/api/couples`
Create new wedding (admin use)

**Headers:** None required (PIN validation done in UI)

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

### GET `/api/couples`
Get all weddings

**Response:**
```json
{
  "couples": [
    {
      "id": "uuid",
      "slug": "john-jane",
      "partner_a": "John",
      "partner_b": "Jane",
      ...
    }
  ]
}
```

## Future Enhancements

- User account system (multiple admins)
- Password-based authentication
- Edit wedding details after creation
- Wedding deletion with confirmation
- Audit logs
- Bulk operations
- Export all wedding data
- Analytics dashboard

## FAQ

**Q: Can I change the admin PIN?**
A: Yes, update `NEXT_PUBLIC_ADMIN_PIN` in `.env.local` and restart the server.

**Q: Can I have multiple admin PINs?**
A: Current implementation uses one PIN. For multiple admins, upgrade to user accounts.

**Q: What if I forget the PIN?**
A: Update `.env.local` and restart the server. No recovery needed.

**Q: Is the PIN secure?**
A: The PIN is stored in environment variables (Git-ignored). It's not transmitted to clients except in validation checks. For production, implement proper authentication.

**Q: Can guests access the admin panel?**
A: No. Guests see only the public invitation and RSVP form. They cannot access `/admin`.

**Q: What happens when I logout?**
A: Session is cleared from browser memory. You'll need to re-enter PIN to access admin again.
