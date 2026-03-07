import React, { memo, Component } from 'react';
import { MapIcon, CameraIcon, HomeIcon, SearchIcon, MessageSquareIcon, BookOpenIcon, UserIcon, HeartIcon, StarIcon, MapPinIcon, UsersIcon, ClockIcon } from 'lucide-react';
export const CultureLensDesignSystem = () => {
  return <div className="min-h-screen bg-[#fef7e0] p-6 font-[Josefin_Slab]">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-[#2f1b14] mb-4 font-serif">
          CultureLens Design System
        </h1>
        <p className="text-[#6d5a42] text-lg italic font-serif">
          Your Vintage Travel Companion
        </p>
      </header>
      {/* Color Palette Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-[#2f1b14] mb-6 font-serif">
          Color Palette
        </h2>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-[#2f1b14] font-serif">
            Parchment Tones (Light Backgrounds)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <ColorSwatch name="parchment-50" hex="#fefcf0" rgb="254, 252, 240" usage="Lightest - Cards, input backgrounds" />
            <ColorSwatch name="parchment-100" hex="#fef7e0" rgb="254, 247, 224" usage="Main background color" />
            <ColorSwatch name="parchment-200" hex="#fcefc2" rgb="252, 239, 194" usage="Secondary backgrounds" />
            <ColorSwatch name="parchment-300" hex="#f8e398" rgb="248, 227, 152" usage="Accent backgrounds" />
            <ColorSwatch name="parchment-400" hex="#f2d478" rgb="242, 212, 120" usage="Highlight elements" />
            <ColorSwatch name="parchment-500" hex="#e8c547" rgb="232, 197, 71" usage="Strong accents" />
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-[#2f1b14] font-serif">
            Sepia/Gray Tones (Neutral)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <ColorSwatch name="sepia-100" hex="#f4f0e6" rgb="244, 240, 230" usage="Subtle backgrounds" />
            <ColorSwatch name="sepia-200" hex="#e8dcc6" rgb="232, 220, 198" usage="Secondary buttons, badges" />
            <ColorSwatch name="sepia-300" hex="#d4c4a8" rgb="212, 196, 168" usage="Borders, dividers" />
            <ColorSwatch name="sepia-400" hex="#bfa888" rgb="191, 168, 136" usage="Strong borders" />
            <ColorSwatch name="sepia-500" hex="#a08968" rgb="160, 137, 104" usage="Medium emphasis text" />
            <ColorSwatch name="sepia-600" hex="#8b7355" rgb="139, 115, 85" usage="Icons, secondary text" />
            <ColorSwatch name="sepia-700" hex="#6d5a42" rgb="109, 90, 66" usage="Body text" />
            <ColorSwatch name="sepia-800" hex="#4a3e2a" rgb="74, 62, 42" usage="Dark text" />
            <ColorSwatch name="sepia-900" hex="#2d251a" rgb="45, 37, 26" usage="Darkest text" />
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-[#2f1b14] font-serif">
            Brown Tones (Primary Brand)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <ColorSwatch name="brown-500" hex="#8b5a3c" rgb="139, 90, 60" usage="Primary medium" />
            <ColorSwatch name="brown-600" hex="#744a32" rgb="116, 74, 50" usage="Primary button color, active states" />
            <ColorSwatch name="brown-700" hex="#5d3a28" rgb="93, 58, 40" usage="Hover states, destructive" />
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-[#2f1b14] font-serif">
            Leather Tones (Accent)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <ColorSwatch name="leather-500" hex="#8b4513" rgb="139, 69, 19" usage="Accent elements" />
            <ColorSwatch name="leather-600" hex="#a0522d" rgb="160, 82, 45" usage="Star ratings, highlights" />
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-[#2f1b14] font-serif">
            Ink (Text)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <ColorSwatch name="ink-500" hex="#2f1b14" rgb="47, 27, 20" usage="Primary text color" />
            <ColorSwatch name="ink-600" hex="#1a0f0a" rgb="26, 15, 10" usage="Darkest text" />
          </div>
        </div>
      </section>
      {/* Typography Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-[#2f1b14] mb-6 font-serif">
          Typography System
        </h2>
        <div className="bg-[#fefcf0] p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4 text-[#2f1b14] font-serif">
            Primary Font Family
          </h3>
          <p className="mb-4 text-[#6d5a42] font-serif">
            <strong>Josefin Slab</strong> - A vintage slab serif typeface
          </p>
          <div className="bg-[#f4f0e6] p-4 rounded-md mb-4">
            <code className="text-[#5d3a28] text-sm">
              {`/* Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=Josefin+Slab:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&display=swap');
/* Apply globally */
body {
  font-family: 'Josefin Slab', Georgia, 'Times New Roman', serif;
}`}
            </code>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-[#2f1b14] font-serif">
            Type Scale & Hierarchy
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#e8dcc6]">
                  <th className="p-3 text-left font-bold text-[#2f1b14] border border-[#d4c4a8] font-serif">
                    Element
                  </th>
                  <th className="p-3 text-left font-bold text-[#2f1b14] border border-[#d4c4a8] font-serif">
                    Size
                  </th>
                  <th className="p-3 text-left font-bold text-[#2f1b14] border border-[#d4c4a8] font-serif">
                    Weight
                  </th>
                  <th className="p-3 text-left font-bold text-[#2f1b14] border border-[#d4c4a8] font-serif">
                    Line Height
                  </th>
                  <th className="p-3 text-left font-bold text-[#2f1b14] border border-[#d4c4a8] font-serif">
                    Letter Spacing
                  </th>
                  <th className="p-3 text-left font-bold text-[#2f1b14] border border-[#d4c4a8] font-serif">
                    Usage
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#fefcf0]">
                  <td className="p-3 border border-[#d4c4a8] font-bold text-[#2f1b14] font-serif">
                    h1
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    2xl (≈36px)
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    700 (Bold)
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    1.3
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    0.025em
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    Main screen titles
                  </td>
                </tr>
                <tr className="bg-[#f4f0e6]">
                  <td className="p-3 border border-[#d4c4a8] font-bold text-[#2f1b14] font-serif">
                    h2
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    xl (≈24px)
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    700 (Bold)
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    1.3
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    0.025em
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    Section headings
                  </td>
                </tr>
                <tr className="bg-[#fefcf0]">
                  <td className="p-3 border border-[#d4c4a8] font-bold text-[#2f1b14] font-serif">
                    h3
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    lg (≈20px)
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    600 (Semi-bold)
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    1.4
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    0.025em
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    Card titles, sub-sections
                  </td>
                </tr>
                <tr className="bg-[#f4f0e6]">
                  <td className="p-3 border border-[#d4c4a8] font-bold text-[#2f1b14] font-serif">
                    h4
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    base (≈16px)
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    600 (Semi-bold)
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    1.4
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    0.025em
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    Small headings
                  </td>
                </tr>
                <tr className="bg-[#fefcf0]">
                  <td className="p-3 border border-[#d4c4a8] font-bold text-[#2f1b14] font-serif">
                    p
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    base (≈16px)
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    600 (Semi-bold)
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    1.7
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    —
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    Body text, descriptions
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-[#fefcf0] p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-[#2f1b14] font-serif">
            Typography Examples
          </h3>
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-[#2f1b14] mb-2 font-serif">
              CultureLens
            </h1>
            <p className="text-xs text-[#6d5a42] font-serif">
              h1 - 36px (2xl), 700 weight
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#2f1b14] mb-2 font-serif">
              Featured Expeditions
            </h2>
            <p className="text-xs text-[#6d5a42] font-serif">
              h2 - 24px (xl), 700 weight
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[#2f1b14] mb-2 font-serif">
              Kyoto Imperial Palace
            </h3>
            <p className="text-xs text-[#6d5a42] font-serif">
              h3 - 20px (lg), 600 weight
            </p>
          </div>
          <div className="mb-6">
            <h4 className="text-base font-semibold text-[#2f1b14] mb-2 font-serif">
              Traveler's Note
            </h4>
            <p className="text-xs text-[#6d5a42] font-serif">
              h4 - 16px (base), 600 weight
            </p>
          </div>
          <div className="mb-6">
            <p className="text-base font-semibold text-[#6d5a42] leading-7 font-serif">
              Discover hidden gems, connect with fellow adventurers, and capture
              memories in classic style.
            </p>
            <p className="text-xs text-[#6d5a42] mt-2 font-serif">
              p - 16px (base), 600 weight, 1.7 line height
            </p>
          </div>
          <div className="mb-6">
            <p className="text-base italic font-semibold text-[#6d5a42] font-serif">
              "Not all those who wander are lost"
            </p>
            <p className="text-xs text-[#6d5a42] mt-2 font-serif">
              italic text - Used for quotes and secondary information
            </p>
          </div>
          <div className="mb-6">
            <p className="text-base font-semibold text-[#6d5a42] uppercase tracking-wider font-serif">
              EXPLORE
            </p>
            <p className="text-xs text-[#6d5a42] mt-2 font-serif">
              ALL CAPS - Used for vintage stamps and badges
            </p>
          </div>
        </div>
      </section>
      {/* Component Library Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-[#2f1b14] mb-6 font-serif">
          Component Library
        </h2>
        {/* Button Variants */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4 text-[#2f1b14] font-serif">
            Button Variants
          </h3>
          <div className="bg-[#fefcf0] p-6 rounded-lg shadow-md mb-6">
            <h4 className="text-base font-semibold mb-4 text-[#2f1b14] font-serif">
              Primary Button
            </h4>
            <div className="flex flex-wrap gap-4 mb-4">
              <button className="bg-[#744a32] text-[#fefcf0] px-4 py-2 rounded font-bold shadow-md hover:shadow-lg hover:bg-[#5d3a28] transition-all font-serif">
                Start Your Journey
              </button>
            </div>
            <div className="bg-[#f4f0e6] p-4 rounded-md">
              <code className="text-[#5d3a28] text-sm">
                {`<button className="bg-[#744a32] text-[#fefcf0] px-4 py-2 rounded font-bold 
  shadow-md hover:shadow-lg hover:bg-[#5d3a28] transition-all font-serif">
  Start Your Journey
</button>`}
              </code>
            </div>
          </div>
          <div className="bg-[#fefcf0] p-6 rounded-lg shadow-md mb-6">
            <h4 className="text-base font-semibold mb-4 text-[#2f1b14] font-serif">
              Outline Button
            </h4>
            <div className="flex flex-wrap gap-4 mb-4">
              <button className="bg-transparent text-[#744a32] px-4 py-2 rounded font-bold border-2 border-[#a08968] hover:bg-[#f4f0e6] transition-all shadow-md font-serif">
                Welcome Back, Traveler
              </button>
            </div>
            <div className="bg-[#f4f0e6] p-4 rounded-md">
              <code className="text-[#5d3a28] text-sm">
                {`<button className="bg-transparent text-[#744a32] px-4 py-2 rounded font-bold 
  border-2 border-[#a08968] hover:bg-[#f4f0e6] transition-all shadow-md font-serif">
  Welcome Back, Traveler
</button>`}
              </code>
            </div>
          </div>
          <div className="bg-[#fefcf0] p-6 rounded-lg shadow-md">
            <h4 className="text-base font-semibold mb-4 text-[#2f1b14] font-serif">
              Icon Button
            </h4>
            <div className="flex flex-wrap gap-4 mb-4">
              <button className="bg-[#e8dcc6] p-2 rounded-full hover:bg-[#d4c4a8] transition-all shadow-md">
                <HeartIcon size={20} className="text-[#744a32]" />
              </button>
              <button className="bg-[#744a32] p-2 rounded-full hover:bg-[#5d3a28] transition-all shadow-md">
                <MapPinIcon size={20} className="text-[#fefcf0]" />
              </button>
            </div>
            <div className="bg-[#f4f0e6] p-4 rounded-md">
              <code className="text-[#5d3a28] text-sm">
                {`<button className="bg-[#e8dcc6] p-2 rounded-full hover:bg-[#d4c4a8] transition-all shadow-md">
  <HeartIcon size={20} className="text-[#744a32]" />
</button>
<button className="bg-[#744a32] p-2 rounded-full hover:bg-[#5d3a28] transition-all shadow-md">
  <MapPinIcon size={20} className="text-[#fefcf0]" />
</button>`}
              </code>
            </div>
          </div>
        </div>
        {/* Navigation Components */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4 text-[#2f1b14] font-serif">
            Navigation Components
          </h3>
          <div className="bg-[#fefcf0] p-6 rounded-lg shadow-md">
            <h4 className="text-base font-semibold mb-4 text-[#2f1b14] font-serif">
              Bottom Navigation
            </h4>
            <div className="mb-4 flex justify-center">
              <div className="bg-[#fefcf0] border border-[#d4c4a8] rounded-t-lg p-4 flex justify-around items-center w-full max-w-md shadow-lg">
                <NavItem icon={<HomeIcon />} label="Home" active={true} />
                <NavItem icon={<SearchIcon />} label="Search" />
                <NavItem icon={<MessageSquareIcon />} label="Buddy" />
                <NavItem icon={<BookOpenIcon />} label="Guide" />
                <NavItem icon={<UserIcon />} label="Account" />
              </div>
            </div>
            <div className="bg-[#f4f0e6] p-4 rounded-md">
              <code className="text-[#5d3a28] text-sm">
                {`<div className="bg-[#fefcf0] border border-[#d4c4a8] rounded-t-lg p-4 
  flex justify-around items-center w-full max-w-md shadow-lg">
  <NavItem icon={<HomeIcon />} label="Home" active={true} />
  <NavItem icon={<SearchIcon />} label="Search" />
  <NavItem icon={<MessageSquareIcon />} label="Buddy" />
  <NavItem icon={<BookOpenIcon />} label="Guide" />
  <NavItem icon={<UserIcon />} label="Account" />
</div>
// NavItem component
const NavItem = ({ icon, label, active = false }) => (
  <div className={\`flex flex-col items-center \${active ? 
    "text-[#744a32] bg-[#e8dcc6] p-2 rounded-lg relative" : 
    "text-[#8b7355] hover:text-[#744a32]"}\`}>
    <div className="mb-1">
      {icon}
    </div>
    <span className="text-xs font-semibold">{label}</span>
    {active && (
      <div className="absolute -bottom-1 w-1.5 h-1.5 bg-[#744a32] rounded-full"></div>
    )}
  </div>
)`}
              </code>
            </div>
          </div>
        </div>
        {/* Card Components */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4 text-[#2f1b14] font-serif">
            Card Components
          </h3>
          <div className="bg-[#fefcf0] p-6 rounded-lg shadow-md mb-6">
            <h4 className="text-base font-semibold mb-4 text-[#2f1b14] font-serif">
              Destination Card
            </h4>
            <div className="mb-4">
              <div className="flex bg-[#fefcf0] border border-[#bfa888] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
                <div className="w-36 h-36 bg-[#e8dcc6] flex items-center justify-center">
                  <div className="text-[#8b7355] text-4xl">🏯</div>
                </div>
                <div className="p-4 flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-[#2f1b14] font-serif">
                      Kyoto Imperial Palace
                    </h4>
                    <button className="text-[#744a32]">
                      <HeartIcon size={18} />
                    </button>
                  </div>
                  <div className="flex items-center text-sm text-[#6d5a42] mb-1 font-serif">
                    <MapPinIcon size={14} className="mr-1" />
                    <span>Japan</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <StarIcon size={14} className="text-[#a0522d]" />
                    <StarIcon size={14} className="text-[#a0522d]" />
                    <StarIcon size={14} className="text-[#a0522d]" />
                    <StarIcon size={14} className="text-[#a0522d]" />
                    <StarIcon size={14} className="text-[#a0522d]" />
                  </div>
                  <div className="flex text-xs text-[#6d5a42] mb-2 font-serif">
                    <div className="flex items-center mr-2">
                      <ClockIcon size={12} className="mr-1" />
                      <span>3-4 hours</span>
                    </div>
                    <div className="flex items-center">
                      <UsersIcon size={12} className="mr-1" />
                      <span>2,450 travelers</span>
                    </div>
                  </div>
                  <div className="text-[#a0522d] font-bold mb-2 font-serif">
                    $45 - $65
                  </div>
                  <button className="bg-[#744a32] text-[#fefcf0] px-3 py-1 rounded text-sm font-bold shadow-md hover:bg-[#5d3a28] transition-all font-serif">
                    View Details
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-[#f4f0e6] p-4 rounded-md">
              <code className="text-[#5d3a28] text-sm">
                {`<div className="flex bg-[#fefcf0] border border-[#bfa888] rounded-lg overflow-hidden 
  shadow-lg hover:shadow-xl transition-all">
  <div className="w-36 h-36 bg-[#e8dcc6] flex items-center justify-center">
    <div className="text-[#8b7355] text-4xl">🏯</div>
  </div>
  <div className="p-4 flex-1">
    <div className="flex justify-between items-start">
      <h4 className="font-semibold text-[#2f1b14] font-serif">Kyoto Imperial Palace</h4>
      <button className="text-[#744a32]">
        <HeartIcon size={18} />
      </button>
    </div>
    <div className="flex items-center text-sm text-[#6d5a42] mb-1 font-serif">
      <MapPinIcon size={14} className="mr-1" />
      <span>Japan</span>
    </div>
    <div className="flex items-center mb-2">
      <StarIcon size={14} className="text-[#a0522d]" />
      <StarIcon size={14} className="text-[#a0522d]" />
      <StarIcon size={14} className="text-[#a0522d]" />
      <StarIcon size={14} className="text-[#a0522d]" />
      <StarIcon size={14} className="text-[#a0522d]" />
    </div>
    <div className="flex text-xs text-[#6d5a42] mb-2 font-serif">
      <div className="flex items-center mr-2">
        <ClockIcon size={12} className="mr-1" />
        <span>3-4 hours</span>
      </div>
      <div className="flex items-center">
        <UsersIcon size={12} className="mr-1" />
        <span>2,450 travelers</span>
      </div>
    </div>
    <div className="text-[#a0522d] font-bold mb-2 font-serif">$45 - $65</div>
    <button className="bg-[#744a32] text-[#fefcf0] px-3 py-1 rounded text-sm 
      font-bold shadow-md hover:bg-[#5d3a28] transition-all font-serif">
      View Details
    </button>
  </div>
</div>`}
              </code>
            </div>
          </div>
          <div className="bg-[#fefcf0] p-6 rounded-lg shadow-md">
            <h4 className="text-base font-semibold mb-4 text-[#2f1b14] font-serif">
              Message Bubble
            </h4>
            <div className="mb-4">
              <div className="flex justify-end mb-4">
                <div className="bg-[#dcbd8c] text-white p-4 rounded-lg max-w-[80%] shadow-md font-serif">
                  <p className="italic font-bold">
                    What are local customs in Japan?
                  </p>
                  <div className="text-xs opacity-70 mt-1 text-right">
                    10:45 AM
                  </div>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-[#bc9a60] text-white p-4 rounded-lg max-w-[80%] shadow-md font-serif">
                  <p className="italic font-bold">
                    In Japan, it's customary to bow when greeting someone. The
                    depth and duration of the bow indicates the level of
                    respect. Also, removing shoes before entering homes and
                    certain establishments is expected.
                  </p>
                  <div className="text-xs opacity-70 mt-1">10:46 AM</div>
                </div>
              </div>
            </div>
            <div className="bg-[#f4f0e6] p-4 rounded-md">
              <code className="text-[#5d3a28] text-sm">
                {`<!-- User Message -->
<div className="flex justify-end mb-4">
  <div className="bg-[#dcbd8c] text-white p-4 rounded-lg max-w-[80%] shadow-md font-serif">
    <p className="italic font-bold">What are local customs in Japan?</p>
    <div className="text-xs opacity-70 mt-1 text-right">10:45 AM</div>
  </div>
</div>
<!-- Bot Message -->
<div className="flex justify-start">
  <div className="bg-[#bc9a60] text-white p-4 rounded-lg max-w-[80%] shadow-md font-serif">
    <p className="italic font-bold">In Japan, it's customary to bow when greeting someone. 
      The depth and duration of the bow indicates the level of respect. 
      Also, removing shoes before entering homes and certain establishments is expected.</p>
    <div className="text-xs opacity-70 mt-1">10:46 AM</div>
  </div>
</div>`}
              </code>
            </div>
          </div>
        </div>
        {/* Form Components */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4 text-[#2f1b14] font-serif">
            Form Components
          </h3>
          <div className="bg-[#fefcf0] p-6 rounded-lg shadow-md mb-6">
            <h4 className="text-base font-semibold mb-4 text-[#2f1b14] font-serif">
              Input Fields
            </h4>
            <div className="mb-4">
              <label className="block text-[#6d5a42] mb-2 font-semibold font-serif">
                Email Address
              </label>
              <div className="relative">
                <input type="email" className="w-full bg-[#fefcf0] border border-[#d4c4a8] rounded p-3 font-semibold text-[#2f1b14] shadow-inner focus:ring-2 focus:ring-[#8b5a3c] focus:outline-none font-serif" placeholder="traveler@email.com" />
              </div>
            </div>
            <div className="bg-[#f4f0e6] p-4 rounded-md">
              <code className="text-[#5d3a28] text-sm">
                {`<label className="block text-[#6d5a42] mb-2 font-semibold font-serif">Email Address</label>
<div className="relative">
  <input 
    type="email" 
    className="w-full bg-[#fefcf0] border border-[#d4c4a8] rounded p-3 
      font-semibold text-[#2f1b14] shadow-inner 
      focus:ring-2 focus:ring-[#8b5a3c] focus:outline-none font-serif"
    placeholder="traveler@email.com"
  />
</div>`}
              </code>
            </div>
          </div>
          <div className="bg-[#fefcf0] p-6 rounded-lg shadow-md">
            <h4 className="text-base font-semibold mb-4 text-[#2f1b14] font-serif">
              Search Input
            </h4>
            <div className="mb-4">
              <div className="relative">
                <input type="search" className="w-full bg-[#fefcf0] border border-[#d4c4a8] rounded-full pl-10 pr-4 py-3 font-semibold text-[#2f1b14] shadow-inner focus:ring-2 focus:ring-[#8b5a3c] focus:outline-none font-serif" placeholder="Discover new cultures & destinations..." />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon size={20} className="text-[#8b7355]" />
                </div>
              </div>
            </div>
            <div className="bg-[#f4f0e6] p-4 rounded-md">
              <code className="text-[#5d3a28] text-sm">
                {`<div className="relative">
  <input 
    type="search" 
    className="w-full bg-[#fefcf0] border border-[#d4c4a8] rounded-full pl-10 pr-4 py-3 
      font-semibold text-[#2f1b14] shadow-inner 
      focus:ring-2 focus:ring-[#8b5a3c] focus:outline-none font-serif"
    placeholder="Discover new cultures & destinations..."
  />
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <SearchIcon size={20} className="text-[#8b7355]" />
  </div>
</div>`}
              </code>
            </div>
          </div>
        </div>
        {/* Badge Components */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4 text-[#2f1b14] font-serif">
            Badge Components
          </h3>
          <div className="bg-[#fefcf0] p-6 rounded-lg shadow-md mb-6">
            <h4 className="text-base font-semibold mb-4 text-[#2f1b14] font-serif">
              Category Badge
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-[#e8dcc6] text-[#4a3e2a] text-xs px-2 py-1 rounded-full border border-[#bfa888] font-semibold font-serif">
                Cultural Festivals
              </span>
              <span className="bg-[#e8dcc6] text-[#4a3e2a] text-xs px-2 py-1 rounded-full border border-[#bfa888] font-semibold font-serif">
                Local Cuisine
              </span>
              <span className="bg-[#e8dcc6] text-[#4a3e2a] text-xs px-2 py-1 rounded-full border border-[#bfa888] font-semibold font-serif">
                Historical Sites
              </span>
            </div>
            <div className="bg-[#f4f0e6] p-4 rounded-md">
              <code className="text-[#5d3a28] text-sm">
                {`<span className="bg-[#e8dcc6] text-[#4a3e2a] text-xs px-2 py-1 
  rounded-full border border-[#bfa888] font-semibold font-serif">
  Cultural Festivals
</span>`}
              </code>
            </div>
          </div>
          <div className="bg-[#fefcf0] p-6 rounded-lg shadow-md">
            <h4 className="text-base font-semibold mb-4 text-[#2f1b14] font-serif">
              Travel Stamp
            </h4>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="bg-[#f8e398] px-3 py-2 rounded border-2 border-[#e8c547] shadow-md transform -rotate-1 font-serif">
                <div className="flex items-center">
                  <span className="mr-1 text-lg">✈️</span>
                  <span className="uppercase font-bold text-[#2f1b14] tracking-wider">
                    EXPLORE
                  </span>
                </div>
              </div>
              <div className="bg-[#f8e398] px-3 py-2 rounded border-2 border-[#e8c547] shadow-md transform rotate-1 font-serif">
                <div className="flex items-center">
                  <span className="mr-1 text-lg">🗺️</span>
                  <span className="uppercase font-bold text-[#2f1b14] tracking-wider">
                    DISCOVER
                  </span>
                </div>
              </div>
              <div className="bg-[#f8e398] px-3 py-2 rounded border-2 border-[#e8c547] shadow-md transform rotate-2 font-serif">
                <div className="flex items-center">
                  <span className="mr-1 text-lg">📷</span>
                  <span className="uppercase font-bold text-[#2f1b14] tracking-wider">
                    CAPTURE
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-[#f4f0e6] p-4 rounded-md">
              <code className="text-[#5d3a28] text-sm">
                {`<div className="bg-[#f8e398] px-3 py-2 rounded border-2 border-[#e8c547] 
  shadow-md transform -rotate-1 font-serif">
  <div className="flex items-center">
    <span className="mr-1 text-lg">✈️</span>
    <span className="uppercase font-bold text-[#2f1b14] tracking-wider">EXPLORE</span>
  </div>
</div>`}
              </code>
            </div>
          </div>
        </div>
      </section>
      {/* Layout Patterns */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-[#2f1b14] mb-6 font-serif">
          Layout Patterns
        </h2>
        <div className="bg-[#fefcf0] p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4 text-[#2f1b14] font-serif">
            Screen Structure
          </h3>
          <div className="border border-[#d4c4a8] rounded p-4 mb-4">
            <div className="bg-[#b7965f] text-white p-4 rounded-t font-serif font-bold">
              Fixed Header
            </div>
            <div className="bg-[#fef7e0] p-4 min-h-[200px] flex items-center justify-center border-b border-[#d4c4a8] font-serif">
              Scrollable Content Area
            </div>
            <div className="bg-[#fefcf0] border-t border-[#d4c4a8] p-4 rounded-b flex justify-around font-serif">
              <div className="text-center text-xs">
                <div className="h-5 w-5 mx-auto mb-1 bg-[#744a32] rounded-full"></div>
                Home
              </div>
              <div className="text-center text-xs">
                <div className="h-5 w-5 mx-auto mb-1 bg-[#8b7355] rounded-full"></div>
                Search
              </div>
              <div className="text-center text-xs">
                <div className="h-5 w-5 mx-auto mb-1 bg-[#8b7355] rounded-full"></div>
                Buddy
              </div>
              <div className="text-center text-xs">
                <div className="h-5 w-5 mx-auto mb-1 bg-[#8b7355] rounded-full"></div>
                Guide
              </div>
              <div className="text-center text-xs">
                <div className="h-5 w-5 mx-auto mb-1 bg-[#8b7355] rounded-full"></div>
                Account
              </div>
            </div>
          </div>
          <div className="bg-[#f4f0e6] p-4 rounded-md">
            <code className="text-[#5d3a28] text-sm">
              {`<div className="min-h-screen max-w-md mx-auto bg-[#fef7e0] flex flex-col">
  {/* Fixed Header */}
  <header className="bg-[#b7965f] text-white p-4 shadow-md">
    {/* Header content */}
  </header>
  {/* Scrollable Content */}
  <main className="flex-1 overflow-y-auto p-4">
    {/* Screen content */}
  </main>
  {/* Fixed Bottom Navigation */}
  <nav className="bg-[#fefcf0] border-t border-[#d4c4a8] p-4 flex justify-around">
    {/* Navigation items */}
  </nav>
</div>`}
            </code>
          </div>
        </div>
        <div className="bg-[#fefcf0] p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-[#2f1b14] font-serif">
            Modal Pattern
          </h3>
          <div className="border border-[#d4c4a8] rounded p-4 mb-4 bg-black bg-opacity-50 min-h-[200px] flex items-center justify-center">
            <div className="bg-[#fefcf0] rounded-lg shadow-xl p-4 max-w-xs w-full">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-[#2f1b14] font-serif">
                  Destination Details
                </h4>
                <button className="text-[#8b7355] hover:text-[#744a32]">
                  ✕
                </button>
              </div>
              <div className="h-24 bg-[#e8dcc6] rounded mb-4"></div>
              <div className="space-y-2 font-serif">
                <h5 className="font-semibold text-[#2f1b14]">
                  Kyoto Imperial Palace
                </h5>
                <p className="text-sm text-[#6d5a42]">
                  Experience the historic residence of Japan's Imperial Family
                  until 1868.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#f4f0e6] p-4 rounded-md">
            <code className="text-[#5d3a28] text-sm">
              {`{isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
    <div className="bg-[#fefcf0] rounded-lg shadow-xl p-4 max-w-md w-full max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-[#2f1b14] font-serif">Destination Details</h4>
        <button 
          className="text-[#8b7355] hover:text-[#744a32]"
          onClick={() => setIsModalOpen(false)}
        >
          ✕
        </button>
      </div>
      <div className="space-y-4">
        {/* Modal content */}
      </div>
    </div>
  </div>
)}`}
            </code>
          </div>
        </div>
      </section>
      {/* Design Tokens Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-[#2f1b14] mb-6 font-serif">
          Design Tokens
        </h2>
        <div className="bg-[#fefcf0] p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4 text-[#2f1b14] font-serif">
            Spacing Scale
          </h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#e8dcc6]">
                  <th className="p-3 text-left font-bold text-[#2f1b14] border border-[#d4c4a8] font-serif">
                    Token
                  </th>
                  <th className="p-3 text-left font-bold text-[#2f1b14] border border-[#d4c4a8] font-serif">
                    Value
                  </th>
                  <th className="p-3 text-left font-bold text-[#2f1b14] border border-[#d4c4a8] font-serif">
                    Example Usage
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-[#fefcf0]">
                  <td className="p-3 border border-[#d4c4a8] font-bold text-[#2f1b14] font-serif">
                    1
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    4px (0.25rem)
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    Small gaps, tiny margins
                  </td>
                </tr>
                <tr className="bg-[#f4f0e6]">
                  <td className="p-3 border border-[#d4c4a8] font-bold text-[#2f1b14] font-serif">
                    2
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    8px (0.5rem)
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    Standard gaps, button padding
                  </td>
                </tr>
                <tr className="bg-[#fefcf0]">
                  <td className="p-3 border border-[#d4c4a8] font-bold text-[#2f1b14] font-serif">
                    4
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    16px (1rem)
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    Standard padding, margins
                  </td>
                </tr>
                <tr className="bg-[#f4f0e6]">
                  <td className="p-3 border border-[#d4c4a8] font-bold text-[#2f1b14] font-serif">
                    6
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    24px (1.5rem)
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    Large padding, section spacing
                  </td>
                </tr>
                <tr className="bg-[#fefcf0]">
                  <td className="p-3 border border-[#d4c4a8] font-bold text-[#2f1b14] font-serif">
                    8
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    32px (2rem)
                  </td>
                  <td className="p-3 border border-[#d4c4a8] text-[#6d5a42] font-serif">
                    Large component spacing
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-[#fefcf0] p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-[#2f1b14] font-serif">
            Shadows
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <div className="h-16 bg-[#fefcf0] shadow-sm rounded border border-[#d4c4a8] flex items-center justify-center mb-2 font-serif">
                shadow-sm
              </div>
              <p className="text-sm text-[#6d5a42] font-serif">
                Subtle, close to surface
              </p>
            </div>
            <div>
              <div className="h-16 bg-[#fefcf0] shadow-md rounded border border-[#d4c4a8] flex items-center justify-center mb-2 font-serif">
                shadow-md
              </div>
              <p className="text-sm text-[#6d5a42] font-serif">
                Standard card elevation
              </p>
            </div>
            <div>
              <div className="h-16 bg-[#fefcf0] shadow-lg rounded border border-[#d4c4a8] flex items-center justify-center mb-2 font-serif">
                shadow-lg
              </div>
              <p className="text-sm text-[#6d5a42] font-serif">
                Emphasized cards, hovered states
              </p>
            </div>
            <div>
              <div className="h-16 bg-[#fefcf0] shadow-xl rounded border border-[#d4c4a8] flex items-center justify-center mb-2 font-serif">
                shadow-xl
              </div>
              <p className="text-sm text-[#6d5a42] font-serif">
                Maximum elevation, active modals
              </p>
            </div>
          </div>
          <div className="bg-[#f4f0e6] p-4 rounded-md">
            <code className="text-[#5d3a28] text-sm">
              {`/* Shadow Examples */
shadow-sm: Subtle, close to surface
shadow-md: Standard card elevation
shadow-lg: Emphasized cards, hovered states
shadow-xl: Maximum elevation, active modals
shadow-2xl: App container border
/* Vintage text shadow effect */
text-shadow: 2px 2px 4px rgba(139, 90, 60, 0.2)
`}
            </code>
          </div>
        </div>
      </section>
      {/* Accessibility & UX Notes */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-[#2f1b14] mb-6 font-serif">
          Accessibility & UX Notes
        </h2>
        <div className="bg-[#fefcf0] p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4 text-[#2f1b14] font-serif">
            Color Contrast
          </h3>
          <div className="space-y-4 mb-4">
            <div>
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 rounded bg-[#2f1b14] mr-2"></div>
                <span className="font-semibold text-[#2f1b14] font-serif">
                  Text (#2f1b14)
                </span>
                <span className="mx-2">on</span>
                <div className="w-6 h-6 rounded bg-[#fefcf0] mr-2 border border-[#d4c4a8]"></div>
                <span className="font-semibold text-[#2f1b14] font-serif">
                  Background (#fefcf0)
                </span>
              </div>
              <p className="text-[#6d5a42] font-serif">
                Contrast ratio: ~13.5:1 ✅ (Exceeds WCAG AAA)
              </p>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 rounded bg-[#744a32] mr-2"></div>
                <span className="font-semibold text-[#2f1b14] font-serif">
                  Button (#744a32)
                </span>
                <span className="mx-2">on</span>
                <div className="w-6 h-6 rounded bg-[#fefcf0] mr-2 border border-[#d4c4a8]"></div>
                <span className="font-semibold text-[#2f1b14] font-serif">
                  Background (#fefcf0)
                </span>
              </div>
              <p className="text-[#6d5a42] font-serif">
                Contrast ratio: ~7.8:1 ✅ (Exceeds WCAG AA)
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#fefcf0] p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-[#2f1b14] font-serif">
            Touch Targets
          </h3>
          <div className="space-y-4 mb-4 font-serif">
            <p className="text-[#6d5a42]">
              • Minimum size: 44x44px for all interactive elements
            </p>
            <p className="text-[#6d5a42]">
              • Button padding: Adequate spacing (px-4 py-2 minimum)
            </p>
            <p className="text-[#6d5a42]">
              • Icon buttons: Minimum 40x40px with padding
            </p>
            <p className="text-[#6d5a42]">
              • Bottom nav items: Large enough for thumb interaction
            </p>
            <p className="text-[#6d5a42]">
              • Spacing: Adequate gaps between buttons (gap-2 = 8px minimum)
            </p>
          </div>
        </div>
      </section>
    </div>;
};
// Helper components
const ColorSwatch = ({
  name,
  hex,
  rgb,
  usage
}) => <div className="mb-4">
    <div className="h-12 rounded-t-md border border-[#d4c4a8]" style={{
    backgroundColor: hex
  }}></div>
    <div className="bg-[#fefcf0] p-2 rounded-b-md border-b border-l border-r border-[#d4c4a8]">
      <div className="font-semibold text-sm text-[#2f1b14] font-serif">
        {name}
      </div>
      <div className="text-xs text-[#6d5a42] font-serif">{hex}</div>
      <div className="text-xs text-[#6d5a42] font-serif">rgb({rgb})</div>
      <div className="text-xs italic mt-1 text-[#6d5a42] font-serif">
        {usage}
      </div>
    </div>
  </div>;
const NavItem = ({
  icon,
  label,
  active = false
}) => <div className={`flex flex-col items-center ${active ? 'text-[#744a32] bg-[#e8dcc6] p-2 rounded-lg relative' : 'text-[#8b7355] hover:text-[#744a32]'}`}>
    <div className="mb-1">{icon}</div>
    <span className="text-xs font-semibold font-serif">{label}</span>
    {active && <div className="absolute -bottom-1 w-1.5 h-1.5 bg-[#744a32] rounded-full"></div>}
  </div>;
export default CultureLensDesignSystem;