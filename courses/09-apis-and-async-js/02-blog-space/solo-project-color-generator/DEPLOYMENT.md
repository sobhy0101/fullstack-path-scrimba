# 🚀 Deployment Guide - GitHub Pages

⚠️ **STATUS: NOT DEPLOYED** - App is under development. Core features incomplete.

This guide will be used when the app is ready for production deployment.

---

## Current Status

- ✅ Git installed and configured
- ✅ GitHub account
- ✅ Repository created on GitHub
- ✅ Firebase project configured
- ⏳ App features incomplete - deployment postponed until course completion (Aug 2026)

---

## Step 1: Build Your Project

```powershell
# Navigate to project directory
cd c:\Projects\fullstack-path-scrimba-git-clone\courses\09-apis-and-async-js\02-blog-space\solo-project-color-generator

# Build for production
npm run build
```

This creates an optimized production build in the `dist/` folder.

---

## Step 2: Copy Build to Docs Folder

GitHub Pages can serve from either the root or a `/docs` folder. We'll use `/docs`:

```powershell
# Windows PowerShell (recommended)
Copy-Item -Path "dist\*" -Destination "docs\" -Recurse -Force

# Alternative: Windows Command Prompt
# xcopy dist docs /E /I /Y
```

---

## Step 3: Commit and Push to GitHub

```powershell
# Add all files
git add .

# Commit with descriptive message
git commit -m "v1.0: Color Generator with Gradients - Scrimba Solo Project

- Phase 1: Core color palette generator (100% complete)
- Phase 2: Firebase integration (100% complete)
- Phase 3: Gradient generator + tabbed UI (85% complete)
- Features: Save/load, export (CSS/JSON/PNG/Figma), share URLs
- Ready for deployment and Scrimba review"

# Push to GitHub
git push origin main
```

---

## Step 4: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** (top navigation)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**:
   - Branch: Select `main`
   - Folder: Select `/docs`
5. Click **Save**
6. Wait 1-2 minutes for deployment

Your site will be live at: `https://[your-username].github.io/[repo-name]/`

---

## Step 5: Configure Firebase for Production

⚠️ **CRITICAL**: Firebase Auth won't work until you add your domain:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Authentication** → **Settings** → **Authorized domains**
4. Click **Add domain**
5. Add: `[your-username].github.io`
6. Save changes

---

## Step 6: Update README with Live URL

Once deployed, update the README:

```powershell
# Open dist/README.md and update line 7
# Replace: **Live Demo**: [Add your GitHub Pages URL here]
# With: **Live Demo**: https://[your-username].github.io/[repo-name]/
```

Commit the change:

```powershell
git add dist/README.md
git commit -m "docs: Add live demo URL to README"
git push origin main
```

---

## Step 7: Test Your Deployment

Visit your GitHub Pages URL and test:

1. ✅ Color generation works
2. ✅ Gradients tab works
3. ✅ Login/signup works (Firebase Auth)
4. ✅ Saving palettes works (Firebase Database)
5. ✅ Export functions work
6. ✅ Mobile responsive layout works

---

## Troubleshooting

### Issue: "Page Not Found" (404 Error)

**Cause**: GitHub Pages can't find `index.html`

**Fix**: Make sure `dist/index.html` was copied to `docs/index.html`

```powershell
# Check if index.html exists
Test-Path docs/index.html
# Should return: True

# If False, rebuild and copy again
npm run build
Copy-Item -Path "dist\*" -Destination "docs\" -Recurse -Force
```

---

### Issue: Firebase Auth Doesn't Work

**Cause**: Domain not authorized in Firebase

**Fix**:

1. Go to Firebase Console → Authentication → Settings
2. Add `[your-username].github.io` to authorized domains
3. Wait 2-3 minutes for changes to propagate
4. Clear browser cache and try again

---

### Issue: CSS/Images Not Loading

**Cause**: Absolute paths don't work on GitHub Pages subdirectories

**Fix**: Check Vite config uses relative paths

```javascript
// vite.config.js should have:
export default {
  base: './', // Relative paths (already configured)
}
```

If you see broken assets, rebuild:

```powershell
npm run build
Copy-Item -Path "dist\*" -Destination "docs\" -Recurse -Force
git add .
git commit -m "fix: Update asset paths for GitHub Pages"
git push origin main
```

---

### Issue: Changes Not Appearing on Live Site

**Cause**: GitHub Pages caching

**Fix**:

1. Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear browser cache
3. Wait 2-3 minutes for GitHub Pages to rebuild
4. Check GitHub Actions tab for deployment status

---

## Quick Rebuild & Deploy Script

Save this as `deploy.ps1` in your project root:

```powershell
# deploy.ps1 - Quick deployment script

Write-Host "🚀 Starting deployment..." -ForegroundColor Cyan

# Build project
Write-Host "📦 Building project..." -ForegroundColor Yellow
npm run build

# Copy to docs
Write-Host "📂 Copying to docs folder..." -ForegroundColor Yellow
Copy-Item -Path "dist\*" -Destination "docs\" -Recurse -Force

# Git operations
Write-Host "📝 Committing changes..." -ForegroundColor Yellow
git add .
$message = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($message)) {
    $message = "deploy: Update production build"
}
git commit -m $message

Write-Host "⬆️ Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host "✅ Deployment complete! Check GitHub Pages in 2 minutes." -ForegroundColor Green
Write-Host "🌐 Your site: https://[your-username].github.io/[repo-name]/" -ForegroundColor Cyan
```

Then run:

```powershell
.\deploy.ps1
```

---

## Alternative: Use GitHub Actions (Advanced)

For automatic deployment on every push:

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Copy to docs
        run: cp -r dist/* docs/
      
      - name: Commit and push
        run: |
          git config user.name github-actions
          git config user.email github-actions@github.com
          git add docs/
          git commit -m "chore: Auto-deploy to GitHub Pages"
          git push
```

1. Commit and push this file
2. Now every push to `main` automatically deploys!

---

## Environment Variables (Optional)

If you want different Firebase configs for dev vs production:

1. Create `.env.production`:

```env
VITE_FIREBASE_API_KEY=your-production-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-production-domain.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-db.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

1. Update `src/js/firebase/config.js`:

```javascript
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

1. **⚠️ NEVER commit `.env.production` to Git!** Add to `.gitignore`:

```text
.env.production
.env.local
```

---

## Quick Command Reference

```powershell
# Build
npm run build

# Copy to docs
Copy-Item -Path "dist\*" -Destination "docs\" -Recurse -Force

# Full deployment
npm run build && Copy-Item -Path "dist\*" -Destination "docs\" -Recurse -Force && git add . && git commit -m "deploy: Production update" && git push origin main

# Preview build locally (before deploying)
npm run preview
```

---

## Post-Deployment Checklist

After your first successful deployment:

- [ ] Add live URL to README.md
- [ ] Add live URL to GitHub repo description
- [ ] Test all features on live site
- [ ] Share link with Scrimba for grading
- [ ] Add to portfolio
- [ ] Share on LinkedIn/Twitter (optional)
- [ ] Celebrate! 🎉

---

## 🎉 You're Live

Your Color Generator is now deployed and accessible to anyone with the link!

**Next Steps**:

1. Test all features on the live site
2. Share with Scrimba teachers for review
3. Add to your portfolio
4. Return to Scrimba course guilt-free! 💙

---

**Remember**: You can always redeploy by running:

```powershell
npm run build
Copy-Item -Path "dist\*" -Destination "docs\" -Recurse -Force
git add . && git commit -m "Update deployment" && git push
```

Good luck! 🚀
