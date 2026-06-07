import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  textColor?: string;
}

export default function Logo({ className = "h-12 w-12", showText = true, textColor = "text-brand-blue" }: LogoProps) {
  return (
    <div className="flex items-center gap-3 select-none">
      <div className={`relative ${className} flex items-center justify-center transition-transform hover:scale-105 duration-300`}>
        {/* Modern Clean Shield Vector */}
        <svg
          viewBox="0 0 100 120"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shield Base */}
          <path
            d="M50 5 L88 22 C88 65 72 98 50 115 C28 98 12 65 12 22 L50 5 Z"
            fill="#0b2240" // Deep Blue
            stroke="#0d9488" // Modern Teal Stroke
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Internal Elegant Trim */}
          <path
            d="M50 12 L80 26 C80 60 67 87 50 101 C33 87 20 60 20 26 L50 12 Z"
            stroke="rgba(251, 251, 249, 0.2)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* C&S Letters */}
          <text
            x="50"
            y="56"
            fontFamily="var(--font-display), 'Outfit', sans-serif"
            fontWeight="800"
            fontSize="26"
            fill="#fbfbf9"
            textAnchor="middle"
            letterSpacing="-1"
          >
            C&S
          </text>
          {/* Custom Financial Arrow rising right */}
          <path
            d="M32 75 L68 45 M68 45 L54 45 M68 45 L68 59"
            stroke="#06b6d4" // Neon Blue / Cyan accent
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`font-display font-extrabold text-xl tracking-tight leading-none ${textColor}`}>
            C&S PARTNERS
          </span>
          <span className="text-[9px] font-mono tracking-widest text-brand-teal font-semibold uppercase leading-tight mt-0.5">
            CASAS STRATEGIC PARTNERS
          </span>
        </div>
      )}
    </div>
  );
}
