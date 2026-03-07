import React from 'react';
import { MapIcon, CameraIcon } from 'lucide-react';
export function Header() {
  return <header className="flex justify-between items-center w-full max-w-md mx-auto">
      <button aria-label="Open Map" className="p-2 hover:text-[#744a32] transition-colors focus:outline-none focus:ring-2 focus:ring-[#744a32] rounded-md">
        <MapIcon size={24} />
      </button>
      <button aria-label="Open Camera" className="p-2 hover:text-[#744a32] transition-colors focus:outline-none focus:ring-2 focus:ring-[#744a32] rounded-md">
        <CameraIcon size={24} />
      </button>
    </header>;
}