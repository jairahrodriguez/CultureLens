import React, { useState } from 'react';
import { HomeIcon, SearchIcon, MessageSquareIcon, BookOpenIcon, UserIcon, MenuIcon, XIcon } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem = ({ icon, label, active = false, onClick }: NavItemProps) => (
  <button
    className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg transition-colors ${
      active ? 'text-[#744a32] bg-[#e8dcc6]' : 'text-[#8b7355] hover:text-[#744a32] hover:bg-[#f5efe2]'
    }`}
    onClick={onClick}
    aria-label={label}
    aria-current={active ? 'page' : undefined}
  >
    <div>{icon}</div>
    <span className="font-semibold font-serif">{label}</span>
    {active && <div className="ml-auto w-2 h-2 bg-[#744a32] rounded-full"></div>}
  </button>
);

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = localStorage.getItem('user');
  const isAdmin = user ? JSON.parse(user).role === 'Admin' : false;

  const handleNavigate = (tab: string) => {
    onTabChange(tab);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 z-50 bg-[#b7965f] text-[#fefcf0] rounded-full p-5 shadow-lg hover:bg-[#a07853] transition-colors flex items-center justify-center"
        aria-label="Navigation menu"
      >
        {isOpen ? <XIcon size={32} /> : <MenuIcon size={32} />}
      </button>

      {/* Expandable Menu */}
      {isOpen && (
        <nav className="fixed top-24 right-6 z-50 bg-[#fefcf0] border border-[#d4c4a8] rounded-lg shadow-xl p-2 w-56 max-h-96 overflow-y-auto">
          <NavItem
            icon={<HomeIcon size={20} />}
            label="Home"
            active={activeTab === 'home'}
            onClick={() => handleNavigate('home')}
          />
          <NavItem
            icon={<SearchIcon size={20} />}
            label="Search"
            active={activeTab === 'search'}
            onClick={() => handleNavigate('search')}
          />
          <NavItem
            icon={<MessageSquareIcon size={20} />}
            label="Buddy"
            active={activeTab === 'buddy'}
            onClick={() => handleNavigate('buddy')}
          />
          <NavItem
            icon={<BookOpenIcon size={20} />}
            label="Guide"
            active={activeTab === 'guide'}
            onClick={() => handleNavigate('guide')}
          />
          <NavItem
            icon={<UserIcon size={20} />}
            label="Profile"
            active={activeTab === 'account'}
            onClick={() => handleNavigate('account')}
          />
        </nav>
      )}
    </div>
  );
};
