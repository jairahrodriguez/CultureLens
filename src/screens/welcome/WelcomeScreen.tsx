import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CompassIcon, CameraIcon, BookIcon } from 'lucide-react';
export const WelcomeScreen = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen w-screen bg-[#fef7e0] flex flex-col items-center justify-between p-8 text-center">
      {/* Header Icons */}
      <div className="w-full flex justify-between mb-4">
        <button className="text-[#744a32] opacity-60">
          <BookIcon size={24} />
        </button>
        <button className="text-[#744a32] opacity-60">
          <CameraIcon size={24} />
        </button>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-xs w-full">
        {/* Compass Logo */}
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-[#f4f0e6] rounded-full flex items-center justify-center shadow-lg border-4 border-[#fefcf0]">
            <CompassIcon size={40} className="text-[#2f1b14]" />
            <div className="absolute bottom-1 right-1">
              <div className="text-[#744a32] text-sm">✈️</div>
            </div>
          </div>
        </div>
        {/* App Name */}
        <h1 className="text-4xl font-bold text-[#2f1b14] mb-2 font-serif">
          CultureLens
        </h1>
        {/* Tagline */}
        <h2 className="text-lg italic text-[#6d5a42] mb-4 font-serif">
          Your Vintage Travel Companion
        </h2>
        {/* Description */}
        <p className="text-sm text-[#6d5a42] mb-8 font-serif max-w-xs">
          Discover hidden gems, connect with fellow adventurers, and capture
          memories in classic style
        </p>
        {/* Feature Badges */}
        <div className="flex justify-center space-x-2 mb-10">
          <div className="bg-[#fefcf0] px-3 py-1 rounded shadow-md border border-[#d4c4a8] transform rotate-[-2deg]">
            <div className="flex items-center">
              <span className="mr-1 text-sm">✈️</span>
              <span className="uppercase text-xs font-bold text-[#2f1b14] tracking-wider font-serif">
                EXPLORE
              </span>
            </div>
          </div>
          <div className="bg-[#fefcf0] px-3 py-1 rounded shadow-md border border-[#d4c4a8] transform rotate-[1deg]">
            <div className="flex items-center">
              <span className="mr-1 text-sm">🗺️</span>
              <span className="uppercase text-xs font-bold text-[#2f1b14] tracking-wider font-serif">
                DISCOVER
              </span>
            </div>
          </div>
          <div className="bg-[#fefcf0] px-3 py-1 rounded shadow-md border border-[#d4c4a8] transform rotate-[2deg]">
            <div className="flex items-center">
              <span className="mr-1 text-sm">📷</span>
              <span className="uppercase text-xs font-bold text-[#2f1b14] tracking-wider font-serif">
                CAPTURE
              </span>
            </div>
          </div>
        </div>
        {/* CTA Buttons */}
        <button className="w-full py-4 bg-[#744a32] text-white rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#744a32] focus:ring-opacity-50 transition-shadow font-serif font-bold text-lg mb-4" onClick={() => navigate('/register')}>
          Start Your Journey
        </button>
        <div className="text-[#2f1b14] my-2 font-serif">or</div>
        <button className="w-full py-4 bg-[#fefcf0] text-[#2f1b14] rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#744a32] focus:ring-opacity-50 transition-shadow font-serif text-lg border border-[#d4c4a8]" onClick={() => navigate('/login')}>
          Welcome Back, Traveler
        </button>
      </div>
      {/* Quote */}
      <div className="mt-8 italic text-sm text-[#6d5a42] font-serif">
        "Not all those who wander are lost"
      </div>
    </div>;
};