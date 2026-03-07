import React from 'react';
import { Outlet } from 'react-router-dom';
export const AuthLayout = () => {
  return <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 overflow-y-auto" style={{
    backgroundColor: '#fef7e0',
    backgroundImage: `
          linear-gradient(rgba(254, 247, 224, 0.95), rgba(254, 247, 224, 0.95)),
        `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}>
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>;
};