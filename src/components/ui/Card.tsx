import React, { Component } from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
}
export const Card = ({
  children,
  className = ''
}: CardProps) => {
  return <div className={`bg-[#fefcf0] border border-[#bfa888] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all ${className}`}>
      {children}
    </div>;
};
interface CardImageProps {
  src?: string;
  alt?: string;
  emoji?: string;
  className?: string;
}
export const CardImage = ({
  src,
  alt = '',
  emoji,
  className = ''
}: CardImageProps) => {
  if (src) {
    return <div className={`bg-[#e8dcc6] ${className}`}>
        <img src={src} alt={alt} className="w-full h-full object-cover" onError={e => {
        // Fallback to emoji if image fails to load
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-4xl">${emoji || '🏯'}</div>`;
      }} />
      </div>;
  }
  return <div className={`bg-[#e8dcc6] flex items-center justify-center ${className}`}>
      <div className="text-[#8b7355] text-4xl">{emoji || '🏯'}</div>
    </div>;
};
export const CardContent = ({
  children,
  className = ''
}: CardProps) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};
// Export as combined object
export const CardComponents = {
  Root: Card,
  Image: CardImage,
  Content: CardContent
};