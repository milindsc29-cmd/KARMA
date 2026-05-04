# 🚀 KARMA Project - Production Deployment

> Sustainable Organic & Dragon Fruit Farms Platform

## ⚡ Quick Start (5 minutes)

### Option A: Automated Setup (Recommended)

**Windows (PowerShell):**
```powershell
.\setup.ps1
```

**Mac/Linux (Bash):**
```bash
bash setup.sh
```

Then open `.env.local` and add your Supabase credentials.

### Option B: Manual Setup

1. Copy `.env.local.example` to `.env.local`
2. Get credentials from Supabase (see below)
3. Update `.env.local` with your credentials
4. Push to GitHub and deploy to Vercel

---

## 📋 Step-by-Step Deployment

### Step 1: Supabase Setup (10 minutes)

#### Create Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose region closest to you
4. Create strong database password

#### Get Credentials
Once project is created:
1. Go to **Settings → API**
2. Copy **Project URL** (looks like: `https://your-project.supabase.co`)
3. Copy **Anon Key** (long string starting with `eyJ...`)
4. Save these in a safe place

#### Run Database Migration
1. Go to **SQL Editor** in Supabase
2. Click **New Query**
3. Open file `migrations/001_karms_schema.sql` in your repo
4. Copy and paste the entire SQL code
5. Click **Run**
6. Verify tables created (`blogs` and `community`)

### Step 2: Configure Local Environment

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-long-anon-key-here
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
```

### Step 3: Test Locally

```bash
npm run dev
```

Test these routes:
- http://localhost:3000 - Main page ✅
- http://localhost:3000/blog - Blog listing ✅
- http://localhost:3000/admin/blog - Admin login ✅

Try creating a blog post in admin dashboard.

### Step 4: Push to GitHub

```bash
git add .
git commit -m "Configure Supabase credentials for production"
git push origin feature/gettingPURL
```

### Step 5: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New Project**
3. Select your GitHub repository (`milindsc29-cmd/KARMA`)
4. Under **Root Directory**, select `./karma`
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_ADMIN_PASSWORD`
6. Click **Deploy**

### Step 6: Verify Production

Visit your Vercel URL and test:
- ✅ Main page loads
- ✅ Blog page shows empty (or your posts)
- ✅ Admin login works
- ✅ Community form saves data

---

## 🔐 Security Best Practices

### Environment Variables
- ✅ `NEXT_PUBLIC_SUPABASE_URL` - Safe to expose (public)
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Safe to expose (limited access via RLS)
- ⚠️ `NEXT_PUBLIC_ADMIN_PASSWORD` - Consider making this private
- ⚠️ Database password - Never share, only needed for migrations

### Row Level Security (RLS)
All tables have RLS policies:
- `blogs`: Public read published, authenticated write
- `community`: Public read/write

### Database Access
- Supabase handles all authentication
- Only authenticated requests can modify data
- Public can only read published content

---

## 📱 Production Features

### Available Routes
- `/` - Main landing page
- `/blog` - Blog listing page
- `/blog/[slug]` - Individual blog post
- `/admin/blog` - Admin dashboard (password protected)

### Features Included
- ✅ Community member registration
- ✅ Blog creation & publishing
- ✅ Optimistic UI updates
- ✅ Real-time form validation
- ✅ Responsive design
- ✅ SEO optimized

---

## 📊 Monitoring

### Vercel Analytics
- Go to your Vercel project
- Settings → Analytics
- Monitor real-time page views and performance

### Supabase Monitoring
- Supabase dashboard shows:
  - Database size
  - Active connections
  - API requests
  - Error logs

---

## 🔧 Troubleshooting

### "Supabase not configured"
```
✅ Solution: Check .env.local has correct credentials
```

### Blog page shows "Loading blogs..." forever
```
✅ Solution: Verify Supabase URL and key in environment
✅ Check Supabase project is active
```

### Admin login not working
```
✅ Solution: Default password is "admin123"
✅ Check NEXT_PUBLIC_ADMIN_PASSWORD environment variable
```

### Community form not saving
```
✅ Solution: Verify migration was run in Supabase
✅ Check community table exists in Supabase dashboard
```

---

## 📚 Documentation

- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Detailed step-by-step guide
- [TEST_REPORT.md](TEST_REPORT.md) - Test results and verification
- [KARMS_DOCUMENTATION.md](KARMS_DOCUMENTATION.md) - System documentation
- [.env.local.example](.env.local.example) - Environment variables template

---

## 🎯 What's Next

After deployment:

1. **Share the URL**
   ```
   https://your-app.vercel.app
   ```

2. **Start creating content**
   - Add blog posts via admin dashboard
   - Gather community members

3. **Custom domain** (optional)
   - In Vercel, Settings → Domains
   - Point your domain to Vercel

4. **Email notifications** (optional)
   - Set up Supabase email service
   - Notify users of new posts

---

## 📞 Support

- **Supabase Issues:** [supabase.com/docs](https://supabase.com/docs)
- **Vercel Issues:** [vercel.com/docs](https://vercel.com/docs)
- **Next.js Issues:** [nextjs.org/docs](https://nextjs.org/docs)

---

## ✨ You're All Set!

Your KARMA website is ready to go live! 🚀

**Next action:** 
1. Get your Supabase credentials
2. Update `.env.local`
3. Push to GitHub
4. Deploy to Vercel
5. Share your production URL!

---

**Questions?** Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.
