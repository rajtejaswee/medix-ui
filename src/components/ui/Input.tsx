import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  className,
  id,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={clsx(
            'block w-full rounded-lg border bg-white text-gray-900 placeholder-gray-400',
            'text-sm transition-colors focus:outline-none focus:ring-2',
            leftIcon ? 'pl-10' : 'pl-3',
            rightIcon ? 'pr-10' : 'pr-3',
            'py-2.5',
            error
              ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
              : 'border-gray-300 focus:border-primary-400 focus:ring-primary-100',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {!error && hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
};
