import React from 'react';
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'secondary';
  className?: string;
}
export const Badge = ({
  children,
  variant = 'default',
  className = ''
}: BadgeProps) => {
  const baseClasses = 'inline-flex items-center text-xs px-2 py-1 rounded-full font-semibold font-serif';
  const variantClasses = {
    default: 'bg-[#e8dcc6] text-[#4a3e2a] border border-[#bfa888]',
    outline: 'bg-transparent text-[#4a3e2a] border border-[#bfa888]',
    secondary: 'bg-[#f8e398] text-[#2f1b14] border border-[#e8c547]'
  };
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;
  return <span className={classes}>{children}</span>;
};
interface TravelStampProps {
  icon: string;
  label: string;
  rotation?: number;
}
export const TravelStamp = ({
  icon,
  label,
  rotation = -1
}: TravelStampProps) => {
  return <div className="bg-[#f8e398] px-3 py-2 rounded border-2 border-[#e8c547] shadow-md font-serif inline-block" style={{
    transform: `rotate(${rotation}deg)`
  }}>
      <div className="flex items-center">
        <span className="mr-1 text-lg">{icon}</span>
        <span className="uppercase font-bold text-[#2f1b14] tracking-wider">
          {label}
        </span>
      </div>
    </div>;
};