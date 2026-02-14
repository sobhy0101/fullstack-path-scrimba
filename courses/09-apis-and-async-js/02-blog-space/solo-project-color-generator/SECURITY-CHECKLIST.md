# Security Fix Checklist

## ✅ Completed

- [x] Added `dist/` to .gitignore
- [x] Removed `dist/` from Git tracking
- [x] Added placeholder for new API key in source code

## ⚠️ TODO - Complete These Steps NOW

### 1. Rotate Firebase/GCP API Key

1. Go to: <https://console.cloud.google.com/apis/credentials>
2. Find project: `sobhy-color-generator-app`
3. Find the key: `AIzaSyDCeeENjcUhpNo5ysdtWWYKPBn4CU1ZJBA`
4. Click it → "Regenerate Key" OR delete and create new

### 2. Add API Key Restrictions

**Application restrictions:**

- ☐ Select "HTTP referrers (web sites)"
- ☐ Add these:

  ```text
  https://sobhy0101.github.io/*
  http://localhost:*
  https://localhost:*
  ```

**API restrictions:**

- ☐ Restrict to:
  - Firebase Realtime Database API
  - Identity Toolkit API

### 3. Update Your Code

- ☐ Copy the new API key from GCP Console
- ☐ Paste it into `src/js/firebase/config.js` (replace `YOUR_NEW_API_KEY_HERE`)
- ☐ Test locally: `npm run dev`
- ☐ Build: `npm run build`

### 4. Commit and Push

```bash
git add src/js/firebase/config.js
git commit -m "Add new rotated Firebase API key with restrictions"
git push origin main
```

### 5. Handle GitHub/Google Alerts

- ☐ Go to GitHub Security tab → Dismiss the alert as "Revoked - key rotated"
- ☐ Go to Google Cloud email → Click "I've taken action"

## 📚 Lessons Learned

- ✅ Never commit `dist/` folders (they contain bundled secrets)
- ✅ Always add API key restrictions in GCP
- ✅ Use environment variables for truly sensitive keys (backend)
- ✅ Firebase API keys are public by design, but should still be restricted

## 🔄 For Future Deployments

Since `dist/` is now ignored, you'll need to:

- Use GitHub Actions to build on deployment, OR
- Build locally and deploy the dist folder separately

Delete this file after completing all steps!
