'use client';

import React from 'react';

export default function WaveAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Wave SVG Background */}
      <svg
        className="absolute bottom-0 left-0 w-full h-auto opacity-30 animate-pulse"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ff6b00" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Primary Wave */}
        <path
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="url(#waveGradient)"
          filter="url(#glow)"
          className="animate-wave"
        />

        {/* Secondary Wave (offset) */}
        <path
          d="M0,160L48,165.3C96,171,192,181,288,176C384,171,480,149,576,144C672,139,768,149,864,160C960,171,1056,181,1152,192C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="url(#waveGradient)"
          filter="url(#glow)"
          className="animate-wave-delayed"
          style={{ opacity: 0.5 }}
        />
      </svg>

      {/* Glow orbs */}
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-neon-purple/5 rounded-full blur-3xl animate-float-delayed"></div>
    </div>
  );
}
