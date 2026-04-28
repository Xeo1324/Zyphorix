# Quick Start Guide - Zyphorix

Get your Zyphorix vault up and running in just 5 minutes! 🚀

## Step 1: Install Dependencies (1 minute)

```bash
cd Zyphorix
npm install
```

## Step 2: Set Up Firebase (2 minutes)

### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a new project"**
3. Name it: `zyphorix`
4. Click **"Continue"** through the setup

### Enable Firebase Services
After project creation:

**Firestore Database:**
- Go to **Build** → **Firestore Database**
- Click **"Create database"**
- Select **"Start in test mode"** (we'll secure it later)
- Choose a region (any is fine)
- Click **"Create"**

**Authentication:**
- Go to **Build** → **Authentication**
- Click **"Get started"**
- Click **"Email/Password"** provider
- Toggle **"Enable"**
- Click **"Save"**

**Cloud Storage:**
- Go to **Build** → **Storage**
- Click **"Get started"**
- Click **"Create"** (use default settings)

## Step 3: Get Your Credentials (1 minute)

1. Click the **gear icon** (Project Settings)
2. Click **"General"** tab
3. Scroll down to **"Your apps"**
4. Click the **web app icon** (</> symbol)
5. Copy the entire `firebaseConfig` object

## Step 4: Create `.env.local` (1 minute)

Create a new file called `.env.local` in your project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

Replace with your actual values from Firebase!

## Step 5: Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser! 🎉

## Next Steps

1. **Create an Account**: Click "Get Started" and sign up
2. **Upload a Project**: Click "Upload New Project"
3. **Customize**: Edit colors, fonts, and features in `tailwind.config.ts`
4. **Deploy**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for Vercel setup

## Troubleshooting

### Port 3000 Already in Use?
```bash
npm run dev -- -p 3001
```

### Firebase Connection Error?
- Double-check your `.env.local` file
- Verify Firestore is enabled in Firebase
- Check console for specific error messages

### Images Won't Upload?
- Verify Storage bucket name matches `.env.local`
- Check browser console for error details

## Key Files to Know

- `app/page.tsx` - Landing page
- `app/dashboard/page.tsx` - Main dashboard
- `lib/config/firebase-admin.ts` - Firebase setup
- `tailwind.config.ts` - Design colors and animations

## Quick Customization

### Change Primary Color
Edit `tailwind.config.ts`:
```ts
neon: {
  blue: '#00d4ff',  // Change this
  orange: '#ff6b00',
}
```

### Adjust Animation Speed
Edit `app/globals.css`:
```css
@keyframes float {
  /* Increase 6s to 10s for slower animation */
}
```

## Need Help?

- Check [README.md](./README.md) for detailed docs
- Review [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup
- Check [Firebase Docs](https://firebase.google.com/docs)

---

**You're all set!** 🎉 Start vaulting your projects now.
