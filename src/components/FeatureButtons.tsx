import React from 'react';
export function FeatureButtons() {
  const buttons = [{
    icon: '✈️',
    text: 'EXPLORE'
  }, {
    icon: '🗺️',
    text: 'DISCOVER'
  }, {
    icon: '📷',
    text: 'CAPTURE'
  }];
  return <div className="flex space-x-3 mb-10">
      {buttons.map((button, index) => <button key={index} className="flex items-center justify-center px-4 py-3 bg-[#fefcf0] text-[#2f1b14] rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#744a32] transition-shadow font-serif">
          <span className="mr-2">{button.icon}</span>
          <span>{button.text}</span>
        </button>)}
    </div>;
}