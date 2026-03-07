import React from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}
export const Input = ({
  label,
  icon,
  error,
  className = '',
  ...props
}: InputProps) => {
  const inputClasses = `
    w-full bg-[#fefcf0] border border-[#d4c4a8] rounded p-3 
    font-semibold text-[#2f1b14] shadow-inner 
    focus:ring-2 focus:ring-[#8b5a3c] focus:outline-none font-serif
    ${error ? 'border-red-500' : ''}
    ${icon ? 'pl-10' : ''}
    ${className}
  `;
  return <div className="mb-4">
      {label && <label className="block text-[#6d5a42] mb-2 font-semibold font-serif">
          {label}
        </label>}
      <div className="relative">
        {icon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>}
        <input className={inputClasses} {...props} />
      </div>
      {error && <p className="mt-1 text-red-500 text-sm font-serif">{error}</p>}
    </div>;
};