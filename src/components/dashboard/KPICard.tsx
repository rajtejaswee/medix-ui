import React from 'react';
import clsx from 'clsx';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  label: string;
  value: string | number;
  delta: string;
  deltaType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor: 'blue' | 'green' | 'yellow' | 'red';
}

const iconColorMap = {
  blue:   'bg-blue-100 text-blue-600',
  green:  'bg-green-100 text-green-600',
  yellow: 'bg-amber-100 text-amber-600',
  red:    'bg-red-100 text-red-600',
};

const deltaColorMap = {
  positive: 'text-green-600 bg-green-50',
  negative: 'text-red-600 bg-red-50',
  neutral:  'text-gray-500 bg-gray-100',
};

export const KPICard: React.FC<KPICardProps> = ({
  label, value, delta, deltaType, icon: Icon, iconColor,
}) => {
  const DeltaIcon = deltaType === 'positive' ? TrendingUp : deltaType === 'negative' ? TrendingDown : Minus;

  return (
    <div className="card transition-transform hover:-translate-y-0.5 duration-200 hover:shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center', iconColorMap[iconColor])}>
          <Icon size={20} />
        </div>
        <span className={clsx('inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium', deltaColorMap[deltaType])}>
          <DeltaIcon size={12} />
          {delta}
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
};
