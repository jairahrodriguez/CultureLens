import React from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}
export const Button = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) => {
  const baseClasses = 'font-bold font-serif rounded shadow-md transition-all duration-200 focus:outline-none';
  const variantClasses = {
    primary: 'bg-[#744a32] text-[#fefcf0] hover:bg-[#5d3a28]',
    outline: 'bg-transparent text-[#744a32] border-2 border-[#a08968] hover:bg-[#f4f0e6]',
    ghost: 'bg-transparent text-[#744a32] hover:bg-[#f4f0e6]'
  };
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  return <button className={classes} {...props}>
      {children}
    </button>;
};