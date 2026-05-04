# KARMS Infrastructure Documentation

## Overview

KARMA is now integrated with **KARMS** (Kissan Agro Reforms and Management Systems) infrastructure. This document describes the complete system setup, including database schema, validation, and component implementations.

## System Architecture

### 1. Database Schema (Supabase)

#### Blogs Table
```sql
CREATE TABLE blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
```

**Features:**
- Unique slug-based URLs
- Markdown support for content
- Published/Draft status
- Audit timestamps

**Row Level Security (RLS):**
- Public can read published blogs
- Authenticated users can create, update, and delete blogs

#### Community Table
```sql
CREATE TABLE community (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  display_name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);
```

**Features:**
- Community member profiles
- Role-based identification
- Optional bio and avatar
- Auto-timestamps

**Row Level Security (RLS):**
- Public can read all community members
- Anyone can create community entries

---

## 2. Validation & Data Integrity

### Zod Schemas

All form inputs are validated using Zod for 100% data integrity:

#### Blog Schema
- **title**: 3-255 characters
- **slug**: 3-100 characters, lowercase with hyphens only
- **content**: Minimum 10 characters
- **published**: Boolean flag

#### Community Schema
- **display_name**: 2-100 characters (required)
- **role**: 2-100 characters (required)
- **bio**: 0-500 characters (optional)
- **avatar_url**: Valid URL format (optional)

**Validation Helper:**
```typescript
import { validateData, blogSchema } from '@/lib/schemas';

const result = validateData(blogSchema, inputData);
if (!result.success) {
  console.error(result.errors); // Display validation errors
}
```

---

## 3. Components & Pages

### Blog Engine

#### Pages
- **`/blog`** - Lists all published blogs
- **`/blog/[slug]`** - Individual blog post view

#### Components
- **`BlogList.tsx`** - Displays published blogs with:
  - Server-side data fetching
  - Date formatting
  - Link previews
  - Error handling

#### Example Blog Post
Navigate to `/blog/first-post` to view a blog post.

### Admin Dashboard

#### Pages
- **`/admin/blog`** - Admin console with password protection (default: `admin123`)

#### Features
- Create new blog posts
- Edit existing posts
- Delete posts
- Toggle publish status
- Real-time validation with Zod
- Optimistic UI updates

### Community System

#### Form Component: `CommunityForm.tsx`
Located on homepage with:
- Full form validation with Zod
- Optimistic updates (UI reflects immediately)
- Error display per field
- Success confirmation
- Recently joined member preview

#### Features
- Add community members
- Zod validation
- Optimistic rendering
- Error recovery

---

## 4. Optimistic Updates

### Implementation Pattern

Optimistic updates provide instant UI feedback while data persists to database:

```typescript
// 1. Create optimistic item
const optimisticItem = { id: 'temp-123', ...data };
setItems(prev => [optimisticItem, ...prev]);

// 2. Submit to server
const result = await addItem(data);

// 3. Replace optimistic with real item
setItems(prev => 
  prev.map(item => 
    item.id === optimisticItem.id ? result : item
  )
);

// 4. On error, remove optimistic item
setItems(prev => 
  prev.filter(item => item.id !== optimisticItem.id)
);
```

### Components Using Optimistic Updates
- **CommunityForm**: Shows newly joined members immediately
- **AdminBlogDashboard**: Lists created/updated posts instantly

---

## 5. Branding & UI

### KARMS References
All system references use the acronym **KARMS**:
- Page titles: "KARMA - KARMS Agricultural Platform"
- Section headers: "KARMS Blog", "Join the KARMS Community"
- Metadata keywords include "KARMS"

### Background Image
- **Location**: `/public/watermarked_img_11443283127393356644.png`
- **Application**: Fixed background across entire application
- **Style**: `backgroundAttachment: fixed` for parallax effect

### Color Scheme
- **Forest Green** (`#1a3a2a`) - Primary text and headings
- **Dragon Pink** (`#e85d75`) - Accents and CTAs
- **Cream** (`#fefdf7`) - Background

---

## 6. Setup Instructions

### 1. Database Migration

Log into your Supabase dashboard and run the SQL migration:

```bash
# File: migrations/001_karms_schema.sql
```

Copy and paste the migration script into Supabase SQL editor.

### 2. Environment Variables

Add to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
```

### 3. Upload Background Image

Place `watermarked_img_11443283127393356644.png` in `/public` folder.

### 4. Start Development Server

```bash
npm run dev
```

---

## 7. API Routes (Server Functions)

All functions are in `/lib/karms-service.ts`:

### Blogs
- `getPublishedBlogs()` - Fetch all published blogs
- `getBlogBySlug(slug)` - Fetch single blog
- `getAllBlogs()` - Fetch all blogs (admin)
- `createBlog(input)` - Create new blog
- `updateBlog(id, input)` - Update blog
- `deleteBlog(id)` - Delete blog

### Community
- `getCommunityMembers()` - Fetch all members
- `addCommunityMember(input)` - Add new member

---

## 8. QA Checklist

- ✅ All form inputs validated with Zod
- ✅ Row-Level Security enabled on both tables
- ✅ Optimistic updates implemented in UI
- ✅ Background image applied with fixed positioning
- ✅ KARMS acronym used throughout system
- ✅ Error handling for all database operations
- ✅ Success messages after data submissions
- ✅ Admin authentication layer

---

## 9. Production Deployment

### Vercel Deployment
```bash
vercel deploy --prod
```

### Environment Setup
1. Add Supabase credentials in Vercel dashboard
2. Set admin password environment variable
3. Ensure background image is uploaded to `/public`

---

## 10. Future Enhancements

- [ ] Markdown preview in admin dashboard
- [ ] Blog search functionality
- [ ] Community member filtering
- [ ] Email notifications on new members
- [ ] User authentication system
- [ ] Blog comments section
- [ ] Social sharing buttons

---

**KARMS - Kissan Agro Reforms and Management Systems** 🌱
