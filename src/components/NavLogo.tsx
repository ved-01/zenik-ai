import React from "react";
import logoSvg from "../assets/logo.svg";

export const NavLogo = () => {
  return (
    <div className="absolute top-7 left-10 z-[60] flex items-center">
      <div className="flex items-center gap-2">
        <img 
          src={logoSvg} 
          alt="Zenik AI Logo" 
          className="h-8 sm:h-9 md:h-10" 
        />
        <span className="text-lg sm:text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-600">
          zenik
        </span>
      </div>
    </div>
  );
};
