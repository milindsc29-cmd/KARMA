# KARMA Project - Deployment Guide
## Configure Supabase & Deploy to Vercel

### ✅ Step 1: Set Up Supabase (5-10 minutes)

#### 1.1 Create Supabase Project
1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in project details:
   - **Name:** karma (or your choice)
   - **Database Password:** Create a strong password
   - **Region:** Choose closest to your location
4. Wait for project to provision (2-3 minutes)

#### 1.2 Get Your Credentials
1. In Supabase dashboard, go to **Settings → API**
2. Copy these values:
   - **Project URL** (starts with https://your-project.supabase.co)
   - **Anon Key** (public key for client-side access)
3. Save them safely - you'll use these in the next step

#### 1.3 Run Database Migration
1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Open file: `migrations/001_karms_schema.sql` from your project
4. Copy the entire SQL content
5. Paste into the Supabase SQL editor
6. Click **Run** button
7. Verify tables created: `blogs` and `community` should appear in **Table Editor**

#### 1.4 Enable Row Level Security
1. In Supabase, go to **Authentication → Policies**
2. Verify RLS is enabled on both tables (should be auto-configured by migration)
3. Test access:
   - `blogs` table: Public can read published posts
   - `community` table: Public can read/create entries

---

### ✅ Step 2: Update Environment Variables

#### 2.1 Local Development (.env.local)
Update `c:\Users\chaud\karma\.env.local`:

```env
# Replace YOUR_PROJECT_URL with your actual Supabase URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Replace YOUR_ANON_KEY with your actual anon key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Admin password (keep this or change to your preference)
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
```

**Example:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://xyzabc123.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
```

#### 2.2 Verify Locally
```bash
npm run dev
```
- Navigate to http://localhost:3000/blog
- Should show empty blog list (no 404 errors)
- Navigate to http://localhost:3000/admin/blog
- Login with admin123
- Should load admin dashboard without "Configuration Required" message

---

### ✅ Step 3: Deploy to Vercel

#### 3.1 Push to GitHub
First, ensure all changes are committed:
```bash
cd c:\Users\chaud\karma
git add .
git commit -m "Update Supabase configuration"
git push origin feature/gettingPURL
```

#### 3.2 Create Vercel Project
1. Go to https://vercel.com and sign in (use GitHub account)
2. Click **Add New... → Project**
3. Select your GitHub repository: `milindsc29-cmd/KARMA`
4. Configure project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** ./karma
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

#### 3.3 Add Environment Variables
In Vercel project settings, go to **Settings → Environment Variables** and add:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_ADMIN_PASSWORD=admin123
```

**Same values as .env.local!**

#### 3.4 Deploy
1. Click **Deploy** button
2. Wait for deployment to complete (~2-3 minutes)
3. Get your production URL: `https://your-app.vercel.app`

---

### ✅ Step 4: Verify Production Deployment

#### 4.1 Test All Routes
- **Main Page:** https://your-app.vercel.app
- **Blog Page:** https://your-app.vercel.app/blog
- **Admin Page:** https://your-app.vercel.app/admin/blog

#### 4.2 Test Features
1. **Community Form**
   - Fill in name, role, bio, avatar URL
   - Click "Join KARMS Community"
   - Should see success message
   - Check Supabase > Table Editor > community table for new entry

2. **Admin Dashboard**
   - Go to /admin/blog
   - Enter password: admin123
   - Create a new blog post:
     - Title: "Welcome to KARMA"
     - Slug: "welcome-to-karma"
     - Content: "This is our first blog post"
     - Publish: Yes
   - Click "Create Post"
   - Check /blog page - should see your post

3. **Database Verification**
   - Login to Supabase dashboard
   - Check `blogs` table - should have your post
   - Check `community` table - should have community members

---

### 🔧 Troubleshooting

#### Issue: "Supabase not configured" error
**Solution:** 
- Check environment variables are set correctly
- Verify no typos in URL or key
- Restart dev server: `npm run dev`

#### Issue: 404 errors on blog page
**Solution:**
- Verify Supabase credentials are correct
- Check RLS policies are enabled
- Run migration again to ensure tables exist

#### Issue: Admin login not working
**Solution:**
- Default password is `admin123`
- Check `NEXT_PUBLIC_ADMIN_PASSWORD` environment variable
- Verify `.env.local` file exists with correct password

#### Issue: Community form not saving data
**Solution:**
- Check Supabase project is active
- Verify `community` table exists (check SQL migration)
- Check RLS policy allows public inserts
- Verify network tab for API errors

#### Issue: Vercel deployment fails
**Solution:**
- Check build logs: Settings → Deployments → Click failed deployment
- Ensure environment variables are set in Vercel
- Verify Node.js version is compatible (16+)
- Try manual redeploy: Click "Redeploy"

---

### 📋 Deployment Checklist

Before considering deployment complete:

- [ ] Supabase project created
- [ ] Database migration executed
- [ ] RLS policies verified
- [ ] .env.local updated with credentials
- [ ] Local testing passed (npm run dev)
- [ ] Production build successful (npm run build)
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables set in Vercel
- [ ] Production deployment successful
- [ ] All routes tested in production
- [ ] Community form working
- [ ] Admin dashboard working
- [ ] Blog system working

---

### 🎯 Production URL

Once deployed, share this URL with your team:
```
https://your-app.vercel.app
```

To get the exact URL:
1. Go to your Vercel dashboard
2. Select the KARMA project
3. Your production URL is displayed at the top

---

### 📞 Support

For issues with:
- **Supabase:** https://supabase.com/docs
- **Vercel:** https://vercel.com/docs
- **Next.js:** https://nextjs.org/docs

---

### ✨ Next Steps After Deployment

1. **Set up custom domain** (optional):
   - In Vercel, Settings → Domains
   - Add your custom domain (e.g., karma-farms.com)

2. **Configure email notifications**:
   - Set up Supabase Edge Functions for email alerts

3. **Enable analytics**:
   - Set up Vercel Analytics to track site performance

4. **Add more blog posts**:
   - Go to /admin/blog on production
   - Create and publish agricultural content

5. **Collect community members**:
   - Share the landing page
   - Community form collects farmer/expert data
