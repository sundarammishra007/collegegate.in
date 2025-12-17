import React from 'react';

const Logo = ({ className = "w-12 h-12" }: { className?: string }) => {
  return (
    <div className={`${className} relative select-none`}>
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer Double Ring */}
        <circle cx="250" cy="250" r="240" stroke="#0F2C4C" strokeWidth="4" />
        <circle cx="250" cy="250" r="225" stroke="#0F2C4C" strokeWidth="2" />

        {/* Top Text: EST. 2023 */}
        <text x="250" y="85" textAnchor="middle" fill="#64748B" fontSize="24" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600" letterSpacing="0.1em">
             EST. 2023
        </text>

        {/* Center Icon Group */}
        <g transform="translate(135, 115)">
            {/* Graduation Cap */}
            <path d="M115 10 L 175 35 L 115 60 L 55 35 Z" fill="#0F2C4C" />
            <path d="M175 35 V 65" stroke="#0F2C4C" strokeWidth="3" /> 

            {/* Books (Pillars) - Left */}
            <path d="M30 75 H 85 V 195 Q 57.5 215 30 195 Z" fill="#0F2C4C" />
            {/* Books (Pillars) - Right */}
            <path d="M145 75 H 200 V 195 Q 172.5 215 145 195 Z" fill="#0F2C4C" />

            {/* Upward Arrow (Orange) */}
            <path d="M115 85 L 160 130 H 135 V 205 H 95 V 130 H 70 L 115 85 Z" fill="#F97316" />
        </g>

        {/* Main Text: COLLEGEGATE (Creative Split Color) */}
        <text x="250" y="385" textAnchor="middle" fontSize="52" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="800" letterSpacing="-0.02em">
          <tspan fill="#0F2C4C">COLLEGE</tspan>
          <tspan fill="#F97316">GATE</tspan>
        </text>

        {/* Sub Text: ENTRANCE OF STUDENTS CHOICE */}
        <text x="250" y="425" textAnchor="middle" fill="#475569" fontSize="16" fontFamily="'Plus Jakarta Sans', sans-serif" fontWeight="600" letterSpacing="0.15em">
          ENTRANCE OF STUDENTS CHOICE
        </text>
      </svg>
    </div>
  );
};

export default Logo;