import React from 'react';
import { CompassIcon } from 'lucide-react';
export const Logo = () => {
  return <div className="flex flex-col items-center">
      <div className="relative mb-4">
        <div className="w-20 h-20 bg-[#f4f0e6] rounded-full flex items-center justify-center shadow-lg border-4 border-[#fefcf0]">
          <CompassIcon size={36} className="text-[#2f1b14]" />
          <div className="absolute bottom-1 right-1">
            <div className="text-[#744a32] text-sm">✈️</div>
          </div>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-[#2f1b14] font-serif">
        CultureLens
      </h1>
      <p className="text-sm italic text-[#6d5a42] font-serif">
        Your Vintage Travel Companion
      </p>
    </div>;
};