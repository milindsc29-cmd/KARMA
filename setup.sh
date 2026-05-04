#!/bin/bash
# Quick Setup Script for KARMA Deployment
# Run this script after getting Supabase credentials

echo "🚀 KARMA Project - Supabase & Vercel Setup"
echo "==========================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local not found!"
    echo "📋 Creating .env.local from template..."
    cp .env.local.example .env.local
fi

echo ""
echo "📝 Next steps:"
echo "1. Open .env.local in your editor"
echo "2. Replace NEXT_PUBLIC_SUPABASE_URL with your Supabase project URL"
echo "3. Replace NEXT_PUBLIC_SUPABASE_ANON_KEY with your anon key"
echo "4. Save the file"
echo ""
echo "🧪 Testing locally:"
echo "   npm run dev"
echo "   Navigate to http://localhost:3000/blog"
echo ""
echo "✅ When ready to deploy:"
echo "   git add ."
echo "   git commit -m 'Configure Supabase credentials'"
echo "   git push origin feature/gettingPURL"
echo "   Then deploy via Vercel dashboard"
echo ""
