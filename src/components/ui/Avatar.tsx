import React from 'react';
import clsx from 'clsx';

interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  colorSeed?: string;
  className?: string;
}

const COLORS = [
  'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
  'bg-orange-500', 'bg-teal-500', 'bg-indigo-500', 'bg-cyan-500',
];

function getColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

function getInitials(name: string): string {
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  size = 'md',
  colorSeed,
  className,
}) => {
  const sizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
    xl: 'w-16 h-16 text-xl',
  };

  const color = getColor(colorSeed || name);

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={clsx('rounded-full object-cover', sizes[size], className)}
      />
    );
  }

  return (
    <div
      className={clsx(
        'rounded-full flex items-center justify-center text-white font-semibold select-none',
        sizes[size],
        color,
        className
      )}
    >
      {getInitials(name)}
    </div>
  );
};
