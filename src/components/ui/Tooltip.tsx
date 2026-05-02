import React, { useState } from 'react';
import clsx from 'clsx';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children, className }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={clsx('relative inline-flex', className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap z-50 pointer-events-none">
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
};
