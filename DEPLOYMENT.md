# Deployment Guide - Zyphorix

Complete guide for deploying Zyphorix to production using Vercel. 🚀

## Prerequisites

✅ Completed QUICKSTART.md  
✅ GitHub account with your code pushed  
✅ Firebase project set up with credentials  
✅ Vercel account (free tier available)

## Step 1: Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Zyphorix vault app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/zyphorix.git
git push -u origin main
```

## Step 2: Connect to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to [Vercel](https://vercel.com/signup)
2. Click **"Sign up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub
5. Click **"New Project"**
6. Find your **zyphorix** repository
7. Click **"Import"**

### Option B: Using Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

## Step 3: Add Environment Variables

After importing your project:

1. Click **"Environment Variables"** in project settings
2. Add all variables from your `.env.local`:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Your API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Your auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Your project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Your storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Your sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Your app ID |

3. Click **"Save"**

## Step 4: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (~2-3 minutes)
3. Get your live URL! 🎉

You'll see a URL like: `https://zyphorix.vercel.app`

## Step 5: Custom Domain (Optional)

1. Go to project **Settings** → **Domains**
2. Click **"Add"**
3. Enter your domain (e.g., `zyphorix.dev`)
4. Follow DNS instructions
5. Wait for verification (~5 minutes)

## Production Security Setup

### 1. Update Firestore Rules

In Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only authenticated users can read
    match /projects/{document=**} {
      allow read: if request.auth != null;
      // Only creator can create/update/delete
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
```

### 2. Update Storage Rules

In Firebase Console → Storage → Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /projects/{userId}/{allPaths=**} {
      // Only authenticated users can read
      allow read: if request.auth != null;
      // Only owner can write/delete
      allow write, delete: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 3. Disable Anonymous Access

In Firebase Console → Authentication → Settings:
- Disable anonymous sign-in (if enabled)
- Keep only Email/Password enabled

## Continuous Deployment

Your app now auto-deploys on every push to `main`:

```bash
git add .
git commit -m "Add new feature"
git push origin main
```

Vercel will automatically build and deploy! ✨

## Monitoring & Logging

### Vercel Analytics
1. Go to **Analytics** in your Vercel project
2. View real-time traffic and performance
3. Monitor error rates

### View Build Logs
1. Click **"Deployments"** tab
2. Click a deployment to see logs
3. Check for any build errors

## Performance Optimization

### Image Optimization
Vercel automatically optimizes images. Already configured in `next.config.js`

### Caching
Add cache headers in `vercel.json` if needed:

```json
{
  "headers": [
    {
      "source": "/images/:path*",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Troubleshooting

### Build Fails on Vercel
1. Check build logs in Vercel dashboard
2. Ensure all environment variables are set
3. Verify `package.json` scripts are correct
4. Try local build: `npm run build`

### Firebase Connection Error in Production
- Verify `NEXT_PUBLIC_FIREBASE_*` variables are set
- Check if Firebase rules block your requests
- Ensure Firebase project is active

### Images Not Loading
- Verify Storage rules allow public reads (they shouldn't for auth users)
- Check image URLs in Firebase Storage
- Ensure images are uploaded correctly

### Slow Performance
- Check Vercel Analytics
- Optimize large images before upload
- Review Next.js performance tips

## Database Backups

Firebase automatically backs up your data. To export:

1. Firebase Console → Firestore Database → Data
2. Click **"Start collection group query"**
3. Select collection
4. Download as JSON

## Update Deployment

After making changes:

```bash
git add .
git commit -m "Update: description of changes"
git push origin main
```

Vercel redeploys automatically! 🚀

## SSL Certificate

Vercel provides free SSL automatically. Your site is secure by default! 🔒

## Analytics & Monitoring

### Recommended Tools
- [Vercel Analytics](https://vercel.com/analytics) - Free performance monitoring
- [Firebase Console](https://console.firebase.google.com) - Database & auth stats
- Google Analytics - (Optional) add to track users

## Rollback to Previous Version

If something breaks:

1. Go to **Deployments** in Vercel
2. Find the previous working deployment
3. Click **"Redeploy"**

Done! Your previous version is live again. ✅

## Cost Estimate

**Vercel (Free Tier):**
- 100 GB bandwidth/month ✅
- Unlimited builds ✅
- Unlimited sites ✅

**Firebase (Free Tier):**
- 1 GB storage ✅
- 50k reads/day ✅
- 20k writes/day ✅
- 20k deletes/day ✅

Perfect for personal projects! 💰

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Set up custom domain
3. ✅ Configure security rules
4. ✅ Monitor performance
5. 📈 Share your vault with the world!

---

**Your Zyphorix is now live!** 🎉

Visit your deployed site and celebrate! Share it with others.

Need help? Check [README.md](./README.md) or [Firebase Docs](https://firebase.google.com/docs)
