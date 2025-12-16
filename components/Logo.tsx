import React from 'react';

const Logo = ({ className = "w-12 h-12" }: { className?: string }) => {
  return (
    <div className={`${className} relative`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <linearGradient id="gateGradient" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>

        {/* Shield Background */}
        <path
          d="M100 20 C100 20 160 40 160 90 C160 140 100 180 100 180 C100 180 40 140 40 90 C40 40 100 20 100 20 Z"
          fill="url(#gateGradient)"
        />

        {/* Inner Outline */}
        <path
          d="M100 28 C100 28 152 45 152 90 C152 132 100 168 100 168 C100 168 48 132 48 90 C48 45 100 28 100 28 Z"
          stroke="white"
          strokeWidth="2"
          strokeOpacity="0.2"
        />

        {/* Stylized Gate/Pillars */}
        <path
          d="M75 120 V85 C75 70 85 60 100 60 C115 60 125 70 125 85 V120"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Book/Education Symbol */}
        <path
          d="M90 105 L100 110 L110 105 V125 L100 130 L90 125 Z"
          fill="#FCD34D"
        />
        
        {/* Horizontal Bar */}
        <path d="M75 95 H125" stroke="white" strokeWidth="4" strokeOpacity="0.8" />
        
        {/* Sparkle Accent */}
        <circle cx="140" cy="50" r="6" fill="#FCD34D" className="animate-pulse" />
      </svg>
    </div>
  );
};

export default Logo;