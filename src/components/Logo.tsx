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
        <img 
          src="/logo.png" 
          alt="C&S Partners Logo" 
          className="w-full h-full object-contain filter drop-shadow-md"
          referrerPolicy="no-referrer"
        />
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
