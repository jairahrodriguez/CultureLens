import React from 'react';
export function CTAButtons() {
  return <div className="flex flex-col items-center w-full max-w-xs">
      <button className="w-full py-4 bg-[#744a32] text-white rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#744a32] focus:ring-opacity-50 transition-shadow font-serif font-bold text-lg mb-4">
        Start Your Journey
      </button>
      <div className="text-[#2f1b14] my-2 font-serif">or</div>
      <button className="w-full py-4 bg-[#fefcf0] text-[#2f1b14] rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#744a32] focus:ring-opacity-50 transition-shadow font-serif text-lg">
        Welcome Back, Traveler
      </button>
    </div>;
}