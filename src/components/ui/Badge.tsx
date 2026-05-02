import React from 'react';
import clsx from 'clsx';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'sm',
  dot = false,
  children,
  className,
}) => {
  const variants = {
    success: 'bg-green-50 text-green-700 border border-green-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    error:   'bg-red-50 text-red-700 border border-red-200',
    info:    'bg-blue-50 text-blue-700 border border-blue-200',
    neutral: 'bg-gray-100 text-gray-600 border border-gray-200',
  };

  const dotColors = {
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    error:   'bg-red-500',
    info:    'bg-blue-500',
    neutral: 'bg-gray-400',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full font-medium',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && <span className={clsx('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
};
