import React from 'react';
import clsx from 'clsx';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-[3px]',
  };

  return (
    <div
      role="status"
      aria-label="Loading"
      className={clsx(
        'rounded-full border-gray-200 border-t-primary-600 animate-spin',
        sizes[size],
        className
      )}
    />
  );
};
