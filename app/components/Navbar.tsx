'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/lib/hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/config/firebase-admin';
import toast from 'react-hot-toast';

export function Navbar() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      router.push('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="text-2xl font-bold text-glow">
          Zyphorix
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/dashboard" className="text-white/60 hover:text-white transition">
            Dashboard
          </Link>
          <Link href="/upload" className="text-white/60 hover:text-white transition">
            Upload
          </Link>
          <button
            onClick={handleLogout}
            className="btn-secondary text-sm px-4 py-2"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white/60 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-white/5 backdrop-blur-md"
        >
          <div className="px-4 py-4 space-y-4">
            <Link
              href="/dashboard"
              className="block text-white/60 hover:text-white transition"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/upload"
              className="block text-white/60 hover:text-white transition"
              onClick={() => setMenuOpen(false)}
            >
              Upload
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="btn-secondary text-sm px-4 py-2 w-full"
            >
              Logout
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
