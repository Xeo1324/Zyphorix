# File Navigation Guide - Zyphorix

Quick reference for finding and editing files in Zyphorix.

## 📁 Complete File Structure

```
Zyphorix/
│
├── 📄 Configuration Files (Root Level)
│   ├── package.json              ← Dependencies & scripts
│   ├── tsconfig.json             ← TypeScript configuration
│   ├── tailwind.config.ts        ← Tailwind CSS colors & animations
│   ├── postcss.config.js         ← PostCSS configuration
│   ├── next.config.js            ← Next.js settings
│   ├── .env.example              ← Environment variables template
│   ├── .gitignore                ← Git ignore rules
│   └── README.md                 ← Main documentation
│
├── 📚 Documentation
│   ├── PROJECT_SUMMARY.md        ← This project overview
│   ├── QUICKSTART.md             ← 5-minute setup guide
│   ├── DEPLOYMENT.md             ← Vercel deployment
│   ├── ARCHITECTURE.md           ← Technical architecture
│   ├── TROUBLESHOOTING.md        ← Common issues & fixes
│   ├── NAVIGATION.md             ← This file
│   └── FILE_GUIDE.md             ← File reference
│
├── 📦 app/                       ← Next.js App Router
│   ├── layout.tsx                ← Root layout + providers
│   ├── page.tsx                  ← Landing page (/)
│   ├── globals.css               ← Global styles & animations
│   ├── error.tsx                 ← Error boundary
│   ├── not-found.tsx             ← 404 page
│   ├── robots.ts                 ← SEO robots.txt
│   ├── sitemap.ts                ← SEO sitemap
│   ├── manifest.ts               ← PWA manifest
│   │
│   ├── 🔐 login/
│   │   └── page.tsx              ← Login page (/login)
│   │
│   ├── 📝 register/
│   │   └── page.tsx              ← Registration page (/register)
│   │
│   ├── 📊 dashboard/
│   │   └── page.tsx              ← Main dashboard (/dashboard)
│   │
│   ├── ⬆️ upload/
│   │   └── page.tsx              ← Upload project page (/upload)
│   │
│   ├── 📁 projects/
│   │   └── [id]/
│   │       └── page.tsx          ← Project detail (/projects/[id])
│   │
│   ├── ✏️ edit/
│   │   └── [id]/
│   │       └── page.tsx          ← Edit project (/edit/[id])
│   │
│   └── 🎨 components/
│       ├── Navbar.tsx            ← Navigation component
│       ├── ProjectCard.tsx       ← Project card display
│       └── ProjectCardSkeleton.tsx ← Loading skeleton
│
├── 📚 lib/                       ← Business logic
│   ├── 🔐 config/
│   │   ├── firebase.ts           ← Firebase credentials config
│   │   └── firebase-admin.ts     ← Firebase initialization
│   │
│   ├── 🪝 hooks/
│   │   ├── useAuth.ts            ← Auth store (Zustand)
│   │   └── useProjects.ts        ← Projects store (Zustand)
│   │
│   ├── 🎯 context/
│   │   ├── AuthProvider.tsx      ← Auth context provider
│   │   └── ToastProvider.tsx     ← Toast notifications provider
│   │
│   ├── 🛠️ utils/
│   │   ├── firestore.ts          ← Firestore CRUD operations
│   │   ├── storage.ts            ← Cloud Storage operations
│   │   ├── ProtectedRoute.tsx    ← Route protection component
│   │   └── helpers.ts            ← General helper functions
│   │
│   └── 📋 types/
│       └── index.ts              ← TypeScript type definitions
│
├── 🎨 public/                    ← Static assets
│   ├── favicon.ico               ← Favicon
│   └── manifest.json             ← PWA manifest copy
│
└── .env.local                    ← Environment variables (CREATE THIS)
```

## 🎯 Quick File Location Guide

### Need to... | Go to...
---|---
Change colors | `tailwind.config.ts`
Edit animations | `app/globals.css`
Add pages | `app/[name]/page.tsx`
Add components | `app/components/[Name].tsx`
Edit Firebase config | `lib/config/firebase-admin.ts`
Add Firebase operations | `lib/utils/firestore.ts`
Modify auth logic | `lib/hooks/useAuth.ts`
Manage project state | `lib/hooks/useProjects.ts`
Edit logo/branding | `app/components/Navbar.tsx`
Add routes/auth | `lib/context/AuthProvider.tsx`
Fix styling issues | `app/globals.css`
Configure build | `next.config.js`
Install packages | `package.json` + `npm install`
Understand architecture | `ARCHITECTURE.md`
Set up Firebase | `DEPLOYMENT.md`
Solve problems | `TROUBLESHOOTING.md`

---

## 🚀 Most Important Files

### For Getting Started
1. **[QUICKSTART.md](./QUICKSTART.md)** - Read this first
2. **[.env.example](./.env.example)** - Copy to `.env.local`
3. **[package.json](./package.json)** - Run `npm install`

### For Customization
1. **[tailwind.config.ts](./tailwind.config.ts)** - Change colors
2. **[app/globals.css](./app/globals.css)** - Edit styles
3. **[app/components/Navbar.tsx](./app/components/Navbar.tsx)** - Update branding

### For Understanding
1. **[README.md](./README.md)** - Full documentation
2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical overview
3. **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Feature list

### For Troubleshooting
1. **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - Common issues
2. **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment help
3. **[QUICKSTART.md](./QUICKSTART.md)** - Quick fixes

---

## 📝 File Purposes Explained

### Pages (app/ directory)
- **page.tsx** - React component that renders a page
- **layout.tsx** - Wrapper for all pages (providers)
- **[id]** - Dynamic segments (e.g., project ID)

### Configuration Files (root directory)
- **package.json** - Dependencies and npm scripts
- **tsconfig.json** - TypeScript compiler options
- **tailwind.config.ts** - Tailwind CSS customization
- **next.config.js** - Next.js settings
- **.env.local** - Secret environment variables

### Library Files (lib/ directory)
- **config/** - Setup & configuration
- **hooks/** - Custom hooks (state management)
- **context/** - React context providers
- **utils/** - Reusable utility functions
- **types/** - TypeScript type definitions

### Component Files (app/components/)
- **Navbar.tsx** - Header navigation
- **ProjectCard.tsx** - Project card display
- **ProjectCardSkeleton.tsx** - Loading placeholder

---

## 💻 Common Commands

### Development
```bash
# Start development server
npm run dev
# Visit http://localhost:3000

# Build for production
npm run build

# Run production build locally
npm start

# Type check
npm run type-check
```

### File Operations
```bash
# Create new page
mkdir -p app/newpage
touch app/newpage/page.tsx

# Create new component
touch app/components/NewComponent.tsx

# Delete file
rm filename.ts
```

### Git Operations
```bash
# Initialize git
git init

# Add all files
git add .

# Commit changes
git commit -m "message"

# Push to GitHub
git push origin main
```

---

## 🎨 Customization Hotspots

### Change Colors
**File**: `tailwind.config.ts`
```typescript
// Find this section:
neon: {
  blue: '#00d4ff',      // Change primary color
  orange: '#ff6b00',    // Change accent color
  purple: '#a855f7',
  green: '#00ff88',
},
```

### Change Animations
**File**: `app/globals.css`
```css
/* Find this section: */
@keyframes float {
  '0%, 100%': { transform: 'translateY(0px)' },
  '50%': { transform: 'translateY(-20px)' },
}
```

### Change Branding
**File**: `app/components/Navbar.tsx`
```typescript
// Find this:
<h1>Zyphorix</h1>  // ← Change this text
```

### Change Styling
**File**: `app/globals.css`
```css
/* Global styles for everything */
/* Edit here for site-wide changes */
```

---

## 🔍 Code Organization Guide

### Where to find...

**Authentication logic**
```
lib/
  ├── config/firebase-admin.ts      ← Firebase setup
  ├── hooks/useAuth.ts              ← Auth store
  └── context/AuthProvider.tsx      ← Auth context
```

**Project management**
```
lib/
  ├── hooks/useProjects.ts          ← Project store
  ├── utils/firestore.ts            ← Database operations
  └── utils/storage.ts              ← File uploads
```

**UI Components**
```
app/
  ├── components/Navbar.tsx         ← Navigation
  ├── components/ProjectCard.tsx    ← Project cards
  └── page.tsx                      ← Pages
```

**Styling**
```
app/
  └── globals.css                   ← All styles here
tailwind.config.ts                  ← Tailwind config
```

---

## 📦 Understanding Dependencies

### Core Dependencies
- **next** - React framework
- **react** & **react-dom** - React library
- **tailwindcss** - CSS styling
- **framer-motion** - Animations
- **firebase** - Backend services
- **zustand** - State management
- **react-hot-toast** - Notifications
- **axios** - HTTP requests

### Dev Dependencies
- **typescript** - Type checking
- **eslint** - Code linting
- **autoprefixer** - CSS processing
- **postcss** - CSS processing

---

## 🔄 Project Development Flow

### Typical Development Process

1. **Edit a page**
   ```
   app/dashboard/page.tsx
   ```

2. **Add a component**
   ```
   app/components/NewComponent.tsx
   ```

3. **Add styling**
   ```
   app/globals.css
   // or use Tailwind classes in JSX
   ```

4. **Test locally**
   ```bash
   npm run dev
   ```

5. **Commit changes**
   ```bash
   git add .
   git commit -m "message"
   git push
   ```

6. **Deploy**
   - Vercel auto-deploys on push

---

## 📞 Finding Help

### Where to look...

| Problem | Where to Look |
|---------|--------------|
| Need help setting up? | `QUICKSTART.md` |
| Something broken? | `TROUBLESHOOTING.md` |
| How to deploy? | `DEPLOYMENT.md` |
| Understand code? | `ARCHITECTURE.md` |
| Feature not working? | Check specific page in `app/` |
| Styling issues? | `app/globals.css` + `tailwind.config.ts` |
| Database questions? | `lib/utils/firestore.ts` |
| State management? | `lib/hooks/*.ts` |
| Type errors? | `lib/types/index.ts` |

---

## ✅ File Checklist

### Essential Files (MUST EXIST)
- [x] `app/layout.tsx` - Root layout
- [x] `app/page.tsx` - Landing page
- [x] `app/globals.css` - Global styles
- [x] `package.json` - Dependencies
- [x] `tailwind.config.ts` - Tailwind config
- [x] `lib/config/firebase-admin.ts` - Firebase setup
- [x] `.env.local` - Create this file!

### Critical Configuration
- [ ] `.env.local` - Add Firebase credentials
- [ ] `firebase.ts` - Update with your config
- [ ] Firestore security rules
- [ ] Storage security rules

---

## 📊 File Statistics

| Category | Count | Purpose |
|----------|-------|---------|
| Pages | 8 | User-facing routes |
| Components | 3 | Reusable UI parts |
| Config files | 6 | Application setup |
| Utility files | 5 | Business logic |
| Documentation | 6 | Guides & help |
| **Total** | **28 main files** | Complete app |

---

## 🎓 Learning Path

### Reading Order
1. **Project Overview**: `PROJECT_SUMMARY.md`
2. **Quick Setup**: `QUICKSTART.md`
3. **Main Docs**: `README.md`
4. **Architecture**: `ARCHITECTURE.md`
5. **Deployment**: `DEPLOYMENT.md`
6. **Troubleshooting**: `TROUBLESHOOTING.md`

### Exploration Order
1. Review `package.json` - See dependencies
2. Explore `app/` - See page structure
3. Check `lib/` - Understand logic
4. Read `app/globals.css` - See styling
5. Examine `tailwind.config.ts` - See configuration

---

**This guide helps you navigate Zyphorix efficiently. Bookmark these references!**

---

Next: Read [QUICKSTART.md](./QUICKSTART.md) to get started in 5 minutes.
