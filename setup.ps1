# Quick Setup Script for KARMA Deployment (Windows)
# Run this script after getting Supabase credentials

Write-Host "🚀 KARMA Project - Supabase & Vercel Setup" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env.local exists
if (-Not (Test-Path ".env.local")) {
    Write-Host "❌ .env.local not found!" -ForegroundColor Red
    Write-Host "📋 Creating .env.local from template..." -ForegroundColor Yellow
    Copy-Item ".env.local.example" ".env.local"
    Write-Host "✅ .env.local created!" -ForegroundColor Green
}

Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "1. Open .env.local in your editor"
Write-Host "2. Replace NEXT_PUBLIC_SUPABASE_URL with your Supabase project URL"
Write-Host "3. Replace NEXT_PUBLIC_SUPABASE_ANON_KEY with your anon key"
Write-Host "4. Save the file"
Write-Host ""

Write-Host "🧪 Testing locally:" -ForegroundColor Yellow
Write-Host "   npm run dev"
Write-Host "   Navigate to http://localhost:3000/blog"
Write-Host ""

Write-Host "✅ When ready to deploy:" -ForegroundColor Green
Write-Host "   git add ."
Write-Host "   git commit -m 'Configure Supabase credentials'"
Write-Host "   git push origin feature/gettingPURL"
Write-Host "   Then deploy via Vercel dashboard at https://vercel.com"
Write-Host ""

Write-Host "📚 For detailed instructions, see DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
