import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BottomNavigation } from '../ui/BottomNavigation';

interface MainLayoutProps {
  onLogout: () => void;
  userType: 'Traveler' | 'Admin' | null;
}

export const MainLayout = ({ onLogout, userType }: MainLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab based on current path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/' || path === '/home') return 'home';
    if (path === '/search') return 'search';
    if (path === '/buddy') return 'buddy';
    if (path === '/guide') return 'guide';
    if (path === '/account') return 'account';
    return 'home';
  };

  const handleTabChange = (tab: string) => {
    switch (tab) {
      case 'home':
        navigate('/home');
        break;
      case 'search':
        navigate('/search');
        break;
      case 'buddy':
        navigate('/buddy');
        break;
      case 'guide':
        navigate('/guide');
        break;
      case 'account':
        navigate('/account');
        break;
      default:
        navigate('/home');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fef7e0] flex flex-col">
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Render navigation only for travelers */}
      {userType === 'Traveler' && (
        <footer>
          <BottomNavigation activeTab={getActiveTab()} onTabChange={handleTabChange} />
        </footer>
      )}
    </div>
  );
};
