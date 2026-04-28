# Troubleshooting Guide - Zyphorix

Solutions to common issues and how to resolve them.

## Installation Issues

### ❌ Node modules error on install

**Error**: `npm ERR! code ERESOLVE, could not resolve dependency`

**Solution**:
```bash
npm install --legacy-peer-deps
```

Or upgrade Node.js:
```bash
nvm install 18
nvm use 18
npm install
```

### ❌ Port 3000 already in use

**Error**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Run on different port
npm run dev -- -p 3001

# Or kill process on port 3000
lsof -ti:3000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :3000   # Windows
```

---

## Firebase Configuration Issues

### ❌ Firebase credentials not working

**Error**: `Firebase App does not exist`

**Checklist**:
- [ ] `.env.local` file exists in root directory
- [ ] All 6 Firebase variables are set
- [ ] No extra spaces before/after values
- [ ] Values match Firebase console exactly
- [ ] Restarted dev server after setting env vars

**Solution**:
```bash
# Verify variables are loaded
cat .env.local

# Restart dev server
npm run dev
```

### ❌ Firebase project doesn't exist

**Error**: `Cannot find module 'firebase'` or connection errors

**Solution**:
1. Create Firebase project: https://console.firebase.google.com
2. Create web app in project
3. Copy credentials to `.env.local`
4. Verify credentials match exactly

### ❌ Firestore not enabled

**Error**: `Permission denied` or `Firestore could not be found`

**Solution**:
1. Firebase Console → Build → Firestore Database
2. Click "Create Database"
3. Select "Start in test mode"
4. Choose region (any is fine)
5. Click "Create"

### ❌ Storage not enabled

**Error**: `Storage bucket not found`

**Solution**:
1. Firebase Console → Build → Storage
2. Click "Get started"
3. Use default settings
4. Click "Create"
5. Verify bucket name in `.env.local`

---

## Authentication Issues

### ❌ Can't sign up

**Error**: `Password should be at least 6 characters`

**Solution**: Passwords must be at least 6 characters long

**Error**: `The email address is already in use`

**Solution**: 
- Use different email for testing
- Or delete user from Firebase Console → Authentication

### ❌ Can't sign in after registration

**Error**: `The password is invalid or the user does not have a password`

**Solution**:
1. Check email/password are correct (case-sensitive)
2. Check Email/Password provider is enabled in Firebase
3. Try resetting the password through login page

### ❌ Redirects to login infinitely

**Error**: Stuck in login loop after authentication

**Solution**:
1. Check Firebase credentials in `.env.local`
2. Clear browser cookies and local storage
3. Try incognito/private window
4. Check network tab for auth errors

---

## Project Upload Issues

### ❌ Image won't upload

**Error**: `Failed to upload image` or `Upload canceled`

**Troubleshooting**:
```javascript
// Check:
- Image size (should be < 10MB)
- Image format (JPG, PNG, GIF, WebP)
- Firebase Storage is enabled
- Storage bucket name is correct
- User is authenticated
```

**Solution**:
1. Check file size: `ls -lh image.jpg`
2. Compress image if too large
3. Try different image format
4. Check Storage Rules in Firebase

### ❌ Storage error: "Permission denied"

**Error**: `Permission denied. Could not access bucket`

**Solution**:
Update Firebase Storage Rules:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /projects/{userId}/{allPaths=**} {
      allow write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null;
    }
  }
}
```

### ❌ Uploaded images are blank

**Error**: Images show as empty or broken links

**Solution**:
1. Check image uploaded to Firebase Storage
2. Verify image URL is accessible
3. Check CORS settings (usually fine on Vercel)
4. Try different image format

---

## Dashboard & Display Issues

### ❌ Projects not showing on dashboard

**Error**: Empty dashboard despite uploaded projects

**Troubleshooting**:
```javascript
// Check:
- User is logged in (check auth state)
- Firestore Database is enabled
- Security Rules allow read access
- Projects exist in Firestore
- No console errors
```

**Solution**:
1. Open Developer Tools → Console
2. Check for error messages
3. Verify Firestore Database has projects
4. Check Security Rules:
```javascript
allow read: if request.auth != null;
```

### ❌ Search not working

**Error**: Search returns no results or all projects

**Solution**:
1. Check search term is entered
2. Verify project title contains search term (case-insensitive)
3. Clear filters to see all projects
4. Refresh page

### ❌ Images not displaying on dashboard

**Error**: Blank image placeholders

**Solution**:
1. Check image URLs are valid in Firestore
2. Verify CORS is not blocking requests
3. Try different image format
4. Check network tab for 404 errors

---

## Performance Issues

### ❌ App is slow

**Error**: Slow page loads or laggy animations

**Solutions**:
1. **Reduce animation complexity**:
   - Edit `app/globals.css`
   - Reduce animation durations
   - Use `will-change` CSS property

2. **Optimize images**:
   - Compress before upload
   - Use WebP format
   - Reduce resolution

3. **Check network**:
   - Open DevTools → Network tab
   - Look for slow requests
   - Check Firebase operations

4. **Bundle size**:
   ```bash
   npm run build
   # Check build output for warnings
   ```

### ❌ High data usage

**Error**: Hitting Firebase quota limits

**Solution**:
1. **Check Firestore reads**:
   - Avoid unnecessary listeners
   - Add indexes for queries
   - Use pagination

2. **Check Storage bandwidth**:
   - Compress images
   - Cache on client
   - Use CDN

---

## Deployment Issues

### ❌ Deployment fails on Vercel

**Error**: Build fails with error messages

**Troubleshooting**:
1. Check Vercel build logs:
   - Click Deployments → Find failed build → View logs
2. Common causes:
   - Missing environment variables
   - Incorrect TypeScript types
   - Missing dependencies

**Solution**:
```bash
# Test locally
npm run build

# Check for errors
npm run type-check

# If still failing, check:
1. All env vars in Vercel settings
2. Node version matches locally
3. package.json scripts are correct
```

### ❌ Environment variables not working in production

**Error**: "Firebase App does not exist" on production

**Solution**:
1. Go to Vercel Project Settings
2. Click Environment Variables
3. Add ALL 6 Firebase variables
4. Ensure variables are set for "Production"
5. Redeploy project

### ❌ Deployment is slow

**Error**: Build takes 10+ minutes

**Solution**:
1. Optimize dependencies (remove unused)
2. Use `npm ci` instead of `npm install`
3. Enable caching in Vercel
4. Check for large files in build

---

## TypeScript Issues

### ❌ Type errors on build

**Error**: `Type 'X' is not assignable to type 'Y'`

**Solution**:
1. Check function signatures match
2. Verify parameter types
3. Use `as` for type assertions if needed
4. Run `npm run type-check` to see all errors

### ❌ Module not found

**Error**: `Cannot find module '@/components/...'`

**Solution**:
1. Check file path matches exactly
2. Verify import path aliases in `tsconfig.json`
3. Check file exists and isn't deleted
4. Restart dev server

---

## Styling Issues

### ❌ Tailwind CSS not applied

**Error**: Styles not showing, default browser styles

**Troubleshooting**:
```bash
# Check if Tailwind is processing
npm run dev

# Verify globals.css is imported
# Check app/layout.tsx for: import './globals.css'
```

**Solution**:
1. Check `tailwind.config.ts` content paths
2. Restart dev server
3. Clear `.next` cache: `rm -rf .next`
4. Rebuild: `npm run build`

### ❌ Animations not smooth

**Error**: Jerky or laggy animations

**Solution**:
1. Reduce animation complexity
2. Use `transform` instead of `position` changes
3. Add `gpu-acceleration`: `will-change: transform`
4. Check browser performance in DevTools

### ❌ Colors look wrong

**Error**: Colors don't match design

**Solution**:
1. Check color values in `tailwind.config.ts`
2. Verify browser CSS support
3. Try different browser/device
4. Check OS dark/light mode settings

---

## Data Loss Prevention

### ⚠️ Preventing accidental deletion

**Best Practices**:
- ✅ Always confirm before delete
- ✅ Keep backups of important projects
- ✅ Test on staging before production

### 📦 Backing up projects

**Manual backup**:
1. Firebase Console → Firestore → Data
2. Click collection → Download JSON
3. Save backup file locally

**Automated backup**:
- Firebase offers backup feature in Console
- Check Cloud Storage for backups
- Enable lifecycle policies on Storage

---

## Getting Help

### Debug Mode
Enable verbose logging:
```javascript
// Add to lib/config/firebase-admin.ts
import { enableLogging } from 'firebase/database';
enableLogging(true);
```

### Useful Links
- [Firebase Status](https://firebase.google.com/status)
- [Vercel Status](https://www.vercel-status.com)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)

### Community Help
- Stack Overflow: Tag `firebase`, `nextjs`
- Firebase Discord: https://firebase.google.com/community
- Next.js Discord: https://discord.gg/nextjs

### Error Message Database

Search your exact error message in:
- Firebase docs error codes
- Vercel support docs
- Next.js known issues
- Tailwind documentation

---

## Performance Tuning

### Optimize Database Queries

```javascript
// ❌ Bad - Fetches all projects
const allProjects = await getUserProjects(userId);

// ✅ Good - Filters early
const filteredProjects = await searchProjects(userId, term);
```

### Optimize Image Loading

```javascript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src={project.imageUrl}
  alt={project.title}
  priority={false}
  loading="lazy"
/>
```

### Optimize Bundle Size

```bash
# Analyze bundle
npm run build

# Look for large dependencies
# Consider alternatives or lazy-load
```

---

## Checklist for Troubleshooting

When something breaks, go through this checklist:

- [ ] Check browser console for errors
- [ ] Check Vercel logs (if deployed)
- [ ] Verify environment variables
- [ ] Restart dev server
- [ ] Clear browser cache
- [ ] Check Firebase Console
- [ ] Review recent changes
- [ ] Try incognito window
- [ ] Test on different browser
- [ ] Check network tab
- [ ] Review error messages carefully
- [ ] Search error in docs
- [ ] Ask in community forums

---

**Still having issues?** Review [README.md](./README.md) or check [ARCHITECTURE.md](./ARCHITECTURE.md) for system overview.

Remember: Most issues have been encountered before. Search the error message online first!
