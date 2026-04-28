# Zyphorix - Premium Project Vault

![Zyphorix](https://img.shields.io/badge/Zyphorix-Project%20Vault-00d4ff)
![Next.js](https://img.shields.io/badge/Next.js-14.0+-000000)
![Firebase](https://img.shields.io/badge/Firebase-10.7+-FFA500)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4+-38B2AC)

A premium, futuristic web application for storing, managing, and showcasing your engineering projects like assets in a high-end digital vault. Built with Next.js, Firebase, and inspired by luxury supercar aesthetics.

## 🚀 Features

### Core Features
- **🔐 Secure Authentication**: Firebase Email/Password authentication with protected routes
- **📦 Project Management**: Complete CRUD operations for your projects
- **🎨 Premium UI/UX**: Dark, aggressive design with glassmorphism and smooth animations
- **🔍 Advanced Search**: Search and filter projects by name or tech stack
- **📊 Dashboard Analytics**: Project statistics and activity tracking
- **🌐 Deploy Ready**: Optimized for Vercel deployment

### Advanced Features
- **⚡ Smooth Animations**: Framer Motion for cinematic transitions
- **✨ Loading Skeletons**: Premium loading experience
- **📱 Responsive Design**: Works flawlessly on all devices
- **🖼️ Image Optimization**: Next.js Image optimization
- **🎯 Dynamic Routing**: Beautifully detailed project pages
- **💾 Firebase Integration**: Real-time database and cloud storage

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Styling** | Tailwind CSS 3.4 |
| **Animations** | Framer Motion 10.16 |
| **Backend** | Firebase (Auth + Firestore + Storage) |
| **Notifications** | React Hot Toast |
| **State Management** | Zustand |
| **Language** | TypeScript 5.3 |
| **Deployment** | Vercel |

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 16.x or higher
- npm or yarn package manager
- Firebase project (free tier works great)
- Vercel account (optional, for deployment)

## ⚙️ Setup Instructions

### 1. Clone or Download the Project

```bash
cd Zyphorix
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Firebase Setup

#### Create a Firebase Project:
1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a new project"
3. Follow the setup wizard
4. Enable Firestore Database:
   - Go to Build → Firestore Database
   - Click "Create database"
   - Start in test mode
5. Enable Authentication:
   - Go to Build → Authentication
   - Click "Get started"
   - Enable Email/Password provider
6. Set up Cloud Storage:
   - Go to Build → Storage
   - Click "Get started"
   - Use the default bucket

#### Get Your Credentials:
1. Go to Project Settings (gear icon)
2. Click "General" tab
3. Scroll to "Your apps" section
4. Click the web app icon (or create if needed)
5. Copy the configuration object

### 4. Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

**Example with actual values:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC7-9Yf4X_jK8Q2Lm9N0O1P2Q3R4S5T6U7V
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=my-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=my-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=my-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123def456
```

### 5. Firebase Firestore Rules (Security)

Go to Firestore Database → Rules and update with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own projects
    match /projects/{document=**} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
```

### 6. Firebase Storage Rules

Go to Storage → Rules and update with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /projects/{userId}/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
      allow delete: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🚀 Running Locally

### Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 📁 Project Structure

```
Zyphorix/
├── app/
│   ├── layout.tsx                 # Root layout with providers
│   ├── globals.css                # Global styles
│   ├── page.tsx                   # Landing page
│   ├── login/
│   │   └── page.tsx              # Login page
│   ├── register/
│   │   └── page.tsx              # Registration page
│   ├── dashboard/
│   │   └── page.tsx              # Main dashboard
│   ├── upload/
│   │   └── page.tsx              # Upload new project
│   ├── projects/
│   │   └── [id]/
│   │       └── page.tsx          # Project detail page
│   ├── edit/
│   │   └── [id]/
│   │       └── page.tsx          # Edit project page
│   ├── components/
│   │   ├── Navbar.tsx            # Navigation component
│   │   ├── ProjectCard.tsx       # Project card component
│   │   └── ProjectCardSkeleton.tsx # Loading skeleton
│   ├── not-found.tsx             # 404 page
│   └── error.tsx                 # Error boundary (optional)
│
├── lib/
│   ├── config/
│   │   ├── firebase.ts           # Firebase config
│   │   └── firebase-admin.ts     # Firebase initialization
│   ├── hooks/
│   │   ├── useAuth.ts            # Auth state store
│   │   └── useProjects.ts        # Projects state store
│   ├── context/
│   │   ├── AuthProvider.tsx      # Auth provider
│   │   └── ToastProvider.tsx     # Toast notifications provider
│   └── utils/
│       ├── firestore.ts          # Firestore operations
│       ├── storage.ts            # Storage operations
│       └── ProtectedRoute.tsx    # Route protection
│
├── public/
│   ├── favicon.ico               # Favicon
│   └── manifest.json             # PWA manifest
│
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── next.config.js                # Next.js configuration
├── postcss.config.js             # PostCSS configuration
└── README.md                     # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: Neon Blue (`#00d4ff`)
- **Accent**: Electric Orange (`#ff6b00`)
- **Secondary**: Metallic Silver (`#e5e7eb`)
- **Background**: Deep Black (`#0f0f0f`)

### Key Design Elements
- Glassmorphism effects with backdrop blur
- Neon glow effects on interactive elements
- Smooth hover animations and transitions
- Parallax scrolling on hero sections
- Micro-interactions for premium feel

## 🔐 Security Features

- ✅ Firebase Authentication (secure by default)
- ✅ Protected routes using custom hooks
- ✅ Firestore security rules for data access control
- ✅ Storage security rules for file access
- ✅ No sensitive data in environment variables
- ✅ Server-side rendering for security

## 📊 Usage Guide

### Creating an Account
1. Click "Get Started" on the landing page
2. Enter email and password
3. Click "Create Account"
4. You'll be redirected to the dashboard

### Uploading a Project
1. Click "Upload New Project" in the dashboard
2. Fill in project details:
   - Title
   - Description
   - Tech stack (comma-separated)
   - Project image
   - GitHub and demo links (optional)
3. Click "Upload Project"

### Managing Projects
- **View**: Click on a project card to see full details
- **Edit**: Click "Edit" button in dashboard
- **Delete**: Click "Delete" button (with confirmation)
- **Search**: Use the search bar to find projects
- **Filter**: Select tech stack to filter projects
- **Sort**: Sort by newest or oldest

### Project Features
- Tech stack display with badges
- Links to GitHub repository and live demo
- Creation and update dates
- Featured project highlighting
- Responsive image display

## 🚀 Deployment to Vercel

### Option 1: Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - Copy from `.env.local`
6. Click "Deploy"
7. Visit your deployed site!

### Option 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Environment Variables on Vercel

1. Go to your project settings on Vercel
2. Click "Environment Variables"
3. Add all variables from `.env.local`
4. Redeploy the project

## 🐛 Troubleshooting

### Firebase Connection Issues
- Verify environment variables are correct
- Check Firebase project is active
- Ensure Firestore and Storage are enabled
- Review Firebase security rules

### Authentication Not Working
- Confirm Email/Password provider is enabled
- Check browser console for errors
- Verify Firebase credentials

### Images Not Uploading
- Check Storage bucket name is correct
- Verify storage rules allow your user
- Ensure image file is under 10MB
- Check CORS settings if needed

### Build Errors
- Delete `node_modules` and `.next`
- Run `npm install` again
- Ensure Node.js version is 16+
- Clear npm cache: `npm cache clean --force`

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

## 🎓 Learning Resources

### Next.js App Router
- App Router basics
- Dynamic routes with `[id]`
- Server and Client components
- API routes (if needed)

### Firebase
- Authentication flow
- Firestore CRUD operations
- Cloud Storage file uploads
- Real-time updates with listeners

### Tailwind CSS
- Utility-first CSS approach
- Responsive design with breakpoints
- Custom configuration
- Plugin system

## 🤝 Contributing

This is your personal project vault! Feel free to customize and extend it with:
- Additional project fields (budget, timeline, team, etc.)
- Advanced filtering and sorting
- Project categories or tags
- Collaboration features
- Export/import functionality
- Dark/light theme toggle

## 📄 License

This project is open for personal use. Feel free to modify and deploy as needed.

## 🎯 Future Enhancement Ideas

- [ ] Project categories and tags
- [ ] Collaborative features with team members
- [ ] Project timeline/milestone tracking
- [ ] Advanced analytics dashboard
- [ ] API to fetch projects
- [ ] Social sharing features
- [ ] Project commenting/reviews
- [ ] Dark/Light theme toggle
- [ ] Mobile app version
- [ ] AI-powered project recommendations

## 💡 Tips for Premium Feel

1. **Keep animations smooth**: Use CSS transitions sparingly
2. **Optimize images**: Compress before uploading
3. **Maintain consistency**: Use the design system throughout
4. **Focus on typography**: Bold, modern fonts enhance premium feel
5. **Microinteractions**: Add subtle hover effects
6. **Loading states**: Show progress with animations
7. **Whitespace**: Don't overcrowd the interface
8. **Performance**: Keep load times fast

## 🔗 Links

- **Live Demo**: (Deploy and add your URL)
- **GitHub**: (Add your repository)
- **Firebase Console**: https://console.firebase.google.com
- **Vercel Dashboard**: https://vercel.com/dashboard

---

**Built with ❤️ for premium digital experiences**

Made for developers who want to showcase their work like a luxury brand.
