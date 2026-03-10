import React from 'react';

const Logo = ({ className = "w-12 h-12" }: { className?: string }) => {
  return (
    <div className={`${className} relative select-none flex items-center justify-center`}>
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer Double Ring */}
        <circle cx="250" cy="250" r="240" stroke="#173054" strokeWidth="8" />
        <circle cx="250" cy="250" r="225" stroke="#173054" strokeWidth="4" />

        {/* Center Icon Group */}
        <g transform="translate(135, 65)">
            {/* Graduation Cap */}
            <path d="M115 10 L 185 35 L 115 60 L 45 35 Z" fill="#173054" />
            <path d="M115 60 L 185 35" stroke="#A0AAB2" strokeWidth="4" />
            <path d="M185 35 V 75" stroke="#173054" strokeWidth="4" /> 
            <path d="M185 75 L 175 85 L 195 85 Z" fill="#173054" /> 

            {/* Books (Pillars) - Left */}
            <path d="M20 100 H 85 V 230 Q 52.5 245 20 230 Z" fill="#173054" />
            {/* Books (Pillars) - Right */}
            <path d="M145 100 H 210 V 230 Q 177.5 245 145 230 Z" fill="#173054" />

            {/* Upward Arrow (Orange) */}
            <path d="M115 110 L 165 160 H 135 V 230 H 95 V 160 H 65 L 115 110 Z" fill="#E97D22" />
        </g>

        {/* Main Text: COLLEGEGATE */}
        <text x="250" y="380" textAnchor="middle" fontSize="56" fontFamily="'Montserrat', 'Plus Jakarta Sans', sans-serif" fontWeight="800" letterSpacing="-0.02em">
          <tspan fill="#173054">COLLEGE</tspan>
          <tspan fill="#E97D22">GATE</tspan>
        </text>

        {/* Sub Text: AN ENTRANCE OF STUDENTS CHOICE */}
        <text x="250" y="420" textAnchor="middle" fill="#173054" fontSize="18" fontFamily="'Montserrat', 'Plus Jakarta Sans', sans-serif" fontWeight="700" letterSpacing="0.05em">
          AN ENTRANCE OF STUDENTS CHOICE
        </text>
      </svg>
    </div>
  );
};

export default Logo;