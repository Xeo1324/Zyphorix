import React from 'react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-glow mb-4">404</h1>
        <p className="text-xl text-white/60 mb-8">Page not found</p>
        <a
          href="/"
          className="btn-primary"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
