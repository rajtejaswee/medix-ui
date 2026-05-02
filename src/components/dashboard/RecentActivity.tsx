import React from 'react';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

interface ActivityItem {
  id: string;
  name: string;
  action: string;
  time: string;
  type: 'admitted' | 'discharged' | 'review' | 'alert';
}

const ACTIVITIES: ActivityItem[] = [
  { id: '1', name: 'Eleanor Vasquez',  action: 'was admitted to Cardiology',      time: '2 min ago',  type: 'admitted'   },
  { id: '2', name: 'James Thornton',   action: 'status changed to Critical',       time: '15 min ago', type: 'alert'      },
  { id: '3', name: 'Sofia Mendez',     action: 'review completed by Dr. Park',     time: '32 min ago', type: 'review'     },
  { id: '4', name: 'Robert Kim',       action: 'was discharged from Emergency',    time: '1 hr ago',   type: 'discharged' },
  { id: '5', name: 'Amelia Foster',    action: 'admitted to Pediatrics ward',      time: '1 hr ago',   type: 'admitted'   },
  { id: '6', name: 'David Okafor',     action: 'stent procedure completed',        time: '2 hr ago',   type: 'review'     },
  { id: '7', name: 'Samuel Johnson',   action: 'palliative care plan initiated',   time: '3 hr ago',   type: 'alert'      },
  { id: '8', name: 'Grace Nakamura',   action: 'post-surgery review scheduled',    time: '4 hr ago',   type: 'review'     },
];

const typeVariant: Record<ActivityItem['type'], 'info' | 'error' | 'success' | 'neutral'> = {
  admitted:   'info',
  discharged: 'neutral',
  review:     'success',
  alert:      'error',
};

const typeLabel: Record<ActivityItem['type'], string> = {
  admitted:   'Admitted',
  discharged: 'Discharged',
  review:     'Review',
  alert:      'Alert',
};

export const RecentActivity: React.FC = () => {
  return (
    <Card title="Recent Activity" subtitle="Latest patient updates">
      <div className="space-y-4">
        {ACTIVITIES.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            <Avatar name={item.name} size="sm" colorSeed={item.name} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800">
                <span className="font-medium">{item.name}</span>{' '}
                <span className="text-gray-600">{item.action}</span>
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
            </div>
            <Badge variant={typeVariant[item.type]} size="sm">
              {typeLabel[item.type]}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};
