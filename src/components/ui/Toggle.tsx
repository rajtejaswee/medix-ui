import React from 'react';
import { Switch } from '@headlessui/react';
import clsx from 'clsx';

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  size = 'md',
  className,
}) => {
  const trackSizes = {
    sm: 'w-8 h-4',
    md: 'w-11 h-6',
  };
  const thumbSizes = {
    sm: 'h-3 w-3 translate-x-0.5',
    md: 'h-5 w-5 translate-x-0.5',
  };
  const thumbTranslate = {
    sm: 'translate-x-4',
    md: 'translate-x-5',
  };

  return (
    <Switch.Group>
      <div className={clsx('flex items-center gap-2', className)}>
        <Switch
          checked={checked}
          onChange={onChange}
          className={clsx(
            'relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
            trackSizes[size],
            checked ? 'bg-primary-600' : 'bg-gray-300'
          )}
        >
          <span
            className={clsx(
              'inline-block rounded-full bg-white shadow transition-transform',
              thumbSizes[size],
              checked ? thumbTranslate[size] : ''
            )}
          />
        </Switch>
        {label && (
          <Switch.Label className="text-sm text-gray-700 cursor-pointer">{label}</Switch.Label>
        )}
      </div>
    </Switch.Group>
  );
};
