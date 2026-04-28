'use client';

import React from 'react';

export function ProjectCardSkeleton() {
  return (
    <div className="glass-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-white/5"></div>
      <div className="p-6 space-y-4">
        <div className="h-5 bg-white/5 rounded w-3/4"></div>
        <div className="h-4 bg-white/5 rounded w-full"></div>
        <div className="h-4 bg-white/5 rounded w-5/6"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-white/5 rounded w-16"></div>
          <div className="h-6 bg-white/5 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}
