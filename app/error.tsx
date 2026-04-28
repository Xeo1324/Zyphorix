'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="text-6xl font-bold text-glow mb-4">⚠️</div>
        <h1 className="text-3xl font-bold text-white mb-2">Oops! Something went wrong</h1>
        <p className="text-white/60 mb-8">
          We encountered an unexpected error. Please try again or go back home.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={reset} className="btn-primary">
            Try Again
          </button>
          <Link href="/" className="btn-secondary">
            Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
