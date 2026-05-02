import React from 'react';
import clsx from 'clsx';
import { Spinner } from './Spinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  fullWidth = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary:   'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-primary-500',
    ghost:     'text-gray-600 hover:bg-gray-100 focus:ring-gray-300',
    danger:    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      className={clsx(
        base,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        (disabled || loading) && 'opacity-60 cursor-not-allowed',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Spinner size="sm" /> : icon}
      {children}
    </button>
  );
};
