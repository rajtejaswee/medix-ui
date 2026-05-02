import React from 'react';
import clsx from 'clsx';

interface CardProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  noBorder?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  action,
  padding = 'md',
  noBorder = false,
  children,
  className,
}) => {
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-sm',
        !noBorder && 'border border-gray-100',
        paddings[padding],
        className
      )}
    >
      {(title || action) && (
        <div className="flex items-start justify-between mb-4">
          <div>
            {title && <h3 className="text-base font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
